import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { differenceInDays } from "date-fns";
import ContentModal from "../../shared/Modal/ContentModal";
import {
  Meal as IMeal,
  Recipe,
  useGetNutrientQuery,
  useGetPlanWithNutrientsQuery,
} from "../../../generated/graphql/hooks";
import {
  readDailyNutrientAmount,
  readNutrientAmountFromIngredient,
  readNutrientAmountFromMeal,
  WeighableIngredientWithNutrients,
} from "../../Plans/shared/utils";
import { Button } from "../../shared";
import Ingredient from "./Ingredient";
import Meal from "./Meal";

interface Props {
  nutrientId: number;
  onClose: () => void;
  planId: number;
}

export default function NutrientModal({ planId, nutrientId, onClose }: Props) {
  const { data } = useGetPlanWithNutrientsQuery({
    variables: { planId },
  });

  const { data: nutrientData } = useGetNutrientQuery({ variables: { id: nutrientId } });

  if (!data?.plan || !nutrientData?.nutrient) {
    return null;
  }

  const dailyNutrientAmount = Math.round(readDailyNutrientAmount(data.plan, nutrientId));

  const min = nutrientData.nutrient.activeTarget?.min;
  const max = nutrientData.nutrient.activeTarget?.max;
  const name = nutrientData.nutrient.displayName || nutrientData.nutrient.name;
  const { unit } = nutrientData.nutrient;

  interface ContributorBase {
    id: number;
    name: string;
    amount: number;
    measure: string;
    dailyNutrientAmount: number;
    dailyNutrientPercentage: number;
  }

  interface IngredientContributor extends ContributorBase {
    kind: "ingredient";
  }
  interface MealContributor extends ContributorBase {
    kind: "meal";
    ingredients: IngredientContributor[];
  }

  interface Contributor extends ContributorBase {
    kind: "ingredient" | "meal";
    ingredients?: IngredientContributor[];
  }

  const calculateTargetStatus = () => {
    const isAboveMax = max && dailyNutrientAmount > max;
    const isBelowMin = min && dailyNutrientAmount < min;

    if (isAboveMax) {
      const percentageAboveMax = ((dailyNutrientAmount - max) / max) * 100;
      return `${Math.round(percentageAboveMax)}% above target`;
    }

    if (isBelowMin) {
      const percentageBelowMin = ((min - dailyNutrientAmount) / min) * 100;
      return `${Math.round(percentageBelowMin)}% below target`;
    }

    if (min || max) {
      return `On target`;
    }

    return null;
  };

  const daysInPlan = differenceInDays(new Date(data.plan.startDate), new Date(data.plan.endDate));

  const convertIngredientToContributor = (
    ingredient: WeighableIngredientWithNutrients & { id: number; food: { description: string } }
  ): IngredientContributor => {
    const dailyNutrientAmountOfIngredient = readNutrientAmountFromIngredient(ingredient, nutrientId) / daysInPlan;
    return {
      kind: "ingredient",
      id: ingredient.id,
      name: ingredient.food.description,
      amount: ingredient.amount,
      measure: ingredient.measure,
      dailyNutrientAmount: Math.round(dailyNutrientAmountOfIngredient),
      dailyNutrientPercentage: Math.round((dailyNutrientAmountOfIngredient / dailyNutrientAmount) * 100),
    };
  };

  const convertMealToContributor = (meal: {
    ingredients: (WeighableIngredientWithNutrients & { id: number; food: { description: string } })[];
    id: number;
    recipe: { name: string };
    servings: number;
  }): MealContributor => {
    const dailyNutrientAmountOfMeal = readNutrientAmountFromMeal(meal, nutrientId) / daysInPlan;
    return {
      kind: "meal",
      id: meal.id,
      name: meal.recipe.name,
      amount: meal.servings,
      measure: "servings",
      dailyNutrientAmount: Math.round(dailyNutrientAmountOfMeal),
      dailyNutrientPercentage: Math.round((dailyNutrientAmountOfMeal / dailyNutrientAmount) * 100),
      ingredients: meal.ingredients
        .map(convertIngredientToContributor)
        .sort((a, b) => b.dailyNutrientPercentage - a.dailyNutrientPercentage),
    };
  };

  interface MealWithRecipe extends IMeal {
    recipe: Recipe & { name: string };
  }

  const ingredients = data.plan.ingredients.map(convertIngredientToContributor);

  const meals = data.plan.meals
    .filter((meal): meal is MealWithRecipe => Boolean(meal.recipe))
    .map((meal) => convertMealToContributor(meal));

  const contributors: Contributor[] = [...ingredients, ...meals].sort(
    (a, b) => b.dailyNutrientAmount - a.dailyNutrientAmount
  );

  return (
    <ContentModal
      open
      onClose={onClose}
      title={
        <p>
          {name} - <span className="font-medium">{calculateTargetStatus()}</span>
        </p>
      }
    >
      <div className="flex justify-between mb-10">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-400">Amount in current plan</span>
          <p className=" text-gray-900">
            {dailyNutrientAmount} {unit}
          </p>
        </div>
        <div>
          <div className="flex items-end">
            <div>
              <span className="text-sm font-medium text-gray-400">Target</span>
              <p className=" text-gray-900">
                {min} - {max} {unit}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} size="small" className="ml-4">
              Change target
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Tab.Group>
          <Tab.List className="border-b border-gray-200 mb-4">
            <Tab>
              {({ selected }) => (
                <button
                  type="button"
                  className={classNames(
                    selected
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                  )}
                >
                  Top Contributors
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  type="button"
                  className={classNames(
                    selected
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                  )}
                >
                  Best Sources
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="px-4">
                {contributors.map((contributor) =>
                  contributor.kind === "meal" ? (
                    <Meal meal={contributor as MealContributor} unit={unit} />
                  ) : (
                    <Ingredient ingredient={contributor} unit={unit} />
                  )
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>Coming soon</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ContentModal>
  );
}
