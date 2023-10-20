/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { FaFileExport } from "react-icons/fa";
import Button from "./Button";

export const ExportButton = ({
  data,
  filename,
}: {
  data: any;
  filename: any;
}) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (data: any, filename: any) => {
    if (data?.length < 1) return;

    const ws = XLSX.utils.json_to_sheet(data);

    const capitalizedKeys = Object.keys(data[0]).map(
      (key) => key.toUpperCase()
      // eslint-disable-next-line function-paren-newline
    );

    /* custom headers */
    XLSX.utils.sheet_add_aoa(ws, [capitalizedKeys], {
      origin: "A1",
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const finaldata: any = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(finaldata, filename + fileExtension);
  };

  return (
    <Button
      style="flex gap-1 bg-yellow-500 hover:bg-yellow-600 justify-items-center items-center hide-print"
      onClick={(e: any) => exportToCSV(data, filename)}
    >
      <FaFileExport />
      <span className="text-xs">Export</span>
    </Button>
  );
};
