'use client';

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  loading: boolean;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  loading,
  isOpen,
  onConfirm,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
