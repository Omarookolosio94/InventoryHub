import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Zustand implementation
type ProductState = {
  isLoading: boolean;
  errors: any | {};
  getProducts: (ownerId: string) => void;
};

const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set, get): ProductState => ({
        isLoading: false,
        errors: {},
        getProducts: (ownerId) => {},
      }),
      { name: "productstate" }
    )
  )
);

export default useProductStore;
