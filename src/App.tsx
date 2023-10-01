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
import { ReactNotifications } from "react-notifications-component";
import useShopStore from "core/services/stores/useShopStore";
import Loader from "core/components/loader/Loader";
import useProductStore from "core/services/stores/useProductStore";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const isShopStoreLoading = useShopStore((store) => store.isLoading);
  const isProductStoreLoading = useProductStore((store) => store.isLoading);

  return (
    <QueryClientProvider client={queryClient}>
      {(isShopStoreLoading || isProductStoreLoading) && <Loader />}
      <Router>
        <ReactNotifications />
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="/" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
