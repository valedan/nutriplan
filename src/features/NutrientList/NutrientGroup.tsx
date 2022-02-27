import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

interface Props {
  name: string;
  children: React.ReactNode;
}

export default function NutrientGroup({ name, children }: Props) {
  return (
    // TODO: Add transition to open/close
    // https://headlessui.dev/react/disclosure#transitions
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex relative justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-7">
            <h2>{name}</h2>
            <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
          </Disclosure.Button>

          <Disclosure.Panel className="flex flex-col py-4 ">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
