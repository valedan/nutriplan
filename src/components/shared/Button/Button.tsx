import React from "react";
import classNames from "classnames";

interface Props extends React.ComponentPropsWithRef<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "small" | "medium";
}
export type Ref = HTMLButtonElement;

const Button = React.forwardRef<Ref, Props>(
  ({ children, size = "medium", variant = "primary", className = "", ...props }: Props, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          "inline-flex items-center  border border-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ",
          {
            "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-400": variant === "primary",
            "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-400": variant === "secondary",
            "text-gray-700 bg-white hover:bg-gray-100 focus:ring-blue-400 border-gray-300": variant === "ghost",
            "text-white bg-red-600 hover:bg-red-700 focus:ring-red-400": variant === "danger",
          },
          {
            "px-3 py-1 text-sm leading-4 h-8": size === "small",
            "px-4 py-2 text-sm": size === "medium",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
