import React, { useState, useEffect } from "react";
import Card from "core/components/card";
import avatar from "assets/img/avatars/avatar4.png";
import useUserStore from "core/services/stores/useUserStore";
import { getDate } from "core/services/helpers";
import { MdVerifiedUser } from "react-icons/md";
import { BsFillPatchMinusFill } from "react-icons/bs";
import Button from "core/components/button/Button";
import { AiFillEdit } from "react-icons/ai";
import Modal from "core/components/modal/Modal";
import InputField from "core/components/fields/InputField";
import SubHeader from "core/components/subHeader";
import { FiDelete } from "react-icons/fi";
import useShopStore from "core/services/stores/useShopStore";
import SelectField from "core/components/fields/SelectField";
import { ROLES } from "core/const/const";
import CheckField from "core/components/fields/CheckField";
import { Roles } from "core/services/accessControls";

const Employees = () => {
  const [selected, setSelected]: any = useState({});
  const errors = useUserStore((state) => state.errors);
  const updateError = useUserStore((state) => state.updateError);
  const isEmployer = useUserStore((state) => state.isEmployer);
  const employees = useUserStore((state) => state.employees);
  const user: any = useUserStore((state) => state.user);
  const access: any = useUserStore((state) => state.access);

  const shops: any = useShopStore((state) => state.shops);
  const getShopsAction = useShopStore((state) => state.getShops);

  const getEmployeesAction = useUserStore((state) => state.getEmployees);
  const updateEmployeeStatusAction = useUserStore(
    (state) => state.updateEmployeeStatus
  );
  const addEmployeeAction = useUserStore((state) => state.addEmployee);
  const assignEmployeeAction = useUserStore((state) => state.assignEmployee);
  const deleteEmployeeAction = useUserStore((state) => state.deleteEmployee);

  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    role: "",
    assignedStoreIds: "",
  });

  const [updateAssignmentForm, setUpdateAssignmentForm] = useState({
    role: "",
    assignedStoreId: "",
  });

  const [addModal, setAddModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);

  const handleChange = (e: any, form: string = "add") => {
    const { name, value } = e?.target;
    switch (form) {
      case "add":
        setEmployeeForm({
          ...employeeForm,
          [name]: value,
        });
        break;
      case "assign":
        setUpdateAssignmentForm({
          ...updateAssignmentForm,
          [name]: value,
        });
        break;
      default:
        break;
    }
  };

  const setFields = (employee: any) => {
    var fields = [
      {
        name: "Email",
        value: employee?.email,
      },
      {
        name: "Staff ID",
        value: employee?.staffId,
      },
      {
        name: "Company",
        value: shops[0]?.employer?.name,
      },
      {
        name: "Assigned Location",
        value: shops.filter(
          (shop: any) =>
            shop.id?.toLowerCase() ==
            employee?.assignedStoreIds[0]?.toLowerCase()
        )[0]?.name,
      },
      {
        name: "Date Employed",
        value: getDate(employee?.dateEmployed),
      },
      {
        name: "Last Updated",
        value: getDate(employee?.lastUpdated),
      },
    ];

    return fields?.map((field) => (
      <div className="mb-3">
        <span className="text-gray-500">{field?.name}: </span>
        <span>{field?.value}</span>
      </div>
    ));
  };

  const deleteEmployee = async (employee: any) => {
    const response = window.confirm(
      `Click 'OK' to resign ${employee?.name}'. Please note the record of the staff will be deleted`
    );
    if (!response) return;
    await deleteEmployeeAction(employee?.id);
  };

  const addEmployee = async (e: any) => {
    e.preventDefault();
    var status: any = await addEmployeeAction({
      email: employeeForm?.email,
      name: employeeForm?.name,
      staffId: "",
      roles: [employeeForm?.role],
      assignedStoreIds: [employeeForm?.assignedStoreIds],
    });

    if (status) {
      setEmployeeForm({
        name: "",
        email: "",
        role: "",
        assignedStoreIds: "",
      });
      setAddModal(false);
    }
  };

  const assignEmployee = async (e: any) => {
    e.preventDefault();
    await assignEmployeeAction(
      [updateAssignmentForm?.role],
      [updateAssignmentForm?.assignedStoreId],
      selected?.id
    );
  };

  const updateEmployeeStatus = async (
    status: boolean = false,
    employee: any
  ) => {
    const response = window.confirm(
      `Click 'OK' to ${status ? "Unsuspend" : "Suspend"} ${employee?.name}`
    );
    if (!response) return;

    await updateEmployeeStatusAction(status, employee?.id);
  };

  useEffect(() => {
    if (employees?.length < 1) {
      getEmployeesAction();
    }
  }, []);

  useEffect(() => {
    if (shops?.length < 1) {
      getShopsAction(user?.employerId);
    }
  }, []);

  return (
    <div className="ml-4 mt-3">
      <Card extra={"w-full h-full px-6 pb-5 mb-5 sm:overflow-x-auto"}>
        <SubHeader
          title="Your Staff"
          action="Add staff"
          showAction={access?.employee?.includes("WRITE")}
          actionFunc={() => {
            setAddModal(true);
          }}
        />
      </Card>
      <div>
        {employees != null && employees?.length > 0 ? (
          employees.map((employee: any) => (
            <div className="flex gap-3 pb-6">
              <Card extra={"w-2/5 h-full p-6 sm:overflow-x-auto"}>
                <div className="flex h-[250px] flex-col items-center gap-1">
                  <div className="relative h-[200px] w-[200px] rounded-full">
                    <img
                      src={avatar}
                      alt="user"
                      className="h-[200px] w-[200px] rounded-full"
                    />
                    {employee?.isActive ? (
                      <MdVerifiedUser className="absolute right-0 top-0 z-40 h-[20px] w-[20px] text-green-500" />
                    ) : (
                      <BsFillPatchMinusFill className="absolute right-0 top-0 z-40 h-[20px] w-[20px] text-gray-500" />
                    )}
                  </div>
                  <p>{employee?.name}</p>
                  <p className="text-xs font-bold text-gray-500">
                    {employee?.roles}
                  </p>
                </div>
              </Card>
              <Card extra={"w-3/5 h-full p-6 sm:overflow-x-auto"}>
                <div className="relative h-[250px]">
                  <>
                    {setFields(employee)}

                    {isEmployer ||
                    (!isEmployer &&
                      employee?.id !== user?.id &&
                      access?.employee?.includes("UPDATE")) ? (
                      <div className="absolute bottom-0 flex w-full justify-end gap-3">
                        <Button
                          style={`flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300`}
                          onClick={() => {
                            setUpdateAssignmentForm({
                              role: employee?.roles,
                              assignedStoreId: employee?.assignedStoreIds[0],
                            });
                            setSelected({ ...employee });
                            setAssignModal(true);
                          }}
                        >
                          <AiFillEdit />
                          <span className="text-xs">Change Role</span>
                        </Button>
                        <Button
                          style={`flex gap-1 justify-items-center items-center ${
                            employee?.isActive
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-green-500 hover:bg-green-600"
                          } dark:text-white-300`}
                          onClick={() => {
                            updateEmployeeStatus(!employee?.isActive, employee);
                          }}
                        >
                          {employee?.isActive ? (
                            <BsFillPatchMinusFill />
                          ) : (
                            <MdVerifiedUser />
                          )}
                          <span className="text-xs">
                            {employee?.isActive ? "Suspend" : "Unsuspend"}
                          </span>
                        </Button>
                        {isEmployer && (
                          <Button
                            style={`flex gap-1 justify-items-center items-center bg-red-500 hover:bg-red-600 dark:text-white-300`}
                            onClick={() => {
                              deleteEmployee(employee);
                            }}
                          >
                            <FiDelete />
                            <span className="text-xs">Resign</span>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <p>no employees have been employed</p>
        )}
      </div>

      {addModal && (
        <Modal
          styling="w-2/6 p-5"
          onClose={() => {
            setAddModal(false);
          }}
        >
          <form onSubmit={(e) => addEmployee(e)}>
            <p className="mb-5 font-bold dark:text-white">Add New Staff</p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={employeeForm?.name}
              onChange={(e: any) => handleChange(e, "add")}
              onFocus={() => {
                if (errors?.Name && errors?.Name?.length > 0) {
                  updateError("Name");
                }
              }}
              error={errors?.Name}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              id="email"
              type="email"
              name="email"
              value={employeeForm?.email}
              onChange={(e: any) => handleChange(e, "add")}
              onFocus={() => {
                if (errors?.Email && errors?.Email?.length > 0) {
                  updateError("Email");
                }
              }}
              error={errors?.Email}
            />

            <SelectField
              label="Assign To Shop"
              extra="mb-3"
              defaultName="Select Shop"
              defaultValue="0"
              name="assignedStoreIds"
              options={
                shops?.length > 0
                  ? [
                      ...shops?.map((shop: any) => {
                        return {
                          name: `${shop?.name} - ${
                            shop?.isActive ? "✅" : "❌"
                          }`,
                          value: shop?.id,
                        };
                      }),
                    ]
                  : []
              }
              value={employeeForm?.assignedStoreIds}
              onChange={(e: any) => handleChange(e, "add")}
              showLabel={true}
            />

            <SelectField
              label="Role/Position"
              extra="mb-3"
              defaultName="Select Role"
              defaultValue="0"
              name="role"
              options={
                isEmployer
                  ? [
                      ...ROLES?.filter((role: any) => role !== Roles.Ceo)?.map(
                        (role: any) => {
                          return {
                            name: role,
                            value: role,
                          };
                        }
                      ),
                    ]
                  : [
                      ...ROLES?.filter(
                        (role: any) =>
                          role !== Roles.Ceo && role !== Roles.Manager
                      )?.map((role: any) => {
                        return {
                          name: role,
                          value: role,
                        };
                      }),
                    ]
              }
              value={employeeForm?.role}
              onChange={(e: any) => handleChange(e, "add")}
              showLabel={true}
              onFocus={() => {
                if (errors?.Roles && errors?.Roles?.length > 0) {
                  updateError("Roles");
                }
              }}
              error={errors?.Roles}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setAddModal(false);
                }}
                style={`linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs`}
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Add Staff
              </button>
            </div>
          </form>
        </Modal>
      )}

      {assignModal && (
        <Modal
          styling="w-2/6 p-5"
          onClose={() => {
            setAssignModal(false);
            setSelected({});
          }}
        >
          <form onSubmit={(e) => assignEmployee(e)}>
            <p className="mb-5 font-bold dark:text-white">
              Update {selected?.name} Assignment
            </p>

            <SelectField
              label="Assign To Shop"
              extra="mb-3"
              defaultName="Select Shop"
              defaultValue="0"
              name="assignedStoreId"
              options={
                shops?.length > 0
                  ? [
                      ...shops?.map((shop: any) => {
                        return {
                          name: `${shop?.name} - ${
                            shop?.isActive ? "✅" : "❌"
                          }`,
                          value: shop?.id,
                        };
                      }),
                    ]
                  : []
              }
              value={updateAssignmentForm?.assignedStoreId}
              onChange={(e: any) => handleChange(e, "assign")}
              showLabel={true}
            />

            <SelectField
              label="Role/Position"
              extra="mb-3"
              defaultName="Select Role"
              defaultValue="0"
              name="role"
              options={
                isEmployer
                  ? [
                      ...ROLES?.filter((role: any) => role !== Roles.Ceo)?.map(
                        (role: any) => {
                          return {
                            name: role,
                            value: role,
                          };
                        }
                      ),
                    ]
                  : [
                      ...ROLES?.filter(
                        (role: any) =>
                          role !== Roles.Ceo && role !== Roles.Manager
                      )?.map((role: any) => {
                        return {
                          name: role,
                          value: role,
                        };
                      }),
                    ]
              }
              value={updateAssignmentForm?.role}
              onChange={(e: any) => handleChange(e, "assign")}
              showLabel={true}
              onFocus={() => {
                if (errors?.Roles && errors?.Roles?.length > 0) {
                  updateError("Roles");
                }
              }}
              error={errors?.Roles}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setAddModal(false);
                  setSelected({});
                }}
                style={`linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs`}
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Employees;
