import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Modal({
  onClose = () => {},
  children = "Modal",
  styling,
}: {
  onClose?: any;
  children?: any;
  styling?: any;
}) {
  return (
    <div className="bg-navy-500/30 no-scrollbar overlay fixed left-0 top-0 z-40 h-screen w-screen overflow-auto backdrop-opacity-10">
      <div
        style={{ minHeight: "calc(100vh - 72px)" }}
        className="mb:p-5 relative relative mt-10 flex w-full flex-row-reverse items-start justify-center gap-1 p-2 pt-10"
      >
        <div className="relative">
          <button type="button" className="absolute top-0" onClick={onClose}>
            <AiOutlineCloseCircle className="h-auto w-8 text-white" />
          </button>
        </div>
        <div
          className={`${styling || "w-10/12 max-w-sm p-5"} rounded bg-white dark:bg-navy-600 darK:text-gray-500`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
