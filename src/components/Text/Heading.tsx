import classNames from "classnames";

const componentSizeVariants = {
  medium: "h3",
};

interface Props {
  children: React.ReactNode;
  className?: string;
  size?: "medium";
  weight?: "heavy" | "normal" | "light";
}

export default function Heading({ children, className = "", size = "medium", weight = "normal", ...props }: Props) {
  const Component = componentSizeVariants[size] as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        "leading-loose",
        {
          "text-lg": size === "medium",
        },
        {
          "text-gray-500": weight === "light",
          "text-gray-700": weight === "normal",
          "text-gray-900": weight === "heavy",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
