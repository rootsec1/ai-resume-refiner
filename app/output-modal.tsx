import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IOutputModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  outputModalContent: string;
}

export default function OutputModal({
  isOpen,
  onOpenChange,
  outputModalContent,
}: IOutputModalProps) {
  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">Suggested Refinements</h2>

              <ModalBody className="overflow-y-auto max-h-[70vh] bg-slate-50">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className="text-small font-normal text-wrap"
                >
                  {outputModalContent}
                </Markdown>
              </ModalBody>
            </ModalHeader>

            <ModalFooter className="p-0 m-0">
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                startContent={<FiX />}
                className="mr-4 mb-4"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
