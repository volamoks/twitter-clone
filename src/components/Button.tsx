import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  isSmall?: boolean;
  isGray?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({
  isSmall = false,
  isGray = false,
  className = "",
  ...props
}: ButtonProps) => {
  const sizeClasses = isSmall ? "px-2 py-1" : "py-2 px-4 font-bold";
  const colorClasses = isGray
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
    : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400";

  return (
    <button
      className={`rounded-full text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses}  ${className} ${colorClasses}`}
      {...props}
    ></button>
  );
};
