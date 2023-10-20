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
  printSection,
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
import { FiPrinter } from "react-icons/fi";

const Archives = () => {
  const navigate = useNavigate();
  const user: any = useUserStore((store) => store.user);
  const access = useUserStore((store) => store.access);
  const isEmployer = useUserStore((store) => store.isEmployer);
  const [storeId, setStoreId] = useState("");
  const [amount, setAmount] = useState(0);
  const salesForTax = useSaleStore((store) => store.salesForTax);
  const getSalesForTaxAction = useSaleStore((store) => store.getSaleForTax);

  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });

  const printer = (title: string) => {
    const titleBefore = document.title;
    document.title = title;
    window.print();
    document.title = titleBefore;
  };

  useEffect(() => {
    if (!isEmployer) {
      navigate(-1);
    } else {
      getSalesForTaxAction(storeId, amount);
    }
  }, []);

  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title={`Sales for ${monthName}`}
          action="Print Sales"
          showAction={true}
          showExport={true}
          showSearch
          searchType="number"
          searchPlaceholder="amount"
          searchValue={amount}
          exportData={salesForTax?.sales?.map((sale: any) => {
            return {
              code: sale?.code,
              soldBy: sale?.soldBy,
              totalPaid: sale?.totalPaid,
              billType: sale?.billType,
              paymentMethod: sale?.paymentMethod,
              isPaid: sale?.isPaid ? "paid" : "unpaid",
              dateSold: sale?.dateAdded,
            };
          })}
          exportFileName={`${user?.name} Tax- Sales report for ${monthName}`}
          searchChange={(e: any) => setAmount(e.target.value)}
          searchAction={() => getSalesForTaxAction(storeId, amount)}
          actionFunc={() =>
            printer(`${user?.name} Tax- Sales report for ${monthName}`)
          }
          icon={<FiPrinter />}
        />
        <SimpleTable
          headers={[
            "Inv. Code",
            "Bill Type",
            "Status",
            "Total Amount",
            "Paid With",
            "Is Paid",
            "Date Sold",
          ]}
          uniqueId="salesbeforetax"
        >
          {salesForTax != null && salesForTax?.sales?.length > 0 ? (
            salesForTax.sales.map((sale: any) => (
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
                </tr>
              </>
            ))
          ) : (
            <tr>
              <TableRowData colSpan={8} value="No sales yet" />
            </tr>
          )}
        </SimpleTable>
      </Card>
    </div>
  );
};

export default Archives;
