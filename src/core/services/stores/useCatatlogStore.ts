import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import notification from "core/services/notification";
import { addCatalog, getCatalog, updateCatalog } from "../api/catalogapi";

// Zustand implementation
type CatalogState = {
  isLoading: boolean;
  errors: any | {};
  catalogList: CatalogList;
  updateError: (name: string) => void;
  clearError: () => void;
  getCatalogs: (storeId: string, param: SearchParam) => void;
  addCatalog: (catalog: AddCatalog, token: string) => void;
  updateCatalog: (
    catalog: UpdateCatalog,
    catalogId: string,
    token: string
  ) => void;
};

const useCatalogStore = create<CatalogState>()(
  devtools(
    persist(
      (set, get): CatalogState => ({
        isLoading: false,
        errors: {},
        catalogList: {
          items: [],
          currentPage: 0,
          totalItem: 0,
          totalPage: 0,
        },
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
        getCatalogs: async (storeId, param) => {
          set({ isLoading: true });
          const response = await getCatalog(storeId, param);
          const { success, data } = response;
          if (success) {
            set({ catalogList: data });
          }
          set({ isLoading: false });
        },
        addCatalog: async (catalog, token) => {
          try {
            set({ isLoading: true });
            const response = await addCatalog(catalog, token);
            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                catalogList: {
                  ...state.catalogList,
                  items: [
                    {
                      ...data,
                    },
                    ...state.catalogList.items,
                  ],
                },
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
        updateCatalog: async (catalog, catalogId, token) => {
          try {
            set({ isLoading: true });
            const response = await updateCatalog(
              catalog,
              catalogId,
              token
            );

            const { success, statusCode, data, message } = response;
            if (success) {
              set((state) => ({
                catalogList: {
                  ...state.catalogList,
                  items: state.catalogList?.items?.map((cat: any) =>
                    cat.id === catalogId ? { ...data } : cat
                  ),
                },
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
      }),
      { name: "catalogstate" }
    )                                
  )
);

export default useCatalogStore;
