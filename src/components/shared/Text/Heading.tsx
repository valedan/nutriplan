import classNames from "classnames";

const componentVariants = {
  medium: "h3",
};

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "medium";
}

export default function Heading({ children, className = "", variant = "medium", ...props }: Props) {
  const Component = componentVariants[variant] as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        "text-gray-500 leading-loose",
        {
          "text-lg": variant === "medium",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
