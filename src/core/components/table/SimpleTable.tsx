import React from "react";

export default function SimpleTable({
  children = <div></div>,
  headers = [""],
  uniqueId = "",
}: {
  children: any;
  headers: string[];
  uniqueId?: string;
}) {
  return (
    <>
      <div
        className={`mt-8 overflow-x-scroll xl:overflow-x-hidden ${uniqueId}`}
      >
        <table className="w-full">
          <thead>
            <tr className="!border-px !border-gray-400">
              {headers.map((header: any, index: any) => (
                <th
                  key={index}
                  className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                >
                  <div className="items-center justify-between text-xs text-gray-200">
                    <p className="text-sm font-bold text-gray-600 dark:text-white">
                      {header}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
}
