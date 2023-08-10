import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
  data?: Product;
  isOpen: boolean;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const PreviewModal = create<PreviewModalStore>(set => ({
  data: undefined,
  isOpen: false,
  onOpen: (data: Product) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default PreviewModal;