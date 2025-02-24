"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipWrapper = ({
  children,
  label,
  isSidebarOpen,
  margin = "ml-10 -mb-8",
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={`${
            isSidebarOpen ? "hidden" : "block"
          } ${margin} bg-white text-black text-[15px] px-3 py-2 rounded-md shadow-sm shadow-gray-500 transition-all duration-300`}
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
