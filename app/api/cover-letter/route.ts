"use server";

import { NextRequest, NextResponse } from "next/server";
import { hash } from "crypto";
// Local
import { performOcrOnPdfUsingGemini } from "@/services/gemini";
import { getCoverLetterUsingGroq } from "@/services/groq";

const resumeOcrHashMap: { [key: string]: any } = {};

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("resume") as File;
  const targetJobDescription = formData.get("targetJobDescription") as string;

  if (!file || !targetJobDescription) {
    return NextResponse.json(
      {
        error: "Missing file or target job description",
      },
      { status: 400 }
    );
  }

  let resumeText = null;

  const resumeOcrHash = hash("sha256", await file.text());

  if (resumeOcrHash in resumeOcrHashMap) {
    resumeText = resumeOcrHashMap[resumeOcrHash];
  } else {
    const ocrTextFromGemini = await performOcrOnPdfUsingGemini(file);
    resumeText = ocrTextFromGemini;
    resumeOcrHashMap[resumeOcrHash] = resumeText;
  }

  const resumeRefinements = await getCoverLetterUsingGroq(
    resumeText,
    targetJobDescription
  );
  return NextResponse.json({ data: resumeRefinements });
}
