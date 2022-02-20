import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className, ...props }: Props) {
  return (
    <div className={classNames("bg-white shadow rounded", className)} {...props}>
      {children}
    </div>
  );
}
