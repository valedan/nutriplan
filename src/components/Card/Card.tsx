import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function Card({ children, className, ...props }: Props) {
  return (
    <div className={classNames("flex flex-col bg-white shadow rounded px-4 py-2", className)} {...props}>
      {children}
    </div>
  );
}

function Header({ children, className, ...props }: Props) {
  return (
    <div className={classNames("flex w-full items-center pb-2 mb-2 border-b border-gray-200", className)} {...props}>
      {children}
    </div>
  );
}

function Content({ children, className, ...props }: Props) {
  return (
    <div className={classNames("flex w-full", className)} {...props}>
      {children}
    </div>
  );
}

Card.Header = Header;
Card.Content = Content;

export default Card;
