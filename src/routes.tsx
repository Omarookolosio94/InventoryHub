import React from "react";

// Auth Imports
import SignIn from "views/auth/SignIn";
import Register from "views/auth/Register";
import ResetPassword from "views/auth/ResetPassword";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import Stores from "views/admin/stores";
import Products from "views/admin/products";
import Employees from "views/admin/employees";
import Sales from "views/admin/sales";
import Categories from "views/admin/categories";

// Icon Imports
import {
  MdCategory,
  MdHome,
  MdOutlineProductionQuantityLimits,
  MdStore,
} from "react-icons/md";
import { FaUsers, FaUserCircle, FaFileArchive } from "react-icons/fa";
import { GiReceiveMoney, GiWallet } from "react-icons/gi";
import Catalogs from "views/admin/stores/components/Catalogs";
import PointOfSale from "views/admin/pos";
import Invoice from "views/general/Invoice";
import VerifyAccount from "views/auth/VerifyAccount";
import Archives from "views/admin/archives";
import Support from "views/general/Support";

const routes = [
  {
    name: "Register",
    layout: "/auth",
    path: "register",
    icon: "",
    component: <Register />,
  },
  {
    name: "Verify",
    layout: "/auth",
    path: "verify",
    icon: "",
    component: <VerifyAccount />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: "",
    component: <SignIn />,
  },
  {
    name: "Reset Password",
    layout: "/auth",
    path: "reset-password",
    icon: "",
    component: <ResetPassword />,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Point Of Sale (POS)",
    layout: "/admin",
    path: "pos",
    icon: <GiReceiveMoney className="h-6 w-6" />,
    component: <PointOfSale />,
  },
  {
    name: "Sales",
    layout: "/admin",
    path: "sales",
    icon: <GiWallet className="h-6 w-6" />,
    component: <Sales />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdOutlineProductionQuantityLimits className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "categories",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Categories />,
  },
  {
    name: "Stores",
    layout: "/admin",
    path: "store",
    icon: <MdStore className="h-6 w-6" />,
    component: <Stores />,
  },
  {
    name: "Catalogs",
    layout: "/admin",
    path: "store/:storeId",
    icon: "",
    component: <Catalogs />,
  },
  {
    name: "Employees",
    layout: "/admin",
    path: "employees",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Employees />,
  },
  {
    name: "Archive",
    layout: "/admin",
    path: "archive",
    icon: <FaFileArchive className="h-6 w-6" />,
    component: <Archives />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <FaUserCircle className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Invoice",
    layout: "/general",
    path: "invoice/:invoiceId",
    icon: "",
    component: <Invoice />,
  },
  {
    name: "Support",
    layout: "/general",
    path: "support",
    icon: "",
    component: <Support />,
  },
];
export default routes;
