import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { useLocalContributors } from "features/Plans/PlanEditor/components/IngredientList/hooks/useLocalContributors";
import { useLocalMeal } from "features/Plans/PlanEditor/components/IngredientList/hooks/useLocalMeal";
import { useReadPlanInfo } from "features/Plans/PlanEditor/hooks/useReadPlanInfo";
import { readNutrientAmountFromIngredient, readNutrientAmountFromMeal } from "features/Plans/shared/utils";
import useLocalNutrient from "../Nutrient/useLocalNutrient";
import Ingredient from "./Ingredient";

interface Props {
  id: number;
  nutrientId: number;
}

// TODO: You should be able to adjust servings or remove meals from here
export default function Meal({ id, nutrientId }: Props) {
  const { meal } = useLocalMeal(id);
  const { nutrient } = useLocalNutrient(nutrientId);
  const { totalNutrientAmount } = useLocalContributors({ nutrientId });
  const { plan } = useReadPlanInfo();

  if (!meal || !nutrient || !totalNutrientAmount || !plan) {
    return null;
  }

  const nutrientAmountOfMeal = readNutrientAmountFromMeal(meal, nutrientId);
  const dailyNutrientAmountOfMeal = nutrientAmountOfMeal / plan.daysInPlan;

  const dailyAmountInPlan = totalNutrientAmount / plan.daysInPlan;
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
                      <span className="text-gray-700">{meal.recipe.name}</span>
                    </div>
                    <div className="flex w-1/5">
                      <span className="text-gray-700">{meal.servings}</span>
                      <span className="text-gray-700 ml-2">servings</span>
                    </div>
                    <div className="flex w-1/5 justify-end">
                      <span className="text-gray-700">{Math.round(dailyNutrientAmountOfMeal)}</span>
                      <span className="text-gray-700 ml-2">{nutrient.unit}</span>
                    </div>
                    <div className="flex w-1/5 justify-end pr-8">
                      <span className="text-gray-700">
                        {Math.round((dailyNutrientAmountOfMeal / dailyAmountInPlan) * 100)}
                      </span>
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
                  {[...meal.ingredients]
                    .sort(
                      (a, b) =>
                        (readNutrientAmountFromIngredient(b, nutrientId) ?? 0) -
                        (readNutrientAmountFromIngredient(a, nutrientId) ?? 0)
                    )
                    .map((ingredient) => (
                      <Ingredient id={ingredient.id} key={ingredient.id} nutrientId={nutrientId} />
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
