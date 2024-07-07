import { Loader2 } from "lucide-react";
import React from "react";

const Message = ({
  message,
  isVisible,
}: {
  message: string;
  isVisible: boolean;
}) => {
  if (isVisible)
    return (
      <div className="flex items-center fixed bottom-0 left-0 z-20 gap-x-2">
        <Loader2 color="white" className="size-5 animate-spin" />
        <p className="text-[12px] text-white font-normal">{message}</p>
      </div>
    );
  {
  }
};

export default Message;
