"use client";

import { useEffect } from 'react';

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  const isOpen = useStoreModal(state => state.isOpen);
  const onOpen = useStoreModal(state => state.onOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen])
  

  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/" />

    </div>
  );
};

export default SetupPage;
