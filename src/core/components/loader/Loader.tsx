import React from "react";
import Modal from "react-responsive-modal";
import "assets/css/Spinner.css";

function Loader({ message = "Loading" }: { message?: string }) {
  return (
    <Modal
      classNames={{ modal: "rounded-md no-padding", 
    }}
      open
      showCloseIcon={false}
      onClose={() => {}}
      center
    >
      <div
        className="absolute top-0 flex w-full flex-col items-center justify-center bg-navy-500 bg-opacity-95 dark:bg-brand-500 dark:bg-opacity-95"
              style={{ zIndex: 100000, height: "100%" }}
      >
        <div className="loader">
          <div className="bar">
            <div className="circle"></div>
            <p className="text-navy-500 dark:text-brand-500">{message}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Loader;
