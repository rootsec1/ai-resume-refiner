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
            <ModalHeader>
              <h2 className="text-2xl font-bold">Suggested Refinements</h2>
            </ModalHeader>

            <ModalBody className="overflow-y-auto max-h-[70vh] w-full p-4">
              <Markdown
                remarkPlugins={[remarkGfm]}
                className="text-small prose max-w-none w-full"
              >
                {outputModalContent.trim()}
              </Markdown>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                startContent={<FiX />}
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
