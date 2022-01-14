import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Nutrient from "./Nutrient";

interface Props {
  name: string;
  nutrients: {
    id: number;
    name: string;
    unit: string;
    order?: number | null;
    displayName?: string | null;
    activeTarget: {
      min?: number | null;
      max?: number | null;
    };
  }[];
  nutrientAmounts: {
    [key: number]: number;
  };
}

export default function NutrientGroup({ name, nutrients, nutrientAmounts }: Props) {
  return (
    // Add transition to open/close
    // https://headlessui.dev/react/disclosure#transitions
    <Disclosure defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex relative justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-7">
            <h2>{name}</h2>
            <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
          </Disclosure.Button>

          <Disclosure.Panel className="flex flex-col py-4 ">
            {nutrients
              .slice()
              .sort(({ order }) => order || 1000)
              .map((nutrient) => {
                return (
                  <Nutrient
                    key={nutrient.id}
                    id={nutrient.id}
                    amount={nutrientAmounts[nutrient.id] || 0}
                    unit={nutrient.unit}
                    name={nutrient.displayName || nutrient.name}
                    min={nutrient.activeTarget.min}
                    max={nutrient.activeTarget.max}
                  />
                );
              })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
