/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
import { useEffect, useState } from "react";
import SimpleTable from "core/components/table/SimpleTable";
import TableRowData from "core/components/table/TableRowData";
import {
  expandRow,
  formatCurrency,
  getDate,
  openInNewTab,
} from "core/services/helpers";
import Button from "core/components/button/Button";
import ActionRowData from "core/components/table/ActionRowData";
import { MdCancel, MdCheckCircle, MdReceiptLong } from "react-icons/md";
import SubHeader from "core/components/subHeader";
import Card from "core/components/card";
import Modal from "core/components/modal/Modal";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from "react-icons/bs";
import SelectField from "core/components/fields/SelectField";
import { RiPriceTag3Fill } from "react-icons/ri";
import useSaleStore from "core/services/stores/useSaleStore";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { ORDER_STATUS } from "core/const/const";
import useUserStore from "core/services/stores/useUserStore";
import useShopStore from "core/services/stores/useShopStore";

const Sales = () => {
  const [expandedRows, setExpandedRows]: any = useState([]);
  const [expandState, setExpandState] = useState({});
  const navigate = useNavigate();

  const user = useUserStore((store) => store.user);
  const access = useUserStore((store) => store.access);
  const isEmployer = useUserStore((store) => store.isEmployer);
  const errors = useSaleStore((store) => store.errors);
  const updateError = useSaleStore((store) => store.updateError);
  const clearError = useSaleStore((store) => store.clearError);

  const salesList = useSaleStore((store) => store.salesList);
  const getBusinessSalesAction = useSaleStore(
    (store) => store.getBusinessSales
  );
  const getStoreSalesAction = useSaleStore((store) => store.getStoreSales);
  const generateSalesAction = useSaleStore((store) => store.generateSales);
  const updateSalesAction = useSaleStore((store) => store.updateSaleStatus);

  const shops: any = useShopStore((store) => store.shops);
  const singleshop = useShopStore((store) => store.shop);
  const getShopsAction = useShopStore((store) => store.getShops);
  const getShopAction = useShopStore((store) => store.getShop);

  const [saleStatus, setSaleStatus] = useState("");
  const [search, setSearch] = useState({
    storeId: "",
    status: "",
    page: 1,
    count: 20,
  });

  const [selected, setSelected]: any = useState({});
  const [openUpdateStatusForm, setOpenUpdateStatusForm] = useState(false);

  const updateSaleStatus = async (e: any) => {
    e.preventDefault();
    await updateSalesAction(saleStatus, selected?.id);
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
  };

  const fetchSales = (assignedStore: string, search: any) => {
    if (isEmployer) {
      getBusinessSalesAction({
        ...search,
      });
    } else {
      getStoreSalesAction(assignedStore, { ...search });
    }
  };

  useEffect(() => {
    if (shops?.length < 1) {
      getShopsAction(user?.employerId);
    }
  }, []);

  useEffect(() => {
    if (salesList?.items?.length < 1) {
      fetchSales(isEmployer ? "" : user?.assignedStoreIds[0], {
        ...search,
      });
    }
  }, []);

  // TODO: Add action to view product details once they are clicked
  // TODO: Print on page without navigating to url
  // TODO: Change icons for status
  // TODO: Add Archive from Sales
  // TODO: Hide dashboard from other users

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Sales Record"
          action="Make Sales"
          showAction={access?.sale?.includes("WRITE")}
          actionFunc={() => navigate("/admin/pos")}
          icon={<GiReceiveMoney />}
        />
        {access?.sale?.includes("READ") ? (
          <SimpleTable
            headers={[
              "Inv. Code",
              "Bill Type",
              "Status",
              "Total Amount",
              "Paid With",
              "Is Paid",
              "Date Sold",
              "Actions",
            ]}
          >
            {salesList != null && salesList?.items?.length > 0 ? (
              salesList.items.map((sale: any) => (
                <>
                  <tr key={sale?.id}>
                    <TableRowData
                      onClick={() =>
                        openInNewTab(`/general/invoice/${sale?.code}`)
                      }
                      enableAction
                      style="min-w-[60px]"
                      value={sale?.code}
                    />
                    <TableRowData style="min-w-[50px]" value={sale?.billType} />
                    <ActionRowData style="min-w-[50px]">
                      <div
                        className={`flex dark:hover:text-white
                      ${
                        sale?.status == ORDER_STATUS[0] &&
                        "cursor-pointer text-yellow-500 hover:text-yellow-600"
                      }
                      ${
                        sale?.status == ORDER_STATUS[1] &&
                        "cursor-not-allowed text-green-500 hover:text-green-600"
                      }
                      ${
                        sale?.status == ORDER_STATUS[2] &&
                        "cursor-not-allowed text-red-500 hover:text-red-600"
                      }
                      `}
                        onClick={() => {
                          if (
                            access?.sale?.includes("UPDATE") &&
                            sale?.status == ORDER_STATUS[0]
                          ) {
                            setSelected({ ...sale });
                            setSaleStatus(sale?.status);
                            setOpenUpdateStatusForm(true);
                          }
                        }}
                      >
                        <>
                          <RiPriceTag3Fill className="mr-1" />
                          <span className="text-xs">{sale?.status}</span>
                        </>
                      </div>
                    </ActionRowData>
                    <TableRowData
                      style="min-w-[50px]"
                      value={formatCurrency(sale?.totalPaid)}
                    />
                    <TableRowData
                      style="min-w-[50px]"
                      value={sale?.paymentMethod}
                    />
                    <ActionRowData style="min-w-[50px]">
                      <div className="flex cursor-pointer">
                        {sale?.isPaid ? (
                          <>
                            <MdCheckCircle className="mr-1 text-green-500 dark:text-green-300" />
                            <span className="text-xs text-green-600">paid</span>
                          </>
                        ) : (
                          <>
                            <MdCancel className="me-1 text-red-500 dark:text-red-300" />
                            <span className="text-xs text-red-600">unpaid</span>
                          </>
                        )}
                      </div>
                    </ActionRowData>
                    <TableRowData
                      style="min-w-[50px]"
                      value={getDate(sale?.dateAdded, true, true)}
                    />
                    <ActionRowData>
                      <Button
                        style="flex gap-1 justify-items-center items-center bg-gray-500 hover:bg-gray-600 dark:text-white-300"
                        onClick={(e: any) => handleExpandRow(e, sale?.id)}
                      >
                        {!expandedRows.includes(sale?.id) ? (
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
                      <Button
                        style="flex gap-1 justify-items-center items-center bg-green-500 hover:bg-green-600 dark:text-white-300"
                        onClick={() =>
                          openInNewTab(`/general/invoice/${sale?.code}`)
                        }
                      >
                        <MdReceiptLong />
                        <span className="text-xs">Receipt</span>
                      </Button>
                    </ActionRowData>
                  </tr>
                  {expandedRows.includes(sale?.id) ? (
                    <tr>
                      <td
                        className="border-[1px] border-gray-200 text-sm"
                        colSpan={8}
                      >
                        <ul className="p-5">
                          <li className="mb-5 flex gap-3">
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Sold By:
                              </span>
                              <span>{sale?.soldBy}</span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Last Updated By:
                              </span>
                              <span>{sale?.updatedBy}</span>
                            </div>
                            <div className="w-1/4">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Last Update Date:
                              </span>
                              <span>
                                {getDate(sale?.lastUpdated, true, true)}
                              </span>
                            </div>
                          </li>
                          <li className="mb-5 flex gap-3">
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Store:
                              </span>
                              <span>{sale?.store?.storeName}</span>
                            </div>
                            <div className="w-2/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Location:
                              </span>
                              <span>{sale?.store?.address}</span>
                            </div>
                          </li>
                          <li className="border-gry-500 mb-5 border-b p-1"></li>
                          <li className="mb-5 flex gap-3">
                            <div>
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Cart:
                              </span>{" "}
                              <br />
                              {sale?.carts != null &&
                                sale?.carts?.length > 0 &&
                                sale?.carts?.map((cart: any) => (
                                  <>
                                    <span>
                                      {`
                                  ${cart?.productName} * ${cart?.quantity} at
                                  ${formatCurrency(cart?.unitPriceAtPurchase)}
                                  =
                                  ${formatCurrency(
                                    cart?.quantity * cart?.unitPriceAtPurchase
                                  )}`}
                                    </span>{" "}
                                    <br />
                                  </>
                                ))}
                            </div>
                          </li>
                          <li className="mb-5 flex gap-3">
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Cart Total:
                              </span>
                              <span>{formatCurrency(sale?.cartTotal)}</span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Tax:
                              </span>
                              <span>{formatCurrency(sale?.tax)}</span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Delivery Fee:
                              </span>
                              <span>{formatCurrency(sale?.deliveryFee)}</span>
                            </div>
                          </li>
                          <li className="border-gry-500 mb-5 border-b p-1"></li>
                          <li className="flex gap-3">
                            <div className="w-3/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Customer
                              </span>
                            </div>
                          </li>
                          <li className="mb-5 flex gap-3">
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Name:
                              </span>
                              <span>{sale?.customerName}</span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Email:
                              </span>
                              <span>{sale?.customerEmail}</span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Phone:
                              </span>
                              <span>{sale?.customerPhone}</span>
                            </div>
                          </li>
                          <li className="mb-5 flex gap-3">
                            <div className="w-3/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Address:
                              </span>
                              <br />
                              <span>{sale?.customerAddress}</span>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ) : (
                    <tr></tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <TableRowData colSpan={8} value="No sales yet" />
              </tr>
            )}

            <tr>
              <TableRowData
                colSpan={6}
                value={`Showing ${salesList?.items?.length} of ${salesList?.totalItem} entries`}
              />
              <ActionRowData colSpan={2}>
                <Button
                  disabled={salesList?.currentPage === 1}
                  style="flex gap-1 justify-items-center items-center"
                  onClick={() => {
                    fetchSales(isEmployer ? "" : user?.assignedStoreIds[0], {
                      status: search?.status,
                      storeId: search?.storeId,
                      page: salesList?.currentPage - 1,
                      count: 20,
                    });
                  }}
                >
                  <BsChevronDoubleLeft className="" />
                  <span className="text-xs">Prev</span>
                </Button>
                <Button style="flex gap-1 bg-green-500 hover:bg-green-600">
                  <span className="text-xs">
                    {salesList?.currentPage} / {salesList?.totalPage}
                  </span>
                </Button>
                <Button
                  disabled={salesList?.currentPage === salesList?.totalPage}
                  style="flex gap-1 justify-items-center items-center"
                  onClick={() => {
                    fetchSales(isEmployer ? "" : user?.assignedStoreIds[0], {
                      status: search?.status,
                      storeId: search?.storeId,
                      page: salesList?.currentPage + 1,
                      count: 20,
                    });
                  }}
                >
                  <span className="text-xs">Next</span>
                  <BsChevronDoubleRight className="text-xs" />
                </Button>
              </ActionRowData>
            </tr>
          </SimpleTable>
        ) : (
          <p>You are not authorized to view sales record</p>
        )}
      </Card>

      {openUpdateStatusForm && (
        <Modal
          styling="w-2/6 p-5"
          onClose={() => {
            setOpenUpdateStatusForm(false);
            setSelected({});
            clearError();
          }}
        >
          <form onSubmit={(e) => updateSaleStatus(e)}>
            <p className="text-black mb-5 font-bold dark:text-white">
              Update Product Detail
            </p>

            <SelectField
              label="Sale Status"
              extra="mb-3"
              defaultName="Select Sale Status"
              defaultValue="0"
              name="status"
              options={
                ORDER_STATUS?.length > 0
                  ? [
                      ...ORDER_STATUS?.map((stat: any) => {
                        return {
                          name: stat,
                          value: stat,
                        };
                      }),
                    ]
                  : []
              }
              value={saleStatus}
              onChange={(e: any) => setSaleStatus(e.target.value)}
              showLabel={true}
            />

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenUpdateStatusForm(false);
                  setSelected({});
                  clearError();
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

export default Sales;
