// Prompts
export const DEFAULT_PDF_OCR_SYSTEM_INSTRUCTION =
  "You are a PDF extraction and OCR expert for resumes. Your job is read all the text in the resume given and convert that to text in prettified manner.";
export const DEFAULT_PDF_OCR_USER_PROMPT =
  "Extract the contents of the resume provided and pretty print the content. Do not ignore or exclude any word. Output the text in a readable github flavored markdown format.";
export const DEFAULT_RESUME_REFINER_SYSTEM_PROMPT =
  "You are a resume review expert who excels at getting resumes passed through ATS systems for software engineering roles.";
export const DEFAULT_RESUME_REFINER_USER_PROMPT = (
  resumeText: string,
  targetJobDescription: string
) => {
  return `
  Using the provided job description, extract keywords from the job description, values & culture of the company (from about us section, visit the website if required), suggest refinements or modifications to most of the bullet points in the resume by including keywords extracted from the job description with the goal of making sure that the resume gets picked up by the ATS.
  Ensure that you seamlessly merge the contents of the resume bullet points and the keywords extracted from the job description. Output the result in the form of a JSON list like so and nothing else:
[
{
  "original_text": "abc",
  "refined_text": xyz",
  "section": <WHICH_SECTION_IT_IS_UNDER>,
  "keywords_added": ["x", "y", "z"]
}
]

  After refining each point, rephrase it such that the impact of the bullet point comes first followed by the content of the bullet point.
  For example, if the original bullet point is "Developed a new feature using React", the refined bullet point should be "Increased user engagement by developing a new feature using React".
  Use industry standard terminology and avoid using jargon. Ensure that the refined bullet points are concise and to the point.
  Also ensure that the length of the refined bullet points is not significantly longer than the original bullet points, try to keep the length of the refined bullet points similar to the original bullet points.
  If any metrics or numbers are present in the bullet points, ensure that they are retained in the refined bullet points.

  Resume:
  ${resumeText}

  Job Description:
  ${targetJobDescription}
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
