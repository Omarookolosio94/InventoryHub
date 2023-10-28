import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "core/components/widget/Widget";
import Card from "core/components/card";
import TableRowData from "core/components/table/TableRowData";
import SimpleTable from "core/components/table/SimpleTable";
import useSaleStore from "core/services/stores/useSaleStore";
import useUserStore from "core/services/stores/useUserStore";
import { useEffect, useState } from "react";
import { FREQUENCY, Frequency } from "core/const/const";
import { formatCurrency } from "core/services/helpers";
import { useNavigate } from "react-router-dom";
import SelectField from "core/components/fields/SelectField";
import Button from "core/components/button/Button";
import useShopStore from "core/services/stores/useShopStore";
import InputField from "core/components/fields/InputField";

const Dashboard = () => {
  const navigate = useNavigate();
  const salesAnalytics = useSaleStore((state) => state.analytics);
  const getSaleAnalytics = useSaleStore((state) => state.getSaleAnalytics);
  const isEmployer = useUserStore((state) => state.isEmployer);
  const user = useUserStore((state) => state.user);
  const shops: any = useShopStore((state) => state.shops);
  const getShopsAction = useShopStore((store) => store.getShops);
  const [searchQuery, setSearchQuery] = useState({
    storeId: "",
    frequency: Frequency.MONTHLY,
    date: "",
  });

  const onSearchChange = (e: any) => {
    const { name, value } = e.target;
    setSearchQuery({
      ...searchQuery,
      [name]: value,
    });
  };

  const search = async (e: any) => {
    e.preventDefault();
    getSaleAnalytics(
      searchQuery?.storeId,
      searchQuery?.frequency,
      searchQuery?.date
    );
  };

  useEffect(() => {
    if (shops != null && shops?.length < 1) {
      getShopsAction(user?.employerId);
    }
  }, []);

  useEffect(() => {
    if (!isEmployer) {
      navigate(-1);
    } else {
      getSaleAnalytics(
        searchQuery?.storeId,
        searchQuery?.frequency,
        searchQuery?.date
      );
    }
  }, []);

  // TODO: Format profit or losses

  return (
    <div>
      <Card extra={"ml-5 p-5 mt-[35px]"}>
        <form
          className="flex items-center justify-between gap-3"
          onSubmit={(e: any) => search(e)}
        >
          <div className="w-[400px]">
            <SelectField
              label="Choose"
              showLabel={false}
              defaultName="Select Frequency"
              name="frequency"
              options={[
                ...FREQUENCY?.map((time: any) => {
                  return {
                    name: time,
                    value: time,
                  };
                }),
              ]}
              value={searchQuery?.frequency}
              onChange={(e: any) => onSearchChange(e)}
            />
          </div>
          <div className="w-[400px]">
            <SelectField
              label="Choose"
              showLabel={false}
              defaultName="Select Shop"
              defaultValue=""
              name="storeId"
              options={[
                ...shops?.map((shop: any) => {
                  return {
                    name: `${shop?.name} - ${shop?.isActive ? "✅" : "❌"}`,
                    value: shop?.id,
                  };
                }),
              ]}
              value={searchQuery?.storeId}
              onChange={(e: any) => onSearchChange(e)}
            />
          </div>
          <div className="w-[400px]">
            <InputField
              label=""
              extra=""
              variant="auth"
              showLabel={false}
              id="customerName"
              type="date"
              placeholder=""
              name="date"
              value={searchQuery?.date}
              onChange={(e: any) => onSearchChange(e)}
            />
          </div>
          <Button
            type="submit"
            style="flex gap-1 justify-items-center items-center hide-print"
          >
            Filter
          </Button>
        </form>
      </Card>
      <div className="ml-5 mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-5">
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
