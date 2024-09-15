"use client";

import { Button, Textarea, useDisclosure } from "@nextui-org/react";
import { BsEnvelope, BsFillLightningFill } from "react-icons/bs";

// Local
import { DEFAULT_TARGET_JOB_DESCRIPTION_PLACEHOLDER } from "./constants";
import { useState } from "react";
import OutputModal from "./output-modal";

export default function HomePage() {
  // Output
  const [refinedResumeCorrections, setRefinedResumeCorrections] = useState<
    string | null
  >(null);

  // Form
  const [targetJobDescription, setTargetJobDescription] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);

  // Progress
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] =
    useState<boolean>(false);

  // Modal
  const {
    isOpen: outputModalIsOpen,
    onOpen: outputModalOnOpen,
    onOpenChange: outputModalOnOpenChange,
  } = useDisclosure();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setResume(event.target.files[0]);
    }
  };

  async function onSubmitButtonPress() {
    setIsLoading(true);
    setRefinedResumeCorrections(null);

    const formData = new FormData();
    formData.append("resume", resume as File);
    formData.append("targetJobDescription", targetJobDescription);

    try {
      const response = await fetch("/api/refine", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const refinedResumeCorrections = responseData.data;
        setRefinedResumeCorrections(refinedResumeCorrections);
        outputModalOnOpen();
      } else {
        alert("Failed to refine resume. Please try again.");
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function onGenerateCoverLetterButtonPress() {
    setIsGeneratingCoverLetter(true);

    const formData = new FormData();
    formData.append("resume", resume as File);
    formData.append("targetJobDescription", targetJobDescription);

    try {
      const response = await fetch("/api/cover-letter", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const coverLetter = responseData.data;
        setRefinedResumeCorrections(coverLetter);
        outputModalOnOpen();
      } else {
        alert("Failed to generate cover letter. Please try again.");
      }
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  }

  return (
    <main className="p-2 w-full flex flex-col justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">AI Resume Refiner</h1>
        <p className="text-lg">Created by Abhishek Murthy</p>

        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-xl mb-4 font-bold">Upload Resume</h2>
          <input
            type="file"
            className="ml-24"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </div>

        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-xl mb-4 font-bold">Target Job Description</h2>
          <Textarea
            label="Target Job Description"
            placeholder={DEFAULT_TARGET_JOB_DESCRIPTION_PLACEHOLDER}
            variant="bordered"
            onValueChange={setTargetJobDescription}
            value={targetJobDescription}
            disabled={isLoading}
            isDisabled={isLoading}
          />
        </div>

        <div className="flex justify-center items-center mt-16 gap-4">
          <Button
            color="primary"
            variant="shadow"
            size="lg"
            startContent={
              isLoading ? null : <BsFillLightningFill color="white" size={24} />
            }
            isLoading={isLoading}
            isDisabled={!resume || !targetJobDescription || isLoading}
            onPress={onSubmitButtonPress}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              isLoading ? "Refining..." : "Refine Resume"
            }
          </Button>

          <Button
            color="secondary"
            variant="shadow"
            size="lg"
            startContent={
              isGeneratingCoverLetter ? null : (
                <BsEnvelope color="white" size={24} />
              )
            }
            isLoading={isGeneratingCoverLetter}
            isDisabled={
              !resume || !targetJobDescription || isGeneratingCoverLetter
            }
            onPress={onGenerateCoverLetterButtonPress}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              isLoading ? "Generating..." : "Generate Cover Letter"
            }
          </Button>
        </div>

        {refinedResumeCorrections && (
          <OutputModal
            isOpen={outputModalIsOpen}
            onOpenChange={outputModalOnOpenChange}
            outputModalContent={refinedResumeCorrections}
          />
        )}
      </div>
    </main>
  );
}
