import type { ReactNode } from "react";

type IconsHoverEffectProps = {
  children: ReactNode;
  isRed?: boolean;
};

export const IconsHoverEffect = ({
  children,
  isRed = false,
}: IconsHoverEffectProps) => {
  const colorClasses = isRed
    ? "outline-red-500 hover:bg-red-200 group-hover:bg-red-200 focus-visible:bg-red-200 group-focus-visible:bg-red-200 "
    : "outline-gray-500 hover:bg-gray-200 group-hover:bg-gray-200 focus-visible:bg-gray-200 group-focus-visible:bg-gray-200";

  return (
    <div
      className={`-ml-2 items-center rounded-full p-2 transition-all ${colorClasses}`}
    >
      {children}
    </div>
  );
};
