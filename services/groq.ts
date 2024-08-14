import Groq from "groq-sdk";
// Local
import {
  DEFAULT_RESUME_REFINER_SYSTEM_PROMPT,
  DEFAULT_RESUME_REFINER_USER_PROMPT,
} from "@/app/constants";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getResumeRefinementsUsingGroq(
  resumeText: string,
  targetJobDescription: string
) {
  console.log(
    DEFAULT_RESUME_REFINER_USER_PROMPT(resumeText, targetJobDescription)
  );
  const completion = await groq.chat.completions.create({
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
    model: "llama-3.1-70b-versatile",
    temperature: 0.3,
  });

  return completion.choices[0].message.content?.trim();
}
