"use server";

import { NextRequest, NextResponse } from "next/server";
// Local
import { performOcrOnPdfUsingGemini } from "@/services/gemini";
import { getResumeRefinementsUsingGroq } from "@/services/groq";
import { hash } from "crypto";

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

  const resumeRefinements = await getResumeRefinementsUsingGroq(
    resumeText,
    targetJobDescription
  );
  return NextResponse.json({ data: resumeRefinements });
}
