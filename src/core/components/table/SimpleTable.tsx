import React from "react";
import Card from "core/components/card";

export default function SimpleTable({
  children = <div></div>,
  headers = [""],
}: {
  children: any;
  headers: string[];
}) {
  return (
    <>
      <div className="overflow-x-scroll xl:overflow-x-hidden mt-8">
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
