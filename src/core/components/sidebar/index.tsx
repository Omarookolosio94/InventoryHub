/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes";
import useUserStore from "core/services/stores/useUserStore";

const Sidebar = (props: {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  const { open, onClose } = props;
  const user = useUserStore((state) => state.user);
  const isEmployer = useUserStore((state) => state.isEmployer);

  return (
    <div
      className={`sm:none duration-175 linear hide-print fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[48px] flex w-[160px] items-center`}>
        <div className="ml-1 mt-1 h-auto font-poppins text-[18px] font-bold uppercase text-navy-700 dark:text-white">
          <span>{isEmployer ? user?.name : user?.employer?.name}</span>
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        {isEmployer ? (
          <Links routes={routes} />
        ) : (
          <Links
            routes={routes.filter(
              (route: any) =>
                route.name != "Analytics" && route.name != "Archive"
            )}
          />
        )}
      </ul>
      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
