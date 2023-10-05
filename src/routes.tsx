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
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import Catalogs from "views/admin/stores/components/Catalogs";

const routes = [
  {
    name: "Register",
    layout: "/auth",
    path: "register",
    icon: "",
    component: <Register />,
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
    name: "Dashboard",
    layout: "/admin",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
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
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdOutlineProductionQuantityLimits className="h-6 w-6" />,
    component: <Products />,
  },

  {
    name: "Sales",
    layout: "/admin",
    path: "sales",
    icon: <GiPayMoney className="h-6 w-6" />,
    component: <Sales />,
  },
  {
    name: "Categories",
    layout: "/admin",
    path: "categories",
    icon: <MdCategory className="h-6 w-6" />,
    component: <Categories />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <FaUserCircle className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Employees",
    layout: "/admin",
    path: "employees",
    icon: <FaUsers className="h-6 w-6" />,
    component: <Employees />,
  },
];
export default routes;
