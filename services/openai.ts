import OpenAI from "openai";
// Local
import {
  DEFAULT_RESUME_REFINER_SYSTEM_PROMPT,
  DEFAULT_RESUME_REFINER_USER_PROMPT,
  OPENAI_API_KEY,
} from "@/app/constants";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getResumeRefinementsUsingGPT(
  resumeText: string,
  targetJobDescription: string
) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: DEFAULT_RESUME_REFINER_SYSTEM_PROMPT },
      {
        role: "user",
        content: DEFAULT_RESUME_REFINER_USER_PROMPT(
          resumeText,
          targetJobDescription
        ),
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content?.trim();
}
