import React from "react";
import Button from "core/components/button/Button";

export default function SubHeader(props: {
  title: string;
  action?: string;
  actionFunc?: any;
}) {
  const { title, action, actionFunc } = props;
  return (
    <div className="flex justify-between align-item-center mt-5 py-2">
      <div className="flex gap-3">
        <p className="text-black-p font-arial text-base font-bold">{title}</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => actionFunc()}>{action}</Button>
      </div>
    </div>
  );
}


// TODO: Add loading state