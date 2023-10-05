import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import notification from "../notification";
import {
  addCategories,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../api/categoryapi";

// Zustand implementation
type CategoryState = {
  isLoading: boolean;
  errors: any | {};
  categories: Category[];
  updateError: (name: string) => void;
  clearError: () => void;
  getCategory: (ownerId: string) => void;
  addCategory: (category: AddCategory, token: string) => void;
  updateCategory: (
    category: AddCategory,
    categoryId: string,
    token: string
  ) => void;
  deleteCategory: (categoryId: string, token: string) => void;
};

const useCategoryStore = create<CategoryState>()(
  devtools(
    persist(
      (set, get): CategoryState => ({
        isLoading: false,
        errors: {},
        categories: [],
        updateError: (name) =>
          set((state) => ({
            errors: {
              ...state.errors,
              [name]: "",
            },
          })),
        clearError: () => {
          set({ errors: {} });
        },
        getCategory: async (ownerId) => {
          set({ isLoading: true });
          const response = await getCategories(ownerId);
          const { success, data } = response;
          if (success) {
            set({ categories: data });
          }
          set({ isLoading: false });
        },
        addCategory: async (category, token) => {
          try {
            set({ isLoading: true });
            const response = await addCategories(category, token);
            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                categories: [
                  {
                    ...data,
                  },
                  ...state.categories,
                ],
              }));
              notification({
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        updateCategory: async (category, categoryId, token) => {
          try {
            set({ isLoading: true });
            const response = await updateCategory(category, categoryId, token);

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                categories: state.categories.map((cat: any) =>
                  cat.id === categoryId ? { ...data } : cat
                ),
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
        deleteCategory: async (categoryId, token) => {
          try {
            set({ isLoading: true });
            const response = await deleteCategory(categoryId, token);

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                categories: state.categories.filter(
                  (cat: any) => cat.id !== categoryId
                ),
              }));
              notification({
                title: "",
                message,
                type: "success",
              });
            } else {
              if (statusCode === 400) {
                set({ errors: data });
              }

              notification({
                title: "",
                message: message,
                type: "danger",
              });
            }
            set({ isLoading: false });
            return success;
          } catch (err) {
            set({ isLoading: false });
            notification({
              title: "",
              message: "An unknown error occured, please try again later",
              type: "danger",
            });
            return false;
          }
        },
      }),
      { name: "categorystate" }
    )
  )
);

export default useCategoryStore;
