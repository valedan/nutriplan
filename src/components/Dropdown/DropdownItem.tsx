import { Menu } from "@headlessui/react";
import classNames from "classnames";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export default function DropdownItem({ title, ...props }: Props) {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={classNames(active ? "bg-gray-100 text-gray-900" : "text-gray-700", "block px-4 py-2 text-sm")}
          {...props}
        >
          {title}
        </div>
      )}
    </Menu.Item>
  );
}
