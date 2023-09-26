/* eslint-disable react/style-prop-object */
import { useState } from "react";
import storeDataSample from "./variables/storeData";
import SimpleTable from "components/table/SimpleTable";
import TableRowData from "components/table/TableRowData";
import { getDate } from "services/helpers.service";
import Button from "components/button/Button";
import ActionRowData from "components/table/ActionRowData";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import SubHeader from "components/subHeader";
import Card from "components/card";

const Stores = () => {
  const [stores] = useState(storeDataSample);
  return (
    <div className="mt-3">
      <Card extra={"w-full h-full mx-4 px-6 pb-6 sm:overflow-x-auto"}>
        <SubHeader
          title="Your stores"
          action="Add Store"
          actionFunc={() => console.log("add store")}
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
          {stores.length > 0 &&
            stores.map((store) => (
              <tr key={store?.id}>
                <TableRowData value={store?.name} />
                <TableRowData value={store?.address} />
                <TableRowData value={store?.employer?.name} />
                <TableRowData value={getDate(store?.lastUpdated)} />
                <ActionRowData>
                  {store?.isActive ? (
                    <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
                  ) : (
                    <MdCancel className="me-1 text-red-500 dark:text-red-300" />
                  )}
                </ActionRowData>
                <ActionRowData>
                  <Button onClick={() => {}}>Edit</Button>
                  <Button
                    style="bg-red-600 hover:bg-red-500 dark:text-white-300"
                    onClick={() => {}}
                  >
                    Delete
                  </Button>
                </ActionRowData>
              </tr>
            ))}
        </SimpleTable>
      </Card>
    </div>
  );
};

export default Stores;
