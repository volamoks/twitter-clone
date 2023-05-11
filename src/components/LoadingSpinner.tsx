import React from "react";
import { VscRefresh } from "react-icons/vsc";

type LoadingSpinnerProps = {
  isBig?: boolean;
};

export const LoadingSpinner = ({ isBig = false }: LoadingSpinnerProps) => {
  const sizeClasses = isBig ? "w-16 h-16" : "w-10 h-10";
  return (
    <div className="flex justify-center p-2">
      <VscRefresh className={`animate-spin ${sizeClasses}`} />
    </div>
  );
};
