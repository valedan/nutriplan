import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Heading from "./Heading";

interface Props {
  children: React.ReactNode;
  className?: string;
  to: string;
}

export default function NavHeading({ children, to, className = "", ...props }: Props) {
  return (
    <Heading weight="light" className={`${className}`} {...props}>
      <div className="flex items-center">
        <Link href={to}>
          <a className="mr-2 inline-flex justify-center ">
            <ArrowLeftIcon className="inline-block w-5 h-5" />
          </a>
        </Link>
        {children}
      </div>
    </Heading>
  );
}
