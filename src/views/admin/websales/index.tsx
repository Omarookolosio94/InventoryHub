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
import {
  InvoiceSize,
  ORDER_STATUS,
  PAYMENT_STATUS,
  WEB_ORDER_STATUS,
} from "core/const/const";
import useUserStore from "core/services/stores/useUserStore";
import TextField from "core/components/fields/TextField";
import InputField from "core/components/fields/InputField";

const Websales = () => {
  const [expandedRows, setExpandedRows]: any = useState([]);
  const [expandState, setExpandState] = useState({});
  const navigate = useNavigate();

  const user = useUserStore((store) => store.user);
  const access = useUserStore((store) => store.access);
  const isEmployer = useUserStore((store) => store.isEmployer);

  const errors = useSaleStore((store) => store.errors);
  const updateError = useSaleStore((store) => store.updateError);
  const clearError = useSaleStore((store) => store.clearError);

  const salesList = useSaleStore((store) => store.websalesList);
  const getSalesAction = useSaleStore((store) => store.getWebsales);
  const updateSalesAction = useSaleStore((store) => store.updateWebsaleStatus);
  const updatePaymentStatusAction = useSaleStore(
    (store) => store.updateWebsalePaymentStatus
  );

  const [saleStatus, setSaleStatus] = useState<WebsaleStatus>({
    saleId: "",
    status: "",
    instruction: "",
    deliveryFee: 0,
  });

  const handleStatusChange = (e: any) => {
    const { name, value } = e?.target;

    setSaleStatus((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const [search, setSearch] = useState({
    status: "",
    page: 1,
    count: 20,
  });

  const [selected, setSelected]: any = useState({});
  const [openUpdateStatusForm, setOpenUpdateStatusForm] = useState(false);

  const updateSaleStatus = async (e: any) => {
    e.preventDefault();
    await updateSalesAction(user?.employerId, { ...saleStatus });
  };

  const updatePaymentStatus = async (saleId: string, isPaid: boolean) => {
    if (
      window.confirm(
        `This order will be marked as ${
          isPaid ? "Paid" : "Unpaid"
        }, Do you still want to proceed?`
      )
    ) {
      await updatePaymentStatusAction(user?.employerId, {
        saleId,
        isPaid,
      });
    }
  };

  const getStatusesWithHigherIndex = (status: string) => {
    const updatedIndex = WEB_ORDER_STATUS.indexOf(status);

    if (updatedIndex === -1) {
      return [];
    }

    return WEB_ORDER_STATUS.slice(updatedIndex);
  };

  const handleExpandRow = async (event: any, id: string) => {
    var newRows = await expandRow(id, expandedRows);
    setExpandState(newRows?.obj);
    setExpandedRows(newRows?.newExpandedRows);
  };

  const fetchSales = (employerId: string, search: any) => {
    getSalesAction(employerId, { ...search });
  };

  useEffect(() => {
    if (salesList?.items?.length < 1) {
      fetchSales(user?.employerId, {
        ...search,
      });
    }
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Web Sales Record"
          action="Make Sales"
          showAction={access?.sale?.includes("WRITE")}
          actionFunc={() => navigate("/admin/checkout")}
          icon={<GiReceiveMoney />}
        />
        {access?.sale?.includes("READ") ? (
          <SimpleTable
            headers={[
              "Inv. Code",
              "Customer",
              "Status",
              "Total Amount",
              "Is Paid",
              "Date Sold",
              "Delivery Mode",
              "Actions",
            ]}
          >
            {salesList != null && salesList?.items?.length > 0 ? (
              salesList.items.map((sale) => (
                <>
                  <tr key={sale?.id}>
                    <TableRowData
                      onClick={() =>
                        openInNewTab(
                          `/general/invoice/${sale?.code}/${InvoiceSize.LARGE}`
                        )
                      }
                      enableAction
                      style="min-w-[60px]"
                      value={sale?.code}
                    />
                    <TableRowData
                      style="min-w-[50px]"
                      value={sale?.customerName}
                    />
                    <ActionRowData style="min-w-[50px]">
                      <div
                        className={`flex dark:hover:text-white
                      ${
                        sale?.status == WEB_ORDER_STATUS[0] &&
                        "cursor-pointer text-gray-500 hover:text-gray-600"
                      }
                      ${
                        sale?.status == WEB_ORDER_STATUS[1] &&
                        "cursor-not-allowed text-blue-500 hover:text-blue-600"
                      }
                      ${
                        sale?.status == WEB_ORDER_STATUS[2] &&
                        "cursor-not-allowed text-yellow-500 hover:text-yellow-600"
                      }
                      ${
                        sale?.status == WEB_ORDER_STATUS[3] &&
                        "cursor-not-allowed text-red-500 hover:text-red-600"
                      }
                      ${
                        sale?.status == WEB_ORDER_STATUS[4] &&
                        "cursor-not-allowed text-green-500 hover:text-green-600"
                      }
                      `}
                        onClick={() => {
                          if (
                            access?.sale?.includes("UPDATE") &&
                            sale?.status !== WEB_ORDER_STATUS[4] &&
                            sale?.status !== WEB_ORDER_STATUS[3]
                          ) {
                            setSelected({ ...sale });
                            setSaleStatus({
                              saleId: sale?.id,
                              status: sale?.status,
                              instruction: "",
                              deliveryFee: 0,
                            });
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
                    <ActionRowData style="min-w-[50px]">
                      <div
                        className="flex cursor-pointer"
                        onClick={() =>
                          updatePaymentStatus(sale?.id, !sale?.isPaid)
                        }
                      >
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

                    <TableRowData
                      style="min-w-[50px]"
                      value={sale?.deliveryMethod}
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
                          openInNewTab(
                            `/general/web-invoice/${user?.employerId}/${sale?.code}/${InvoiceSize.LARGE}`
                          )
                        }
                      >
                        <MdReceiptLong />
                        <span className="text-xs">Receipt A4</span>
                      </Button>
                      <Button
                        style="flex gap-1 justify-items-cenßter items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300"
                        onClick={() =>
                          openInNewTab(
                            `/general/web-invoice/${user?.employerId}/${sale?.code}/${InvoiceSize.SMALL}`
                          )
                        }
                      >
                        <MdReceiptLong />
                        <span className="text-xs">Receipt Small</span>
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
                                Date Sold:
                              </span>
                              <span>
                                {getDate(sale?.dateAdded, true, true)}
                              </span>
                            </div>
                            <div className="w-1/3">
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Last Updated By:
                              </span>
                              <span>{sale?.lastUpdatedBy}</span>
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

                          <li className="border-gry-500 mb-5 border-b p-1"></li>
                          <li className="mb-5 flex gap-3">
                            <div>
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Cart:
                              </span>{" "}
                              <br />
                              {sale?.cart != null &&
                                sale?.cart?.length > 0 &&
                                sale?.cart?.map((cart: any) => (
                                  <div className="mb-2">
                                    <span className="mr-5">
                                      {cart?.productName}
                                    </span>
                                    <span className="mr-5 font-bold">
                                      {cart?.quantityNarration}
                                    </span>
                                    <span className="mr-5">
                                      at{" "}
                                      {formatCurrency(
                                        cart?.unitPriceAtPurchase
                                      )}
                                    </span>
                                    <span className="mr-5 font-bold">
                                      {formatCurrency(
                                        cart?.quantity *
                                          cart?.unitPriceAtPurchase
                                      )}
                                    </span>
                                    <br />
                                  </div>
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
                                Delivery Address:
                              </span>
                              <br />
                              <span>{sale?.deliveryAddress}</span>
                            </div>
                          </li>
                          {sale?.businessName?.length > 1 && (
                            <li className="mb-5 flex gap-3">
                              <div className="w-3/3">
                                <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                  Business Name:
                                </span>
                                <br />
                                <span>{sale?.businessName}</span>
                              </div>
                            </li>
                          )}

                          <li className="mb-5 flex gap-3">
                            <div>
                              <span className="mr-1 font-bold text-brand-500 dark:text-white">
                                Order TimeLine:
                              </span>{" "}
                              <br />
                              {sale?.timeLine != null &&
                                sale?.timeLine?.length > 0 &&
                                sale?.timeLine?.map((act, index) => (
                                  <div className="mb-2 w-full" key={index}>
                                    <p className="font-bold">
                                      {index + 1} {act?.process}
                                    </p>
                                    <p>Initiated By: {act?.initiatedBy}</p>
                                    <p>{act?.instruction}</p>
                                  </div>
                                ))}
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
                    fetchSales(user?.employerId, {
                      status: search?.status,
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
              Update Sales Status
            </p>

            <SelectField
              label="Sale Status"
              extra="mb-3"
              defaultName="Select Sale Status"
              defaultValue="0"
              name="status"
              options={
                WEB_ORDER_STATUS?.length > 0
                  ? [
                      ...getStatusesWithHigherIndex(selected?.status)?.map(
                        (stat: any) => {
                          return {
                            name: stat,
                            value: stat,
                          };
                        }
                      ),
                    ]
                  : []
              }
              value={saleStatus?.status}
              onChange={handleStatusChange}
              showLabel={true}
            />

            {WEB_ORDER_STATUS.indexOf(saleStatus.status) == 1 && (
              <InputField
                variant="auth"
                extra="mb-3"
                label="Delivery Fee"
                id="deliveryFee"
                type="number"
                name="deliveryFee"
                value={saleStatus.deliveryFee}
                disabled={saleStatus.status != WEB_ORDER_STATUS[1]}
                onChange={handleStatusChange}
              />
            )}

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Instruction"
              id="instruction"
              type="text"
              name="instruction"
              value={saleStatus?.instruction}
              onChange={handleStatusChange}
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

export default Websales;
