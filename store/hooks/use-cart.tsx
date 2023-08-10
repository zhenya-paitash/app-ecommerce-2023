import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const isExistItem = currentItems.find(item => item.id === data.id);

      if (isExistItem) {
        return toast("Item already in cart.");
      }

      set({ items: [...get().items, data] });
      toast.success("Item addet to cart.");
    },
    removeItem: (id: string) => {
      set({ items: get().items.filter(item => item.id !== id) })
      toast.success("Item removed from the cart.");
    },
    removeAll: () => set({ items: [] }),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
