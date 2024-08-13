// Prompts
export const DEFAULT_PDF_OCR_SYSTEM_INSTRUCTION =
  "You are a PDF extraction and OCR expert for resumes. Your job is read all the text in the resume given and convert that to text in prettified manner. Output resume in plain text.";
export const DEFAULT_PDF_OCR_USER_PROMPT =
  "Extract the contents of the resume provided and pretty print the content in plain text.";
export const DEFAULT_RESUME_REFINER_SYSTEM_PROMPT =
  "You are a resume review expert who excels at getting resumes passed through ATS systems for software engineering roles.";
export const DEFAULT_RESUME_REFINER_USER_PROMPT = (
  resumeText: string,
  targetJobDescription: string
) => {
  return `
  Using the following job description and resume:

  RESUME:
  ${resumeText}

  JOB DESCRIPTION:
  ${targetJobDescription}

  TASK:

  Extract Keywords:
  Identify the most important technical keywords from the job description. Ignore soft skills or process related keywords such as AGILE, SCRUM, team player, etc.

  Incorporate extracted keywords:
  Integrate all of the keywords into the bullet points under the "Professional Experience" section of the resume.
  Strictly Ensure all skills and technologies mentioned in the job description are represented.

  Refine for Impact:
  Rephrase each bullet point to prioritize impact and metrics. Start with the result or impact, followed by the action and the technologies used.
  For example, change "Developed a new feature using React" to "Increased user engagement by X% by developing a new feature using React.js and Docker."

  Maintain Software Engineering Industry Standards:
  Use software engineering industry-standard terminology and avoid jargon. Utilize a diverse set of action verbs, ensuring no repetition across bullet points.
  Keep language clear and concise, avoiding fluff.

  Highlight Metrics:
  Include realistic metrics or numbers to demonstrate the candidate's achievements.
  Retain and highlight any metrics or numbers, placing them at the beginning of each bullet point to emphasize measurable impact.

  Final Review:
  Refine the resume to include any additional advice for the candidate, ensuring the final output aligns with best practices for ATS optimization and clarity, score the refined resume on all aspects against the job description and tell whether the resume would pass the ATS or not.
`;
};

// Placeholders
export const DEFAULT_TARGET_JOB_DESCRIPTION_PLACEHOLDER = `5+ years of experience working on modern SaaS applications
Knowledge of distributed system design best practices
Fluency in Python, Typescript, and React
Familiarity with Azure is a plus`;

// Models
export const OCR_MODEL_NAME = "gemini-1.5-flash";

// Environment variables
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
