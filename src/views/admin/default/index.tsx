import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "core/components/widget/Widget";
import Card from "core/components/card";
import TableRowData from "core/components/table/TableRowData";
import SimpleTable from "core/components/table/SimpleTable";
import useSaleStore from "core/services/stores/useSaleStore";
import useUserStore from "core/services/stores/useUserStore";
import { useEffect } from "react";
import { Frequency } from "core/const/const";
import { formatCurrency } from "core/services/helpers";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const salesAnalytics = useSaleStore((state) => state.analytics);
  const getSaleAnalytics = useSaleStore((state) => state.getSaleAnalytics);
  const isEmployer = useUserStore((state) => state.isEmployer);

  useEffect(() => {
    if (!isEmployer) {
      navigate(-1);
    } else {
      getSaleAnalytics("", Frequency.MONTHLY, "");
    }
  }, []);

  // TODO: Format profit or losses

  return (
    <div>
      <div className="ml-5 mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
        <Widget
          icon={<MdBarChart className="h-5 w-5" />}
          title={"Earnings"}
          subtitle={formatCurrency(
            salesAnalytics?.profitOrLossBeforeExpenseAndTax
          )}
        />
        <Widget
          icon={<IoDocuments className="h-5 w-5" />}
          title={"Total Cost"}
          subtitle={formatCurrency(salesAnalytics?.totalCost)}
        />
        <Widget
          icon={<MdBarChart className="h-5 w-5" />}
          title={"Sales"}
          subtitle={formatCurrency(salesAnalytics?.totalSales)}
        />
        <Widget
          icon={<MdDashboard className="h-5 w-5" />}
          title={"Total Delivery Fee"}
          subtitle={formatCurrency(salesAnalytics?.totalDeliveryFee)}
        />
        <Widget
          icon={<MdBarChart className="h-5 w-5" />}
          title={"Total Tax"}
          subtitle={formatCurrency(salesAnalytics?.totalTax)}
        />
      </div>

      <Card extra={"mt-[35px] w-full h-full mx-5 px-6 pb-6 sm:overflow-x-auto"}>
        <h2 className="mt-5 text-lg font-bold text-navy-700 dark:text-white">
          Revenue's Breakdown By Products
        </h2>

        <SimpleTable
          headers={[
            "Name",
            "Total Sales",
            "Total Cost",
            "Units Sold",
            "Profit/Loss",
          ]}
        >
          {salesAnalytics != null &&
          salesAnalytics?.salesRecords?.length > 0 ? (
            salesAnalytics?.salesRecords.map((record: any) => (
              <>
                <tr key={record?.productName}>
                  <TableRowData value={record?.productName} />
                  <TableRowData
                    value={formatCurrency(record?.totalSellingPrice)}
                  />
                  <TableRowData
                    value={formatCurrency(record?.totalCostPrice)}
                  />
                  <TableRowData value={record?.totalUnitsSold} />
                  <TableRowData
                    value={formatCurrency(
                      record?.totalSellingPrice - record?.totalCostPrice
                    )}
                  />
                </tr>
              </>
            ))
          ) : (
            <tr>
              <TableRowData colSpan={5} value="No sales yet" />
            </tr>
          )}
        </SimpleTable>
      </Card>
    </div>
  );
};

export default Dashboard;
