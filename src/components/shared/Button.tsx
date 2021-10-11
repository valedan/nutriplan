import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

const Button = ({ children, variant = "primary", className = "", ...props }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ",
        {
          "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-400": variant === "primary",
          "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-400": variant === "secondary",
          "text-gray-700 bg-white hover:bg-gray-100 focus:ring-blue-400 border-gray-300": variant === "ghost",
          "text-white bg-red-500 hover:bg-red-600 focus:ring-red-400": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
