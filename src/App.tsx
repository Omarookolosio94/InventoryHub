import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import GeneralLayout from "layouts/general";
import { ReactNotifications } from "react-notifications-component";
import useShopStore from "core/services/stores/useUserStore";
import Loader from "core/components/loader/Loader";
import useProductStore from "core/services/stores/useProductStore";
import useUserStore from "core/services/stores/useUserStore";
import useCatalogStore from "core/services/stores/useCatalogStore";
import useSaleStore from "core/services/stores/useSaleStore";
import useCategoryStore from "core/services/stores/useCategoryStore";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const isUserStoreLoading = useUserStore((store) => store.isLoading);
  const isShopStoreLoading = useShopStore((store) => store.isLoading);
  const isProductStoreLoading = useProductStore((store) => store.isLoading);
  const isCatalogStoreLoading = useCatalogStore((store) => store.isLoading);
  const isSaleStoreLoading = useSaleStore((store) => store.isLoading);
  const isCategoryStoreLoading = useCategoryStore((store) => store.isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      {(isShopStoreLoading ||
        isProductStoreLoading ||
        isUserStoreLoading ||
        isSaleStoreLoading ||
        isCategoryStoreLoading ||
        isCatalogStoreLoading) && <Loader />}
      <Router>
        <ReactNotifications />
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="general/*" element={<GeneralLayout />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
