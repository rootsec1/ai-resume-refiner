import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs/promises";
import os from "os";
import path from "path";
// Local
import {
  DEFAULT_PDF_OCR_SYSTEM_INSTRUCTION,
  DEFAULT_PDF_OCR_USER_PROMPT,
  GEMINI_API_KEY,
  OCR_MODEL_NAME,
} from "@/app/constants";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY ?? "");
const fileManager = new GoogleAIFileManager(GEMINI_API_KEY ?? "");

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const ocrModelGemini = genAI.getGenerativeModel({
  model: OCR_MODEL_NAME,
  systemInstruction: DEFAULT_PDF_OCR_SYSTEM_INSTRUCTION,
});

export async function uploadToGemini(path: string, mimeType: string) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  return file;
}

export async function waitForGeminiFilesActive(files: any[]) {
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
}

export async function performOcrOnPdfUsingGemini(file: File) {
  // Save the uploaded file to the local filesystem temporarily
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "upload-"));
  const filePath = path.join(tempDir, file.name);
  const fileContent = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, fileContent);

  const uploadedFile = await uploadToGemini(
    filePath,
    file.type ?? "application/pdf"
  );
  await waitForGeminiFilesActive([uploadedFile]);

  // Start a chat session with the model
  const chatSession = ocrModelGemini.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: uploadedFile.mimeType,
              fileUri: uploadedFile.uri,
            },
          },
        ],
      },
    ],
  });

  // Send a message to the chat session (prompt the model)
  const result = await chatSession.sendMessage(DEFAULT_PDF_OCR_USER_PROMPT);

  // Clean up: remove the temporary file
  await fs.unlink(filePath);

  return result.response.text();
}
