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
  **Refine Resume for ATS**:
  - Identify all technical skills and keywords mentioned in the job description. For example, if the job description includes "Proven experience with any of the following: WebAuthn, OIDC, SAML, AWS, React.js, Docker, Kubernetes, Terraform, Ansible, Git", extract these as individual keywords.
  - Incorporate as many extracted keywords possible directly into the corresponding bullet points in the resume. Ensure all skills and technologies mentioned in the job description are present within the refined bullet points.
  - Each modified bullet point should maintain a similar length to the original point without exceeding it, while naturally including the relevant keywords.
  - Strictly include all keywords in the job description in the refined resume, especially those missing from the resume but present in the job description.
  
  **Rephrase for Impact and Clarity**:
  - Rephrase each refined bullet point to emphasize the impact or result first, followed by the action taken and the technologies used.
  - For example, if the original bullet point is "Developed a new feature using React", rephrase it to "Increased user engagement by X% by developing a new feature using React.js and Docker."
  - Integrate realistic metrics or numbers where necessary to demonstrate the impact of the candidate's work.
  
  **Maintain Industry Standards**:
  - Ensure that the refined bullet points use industry-standard terminology, avoiding any unnecessary jargon.
  - Use a diverse set of action verbs to describe the candidate's accomplishments and responsibilities, do not repeat the same verbs across multiple bullet points. For example, do not use the word "increased", "improved", "implemented", "reduced" more than once.
  - Avoid fluffy language; focus on clear, concise language.
  
  **Highlight Metrics and Impact**:
  - Retain any metrics or numbers from the original bullet points.
  - Move these metrics or numbers to the beginning of the bullet point in the refined version to highlight measurable impact.
  
  **Output the Result in JSON Format**:
  - List refined bullet points in the same order as the original bullet points.
  - Output the result strictly in JSON format as shown below and nothing else, making sure that the "keywords_added" are included in the "refined_text":
    
  [
    {
      "section": "<WHICH_SECTION_IT_IS_UNDER>",
      "entity": "<NAME OF UNIVERSITY / COMPANY / SKILL CATEGORY>",
      "original_text": "<original bullet point>",
      "refined_text": "<refined bullet point with keywords integrated>",
      "keywords_added": ["<extracted keyword 1>", "<extracted keyword 2>", "<extracted keyword 3>"]
    }
  ]
    
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
