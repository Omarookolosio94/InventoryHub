/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState } from "react";
import SimpleTable from "core/components/table/SimpleTable";
import TableRowData from "core/components/table/TableRowData";
import { expandRow, getDate } from "core/services/helpers";
import Button from "core/components/button/Button";
import ActionRowData from "core/components/table/ActionRowData";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import SubHeader from "core/components/subHeader";
import Card from "core/components/card";
import Modal from "core/components/modal/Modal";
import InputField from "core/components/fields/InputField";
import CheckField from "core/components/fields/CheckField";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { customBtn } from "core/const/const";
import useUserStore from "core/services/stores/useUserStore";
import useShopStore from "core/services/stores/useShopStore";

const Stores = () => {
  const [expandedRows, setExpandedRows]: any = useState([]);
  const [expandState, setExpandState] = useState({});
  const shops = useShopStore((store) => store.shops);
  const user = useUserStore((store) => store.user);
  const getShopsAction = useShopStore((store) => store.getShops);
  const errors = useShopStore((store) => store.errors);
  const updateError = useShopStore((store) => store.updateError);
  const addNewStore = useShopStore((store) => store.addStore);
  const updateStoreAction = useShopStore((store) => store.updateStore);
  const updateStoreStatusAction = useShopStore(
    (store) => store.updateStoreStatus
  );
  const deleteStoreAction = useShopStore((store) => store.deleteStore);

  const [openForm, setOpenForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [openUpdateStatusForm, setOpenUpdateStatusForm] = useState(false);
  const [selected, setSelected]: any = useState({});

  const [storeForm, setStoreForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    openingTime: "08:00 AM",
    closingTime: "08:00 PM",
    openingDays: "Mon - Fri",
    isActive: true,
    isWareHouse: false,
  });

  const [updateStoreForm, setUpdateStoreForm] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    openingDays: "",
  });

  const [updateStatusForm, setUpdateStatusForm] = useState({
    id: "",
    isActive: true,
    isWareHouse: true,
  });

  const handleChange = (e: any) => {
    setStoreForm({
      ...storeForm,
      [e.target.name]:
        e.target.name === "isActive" || e.target.name === "isWareHouse"
          ? e.target.value == "true"
          : e.target.value,
    });
  };

  const handleUpdateChange = (e: any) => {
    setUpdateStoreForm({
      ...updateStoreForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStatusChange = (e: any) => {
    setUpdateStatusForm({
      ...updateStatusForm,
      [e.target.name]: e.target.value == "true",
    });
  };

  const addStore = async (e: any) => {
    e.preventDefault();
    var status: any = await addNewStore(storeForm);
    if (status) {
      setStoreForm({
        name: "",
        description: "",
        address: "",
        phone: "",
        email: "",
        openingTime: "08:00 AM",
        closingTime: "08:00 PM",
        openingDays: "Mon - Fri",
        isActive: true,
        isWareHouse: false,
      });

      setOpenForm(false);
    }
  };

  const updateStore = async (e: any) => {
    e.preventDefault();
    await updateStoreAction(
      {
        name: updateStoreForm?.name,
        description: updateStoreForm?.description,
        address: updateStoreForm?.address,
        phone: updateStoreForm?.phone,
        email: updateStoreForm?.email,
        openingTime: updateStoreForm?.openingTime,
        closingTime: updateStoreForm?.closingTime,
        openingDays: updateStoreForm?.openingDays,
      },
      selected?.id
    );
  };

  const updateStoreStatus = async (e: any) => {
    e.preventDefault();
    await updateStoreStatusAction(
      {
        isActive: updateStatusForm?.isActive,
        isWareHouse: updateStatusForm?.isWareHouse,
      },
      selected?.id
    );
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
  };

  const deleteStore = async (e: any, storeId: string) => {
    const response = window.confirm(
      // eslint-disable-next-line quotes
      "Click 'OK' to delete this store'."
    );

    if (!response) return;
    await deleteStoreAction(storeId);
  };

  useEffect(() => {
    if (shops != null && shops?.length < 1) {
      getShopsAction(user?.employerId);
    }
  }, []);

  // TODO: Change description to textarea
  // TODO: Change button coloration and styling
  // TODO: Change deactivation to switch

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Your stores"
          action="Add Store"
          actionFunc={() => setOpenForm(true)}
        />
        <SimpleTable
          headers={[
            "Name",
            "Address",
            "Owner",
            "Last Updated",
            "Status",
            "Actions",
          ]}
        >
          {shops?.length > 0 &&
            shops?.map((store: any) => (
              <>
                <tr key={store?.id}>
                  <TableRowData value={store?.name} />
                  <TableRowData value={store?.address} />
                  <TableRowData value={store?.employer?.name} />
                  <TableRowData value={getDate(store?.lastUpdated)} />
                  <ActionRowData style="min-w-[50px]">
                    <div
                      className="flex cursor-pointer"
                      onClick={() => {
                        setSelected({ ...store });
                        setUpdateStatusForm({
                          id: store?.id,
                          isActive: store?.isActive,
                          isWareHouse: store?.isWareHouse,
                        });
                        setOpenUpdateStatusForm(true);
                      }}
                    >
                      {store?.isActive ? (
                        <>
                          <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
                          <span className="text-xs text-green-600">Active</span>
                        </>
                      ) : (
                        <>
                          <MdCancel className="me-1 text-red-500 dark:text-red-300" />
                          <span className="text-xs text-red-600">Inactive</span>
                        </>
                      )}
                    </div>
                  </ActionRowData>
                  <ActionRowData>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-gray-500 hover:bg-gray-600 dark:text-white-300"
                      onClick={(e: any) => handleExpandRow(e, store?.id)}
                    >
                      {!expandedRows.includes(store?.id) ? (
                        <>
                          <BsFillCaretDownFill />
                          <span className="text-xs">View</span>
                        </>
                      ) : (
                        <>
                          <BsFillCaretUpFill />
                          <span className="text-xs">Close</span>
                        </>
                      )}
                    </Button>
                    <Link
                      to={`/admin/store/${store?.id}`}
                      className={`${customBtn} dark:text-white-300 flex items-center justify-items-center gap-1 bg-green-500 hover:bg-green-600`}
                    >
                      <FaClipboardList />
                      <span className="text-xs">Catalog</span>
                    </Link>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300"
                      onClick={() => {
                        setSelected({ ...store });
                        setUpdateStoreForm({ ...store });
                        setOpenUpdateForm(true);
                      }}
                    >
                      <AiFillEdit />
                      <span className="text-xs">Edit</span>
                    </Button>
                    <Button
                      style="flex gap-1 justify-items-center items-center bg-red-500 hover:bg-red-600 dark:text-white-300"
                      onClick={(e: any) => {
                        deleteStore(e, store?.id);
                      }}
                    >
                      <FiDelete />
                      <span className="text-xs">Delete</span>
                    </Button>
                  </ActionRowData>
                </tr>
                {expandedRows.includes(store?.id) ? (
                  <tr>
                    <td
                      className="border-[1px] border-gray-200 text-sm"
                      colSpan={6}
                    >
                      <ul className="p-5">
                        <li className="mb-3 flex gap-3">
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Added By:
                            </span>
                            <span>{store?.addedBy}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Last Updated By:
                            </span>
                            <span>{store?.updatedBy}</span>
                          </div>
                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Date Added:
                            </span>
                            <span>{getDate(store?.dateAdded)}</span>
                          </div>
                        </li>
                        <li className="mb-3 flex gap-3">
                          {store?.phone?.length > 0 && (
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Phone:
                              </span>
                              <span>{store?.phone}</span>
                            </div>
                          )}
                          {store?.email?.length > 0 && (
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Email:
                              </span>
                              <span>{store?.email}</span>
                            </div>
                          )}
                          {store?.openingDays != null &&
                            store?.openingDays?.length > 0 && (
                              <div className="w-1/3">
                                <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                  Opening Days:
                                </span>
                                <span>{store?.openingDays}</span>
                              </div>
                            )}
                        </li>
                        <li className="mb-3 flex gap-3">
                          {store?.openingTime?.length > 0 && (
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Opening Time:
                              </span>
                              <span>{store?.openingTime}</span>
                            </div>
                          )}
                          {store?.closingTime?.length > 0 && (
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Closing Time
                              </span>
                              <span>{store?.closingTime}</span>
                            </div>
                          )}

                          <div className="w-1/3">
                            <span className="mr-1 font-bold text-brand-500 dark:text-white">
                              Is Warehouse:
                            </span>
                            <span
                              className={`ml-2 rounded-full px-3 text-white ${
                                store?.isWareHouse
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                            >
                              {store?.isWareHouse ? "yes" : "no"}
                            </span>
                          </div>
                        </li>
                        {store?.decription != null &&
                          store?.description.length > 0 && (
                            <li className="mb-3 flex gap-3">
                              <div className="w-1/3">
                                <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                  Description:
                                </span>
                                <span>{store?.description}</span>
                              </div>
                            </li>
                          )}
                      </ul>
                    </td>
                  </tr>
                ) : (
                  <tr></tr>
                )}
              </>
            ))}
        </SimpleTable>
      </Card>

      {openForm && (
        <Modal styling="w-3/6 p-5" onClose={() => setOpenForm(false)}>
          <form onSubmit={(e) => addStore(e)}>
            <p className="text-black mb-5 dark:text-white">
              New Store Information
            </p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={storeForm?.name}
              onChange={handleChange}
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
              label="Address"
              id="address"
              type="text"
              name="address"
              value={storeForm?.address}
              onChange={handleChange}
              onFocus={() => {
                if (errors?.Address && errors?.Address?.length > 0) {
                  updateError("Address");
                }
              }}
              error={errors?.Address}
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Contact Number"
                  id="phone"
                  type="text"
                  name="phone"
                  value={storeForm?.phone}
                  onChange={handleChange}
                  onFocus={() => {
                    if (errors?.Phone && errors?.Phone?.length > 0) {
                      updateError("Phone");
                    }
                  }}
                  error={errors?.Phone}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Contact Email"
                  id="email"
                  type="text"
                  name="email"
                  value={storeForm?.email}
                  onChange={handleChange}
                  onFocus={() => {
                    if (errors?.Email && errors?.Email?.length > 0) {
                      updateError("Email");
                    }
                  }}
                  error={errors?.Email}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Opening Time"
                  placeholder="08:00 AM"
                  id="openingTime"
                  type="text"
                  name="openingTime"
                  value={storeForm?.openingTime}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Closing Time"
                  id="closingTime"
                  placeholder="10:00 PM"
                  type="text"
                  name="closingTime"
                  value={storeForm?.closingTime}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Opening Days"
                  id="openingDays"
                  placeholder="Monday - Friday"
                  type="text"
                  name="openingDays"
                  value={storeForm?.openingDays}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex w-1/2 gap-2 dark:text-white">
                <span>Is Active:</span>
                <span>
                  <CheckField
                    styling="mr-6 inline-block"
                    checked={storeForm.isActive === true}
                    sublabel="yes"
                    type="radio"
                    value="true"
                    name="isActive"
                    onChange={handleChange}
                  />
                  <CheckField
                    styling="inline-block"
                    checked={storeForm.isActive === false}
                    sublabel="no"
                    type="radio"
                    value="false"
                    name="isActive"
                    onChange={handleChange}
                  />
                </span>
              </div>
              <div className="flex w-1/2 gap-3 dark:text-white">
                <span>Is Warehouse:</span>
                <span>
                  <CheckField
                    styling="mr-6 inline-block cursor-not-allowed"
                    checked={storeForm.isWareHouse === true}
                    sublabel="yes"
                    type="radio"
                    value="true"
                    name="isWareHouse"
                    disabled
                    onChange={handleChange}
                  />
                  <CheckField
                    styling="inline-block cursor-not-allowed"
                    checked={storeForm.isWareHouse === false}
                    sublabel="no"
                    type="radio"
                    value="false"
                    name="isWareHouse"
                    disabled
                    onChange={handleChange}
                  />
                </span>
              </div>
            </div>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Description"
              id="description"
              type="text"
              name="description"
              value={storeForm?.description}
              onChange={handleChange}
            />
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setOpenForm(false)}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Add Store
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdateForm && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenUpdateForm(false);
            setSelected({});
          }}
        >
          <form onSubmit={(e) => updateStore(e)}>
            <p className="text-black mb-5">Update Store Information</p>
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={updateStoreForm?.name}
              onChange={handleUpdateChange}
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
              label="Address"
              id="address"
              type="text"
              name="address"
              value={updateStoreForm?.address}
              onChange={handleUpdateChange}
              onFocus={() => {
                if (errors?.Address && errors?.Address?.length > 0) {
                  updateError("Address");
                }
              }}
              error={errors?.Address}
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Contact Number"
                  id="phone"
                  type="text"
                  name="phone"
                  value={updateStoreForm?.phone}
                  onChange={handleUpdateChange}
                  onFocus={() => {
                    if (errors?.Phone && errors?.Phone?.length > 0) {
                      updateError("Phone");
                    }
                  }}
                  error={errors?.Phone}
                />
              </div>
              <div className="w-1/2">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Contact Email"
                  id="email"
                  type="text"
                  name="email"
                  value={updateStoreForm?.email}
                  onChange={handleUpdateChange}
                  onFocus={() => {
                    if (errors?.Email && errors?.Email?.length > 0) {
                      updateError("Email");
                    }
                  }}
                  error={errors?.Email}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Opening Time"
                  placeholder="08:00 AM"
                  id="openingTime"
                  type="text"
                  name="openingTime"
                  value={updateStoreForm?.openingTime}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Closing Time"
                  id="closingTime"
                  placeholder="10:00 PM"
                  type="text"
                  name="closingTime"
                  value={updateStoreForm?.closingTime}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="w-1/3">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Opening Days"
                  id="openingDays"
                  placeholder="Monday - Friday"
                  type="text"
                  name="openingDays"
                  value={updateStoreForm?.openingDays}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>

            <InputField
              variant="auth"
              extra="mb-3"
              label="Description"
              id="description"
              type="text"
              name="description"
              value={updateStoreForm?.description}
              onChange={handleUpdateChange}
            />
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateForm(false);
                  setSelected({});
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Store
              </button>
            </div>
          </form>
        </Modal>
      )}

      {openUpdateStatusForm && (
        <Modal
          styling="w-1/5 p-5"
          onClose={() => {
            setOpenUpdateStatusForm(false);
            setSelected({});
          }}
        >
          <form onSubmit={(e) => updateStoreStatus(e)}>
            <p className="text-black mb-5 dark:text-white">
              Update Store Status
            </p>

            <div className="flex gap-3">
              <div className="flex gap-2 dark:text-white">
                <span>Is Active:</span>
                <span>
                  <CheckField
                    styling="mr-6 inline-block"
                    checked={updateStatusForm.isActive === true}
                    sublabel="yes"
                    type="radio"
                    value="true"
                    name="isActive"
                    onChange={handleUpdateStatusChange}
                  />
                  <CheckField
                    styling="inline-block"
                    checked={updateStatusForm.isActive === false}
                    sublabel="no"
                    type="radio"
                    value="false"
                    name="isActive"
                    onChange={handleUpdateStatusChange}
                  />
                </span>
              </div>
              {/* 
              <div className="flex w-1/2 gap-3">
                <span>Is Warehouse:</span>
                <span>
                  <CheckField
                    styling="mr-6 inline-block cursor-not-allowed"
                    checked={updateStatusForm.isWareHouse === true}
                    sublabel="yes"
                    type="radio"
                    value="true"
                    name="isWareHouse"
                    disabled
                    onChange={handleUpdateStatusChange}
                  />
                  <CheckField
                    styling="inline-block cursor-not-allowed"
                    checked={updateStatusForm.isWareHouse === false}
                    sublabel="no"
                    type="radio"
                    value="false"
                    name="isWareHouse"
                    disabled
                    onChange={handleUpdateStatusChange}
                  />
                </span>
              </div>
              */}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateStatusForm(false);
                  setSelected({});
                }}
                style="linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs"
              >
                Cancel
              </Button>
              <button className="linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
                Update Status
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Stores;
