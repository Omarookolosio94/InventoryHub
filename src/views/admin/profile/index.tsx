import Card from "core/components/card";
import avatar from "assets/img/avatars/avatar4.png";
import useUserStore from "core/services/stores/useUserStore";
import { getDate } from "core/services/helpers";

const Profile = () => {
  const user = useUserStore((state) => state.user);

  const employeeFields = [
    {
      name: "Email",
      value: user?.email,
    },
    {
      name: "Staff ID",
      value: user?.staffId,
    },
    {
      name: "Company",
      value: user?.employer?.name,
    },
    {
      name: "Date Employed",
      value: getDate(user?.dateEmployed),
    },
    {
      name: "Last Updated",
      value: getDate(user?.lastUpdated),
    },
  ];

  const employerFields = [
    {
      name: "Email",
      value: user?.email,
    },
    {
      name: "Date Registered",
      value: getDate(user?.dateRegistered),
    },
    {
      name: "Last Updated",
      value: getDate(user?.lastUpdated),
    },
  ];

  return (
    <div className="ml-4 mt-3 flex gap-3 pb-6">
      <Card extra={"w-2/5 h-full p-6 sm:overflow-x-auto"}>
        <div className="flex flex-col h-[250px] items-center gap-1">
          <img
            src={avatar}
            alt="user"
            className="h-[200px] w-[200px] rounded-full"
          />
          <p>{user?.name}</p>
          <p className="text-xs font-bold text-gray-500">{user?.roles}</p>
        </div>
      </Card>
      <Card extra={"w-3/5 h-full p-6 sm:overflow-x-auto"}>
        <div className="h-[250px]">
          <>
            {user?.isEmployer &&
              employerFields?.length > 0 &&
              employerFields?.map((field) => (
                <div className="mb-3">
                  <span className="text-gray-500">{field?.name}: </span>
                  <span>{field?.value}</span>
                </div>
              ))}

            {!user?.isEmployer &&
              employeeFields?.length > 0 &&
              employeeFields?.map((field) => (
                <div className="mb-3">
                  <span className="text-gray-500">{field?.name}: </span>
                  <span>{field?.value}</span>
                </div>
              ))}
          </>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
