import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Ingredient, { IIngredient } from "./Ingredient";

interface IMeal {
  id: number;
  name: string;
  amount: number;
  measure: string;
  dailyNutrientAmount: number;
  dailyNutrientPercentage: number;
  ingredients: IIngredient[];
}

interface Props {
  meal: IMeal;
  unit: string;
}

// TODO: You should be able to adjust servings or remove meals from here
export default function Meal({ meal, unit }: Props) {
  return (
    <Disclosure key={meal.id}>
      {({ open }) => (
        <div className="flex my-4">
          <div className="flex flex-col shadow w-full rounded-lg border-gray-200 border">
            <div className="flex  items-center flex-grow bg-gray-100 shadow">
              <div className="flex items-center ml-2 px-2  flex-grow justify-between ">
                <Disclosure.Button className="w-full">
                  <div className="flex items-center w-full flex-grow my-2 ">
                    <div className="flex w-2/5 items-center">
                      <ChevronRightIcon className={`${open ? "transform rotate-90" : ""} w-5 h-5 text-gray-500 mr-2`} />
                      <span className="text-gray-700">{meal.name}</span>
                    </div>
                    <div className="flex w-1/5">
                      <span className="text-gray-700">{meal.amount}</span>
                      <span className="text-gray-700 ml-2">{meal.measure}</span>
                    </div>
                    <div className="flex w-1/5 justify-end">
                      <span className="text-gray-700">{meal.dailyNutrientAmount}</span>
                      <span className="text-gray-700 ml-2">{unit}</span>
                    </div>
                    <div className="flex w-1/5 justify-end pr-8">
                      <span className="text-gray-700">{meal.dailyNutrientPercentage}</span>
                      <span className="text-gray-700 ml-2">%</span>
                    </div>
                  </div>
                </Disclosure.Button>
              </div>
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 text-sm">
                <div>
                  {meal.ingredients.map((ingredient: IIngredient) => (
                    <Ingredient ingredient={ingredient} unit={unit} key={ingredient.id} />
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        </div>
      )}
    </Disclosure>
  );
}

// <div
//   key={meal.id}
//   className="flex items-center  px-2 py-4 flex-grow w-full justify-between border-b border-gray-200"
// >
//   <div className="flex w-2/5">
//     <span className="text-gray-700">{meal.name}</span>
//   </div>
//   <div className="flex w-1/5">
//     <span className="text-gray-700">{meal.amount}</span>
//     <span className="text-gray-700 ml-2">{meal.measure}</span>
//   </div>
//   <div className="flex w-1/5 justify-end">
//     <span className="text-gray-700">{meal.dailyNutrientAmount}</span>
//     <span className="text-gray-700 ml-2">{unit}</span>
//   </div>
//   <div className="flex w-1/5 justify-end pr-8">
//     <span className="text-gray-700">{meal.dailyNutrientPercentage}</span>
//     <span className="text-gray-700 ml-2">%</span>
//   </div>
// </div>
