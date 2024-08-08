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
      Follow these steps to refine the resume:
  
      1. **Extract all technical keywords from Job Description**:
         - Focus only on the job description, not the resume.
         - Extract all technical keywords, including programming languages, frameworks, databases, tools, methodologies, and any specific technologies listed.
         - Pay special attention to keywords found in the 'Mandatory Skills / Experience / Technology / Relevant Technologies / Tags' section.
         - Identify all keywords without exception, such as 'Spring', 'Spring Boot', 'Java', 'Jenkins', 'Git', 'Microservices', 'Cloud', 'SQL', and any other relevant technologies or methodologies.
  
      2. **Incorporate Keywords into Resume Bullet Points**:
         - Suggest refinements or modifications to the majority of the bullet points in the resume.
         - Seamlessly incorporate the extracted keywords into the bullet points to optimize the resume for ATS. Make up bullet points such that all keywords are included in case they are not present in the original resume.
         - Ensure that all keywords extracted are from the job description, even if the resume is not a perfect match for the job description.
  
      3. **Rephrase for Impact and Clarity**:
         - Rephrase each refined bullet point to emphasize the impact or result first, followed by the action taken and the technologies used.
         - For example, if the original bullet point is "Developed a new feature using React", rephrase it to "Increased user engagement by X% by developing a new feature using React."
         - Make up realistic metrics or numbers where necessary to demonstrate the impact of the candidate's work.
  
      4. **Maintain Industry Standards**:
         - Ensure that the refined bullet points use industry-standard terminology and avoid any jargon.
         - Keep the refined bullet points concise, clear, and directly to the point.
         - Ensure that you use a variety of industry standard action verbs that the ATS would like in the beginning of the bullet points to symbolize impact
  
      5. **Ensure Consistent Length**:
         - Make sure that the length of the refined bullet points does not significantly exceed the original length or 2 lines, whichever is lesser.
         - Aim to keep the refined bullet points similar in length to the original.
  
      6. **Highlight Metrics and Impact**:
         - If any metrics or numbers are present in the original bullet points, ensure they are retained.
         - Move these metrics or numbers to the beginning of the bullet point in the refined version to highlight the measurable impact.
  
      7. **Output the Result in JSON Format**:
         - Use the following format for output, and provide nothing else, only the JSON list:
  
      [
        {
          "section": <WHICH_SECTION_IT_IS_UNDER>,
          "entity": <NAME OF UNIVERSITY / COMPANY / SKILL CATEGORY>,
          "original_text": "abc",
          "refined_text": "xyz",
          "keywords_added": ["x", "y", "z"]
        }
      ]
  
      The goal is to optimize the bullet points for ATS systems, ensuring that they effectively communicate the candidate's skills and accomplishments while incorporating all relevant technical keywords from the job description.
  
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
