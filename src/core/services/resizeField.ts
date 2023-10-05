import React, { useEffect } from "react";

const reSizeField = (textAreaRef: any, value: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";

      const { scrollHeight } = textAreaRef;
      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default reSizeField;
