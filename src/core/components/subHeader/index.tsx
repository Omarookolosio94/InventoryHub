import React from "react";
import Button from "core/components/button/Button";
import { BsChevronDoubleLeft } from "react-icons/bs";

export default function SubHeader(props: {
  title: string;
  action?: string;
  actionFunc?: any;
  showAction?: boolean;
  icon?: any;
}) {
  const { title, action, actionFunc, showAction = true, icon } = props;
  return (
    <div className="align-item-center mt-5 flex justify-between py-2">
      <div className="flex gap-3">
        <p className="text-black-p font-arial text-base font-bold">{title}</p>
      </div>
      <div className="flex gap-3">
        {showAction && (
          <Button
            style="flex gap-1 justify-items-center items-center"
            onClick={() => actionFunc()}
          >
            {icon && icon}
            <span className="text-xs">{action}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

// TODO: Add loading state
