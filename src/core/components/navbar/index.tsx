import React from "react";
import Dropdown from "core/components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import avatar from "assets/img/avatars/avatar4.png";
import useUserStore from "core/services/stores/useUserStore";
import useShopStore from "core/services/stores/useShopStore";
import useSaleStore from "core/services/stores/useSaleStore";
import useProductStore from "core/services/stores/useProductStore";
import useCategoryStore from "core/services/stores/useCategoryStore";
import useCatalogStore from "core/services/stores/useCatalogStore";

const Navbar = (props: {
  onOpenSidenav: () => void;
  brandText: string;
  secondary?: boolean | string;
}) => {
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const resetUser = useUserStore((state) => state.reset);
  const resetShop = useShopStore((state) => state.reset);
  const resetSale = useSaleStore((state) => state.reset);
  const resetProduct = useProductStore((state) => state.reset);
  const resetCategory = useCategoryStore((state) => state.reset);
  const resetCatalog = useCatalogStore((state) => state.reset);

  const logout = () => {
    resetUser();
    resetShop();
    resetSale();
    resetProduct();
    resetCategory();
    resetCatalog();
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/auth/sign-in");
  };

  return (
    <nav className="hide-print sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-md bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <span className="text-sm font-normal text-navy-700  dark:text-white dark:hover:text-white">
            Pages
            <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </span>
          <Link
            className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[120px] flex-grow items-center justify-end gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[120px] md:flex-grow-0 md:gap-1 xl:w-[120px] xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img className="h-10 w-10 rounded-full" src={avatar} alt="user" />
          }
          children={
            <div className="flex h-auto w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-1 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="ml-4 mt-3">
                <div className="flex items-center gap-2">
                  <p className="text-ellipsis text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {user?.name}
                  </p>{" "}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="ml-4 mt-3 flex flex-col">
                <Link
                  to="/admin/profile"
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Profile Settings
                </Link>

                <button
                  onClick={() => logout()}
                  className="mt-3 text-left text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
