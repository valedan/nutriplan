import { useLocalContributors } from "features/Plans/PlanEditor/components/IngredientList/hooks/useLocalContributors";
import { useLocalIngredient } from "features/Plans/PlanEditor/components/IngredientList/hooks/useLocalIngredient";
import { useReadPlanInfo } from "features/Plans/PlanEditor/hooks/useReadPlanInfo";
import { readNutrientAmountFromIngredient } from "features/Plans/shared/utils";
import useLocalNutrient from "../Nutrient/useLocalNutrient";

interface Props {
  id: number;
  nutrientId: number;
}

// TODO: You should be able to adjust amounts or remove ingredients from here
export default function Ingredient({ id, nutrientId }: Props) {
  const { ingredient } = useLocalIngredient(id);
  const { nutrient } = useLocalNutrient(nutrientId);
  const { totalNutrientAmount } = useLocalContributors({ nutrientId });
  const { plan } = useReadPlanInfo();

  if (!ingredient || !nutrient || !totalNutrientAmount || !plan) {
    return null;
  }

  const nutrientAmountOfIngredient = readNutrientAmountFromIngredient(ingredient, nutrientId);
  const dailyNutrientAmountOfIngredient = nutrientAmountOfIngredient / plan.daysInPlan;

  const dailyAmountInPlan = totalNutrientAmount / plan.daysInPlan;
  return (
    <div
      key={ingredient.id}
      className="flex items-center  px-2 py-4 flex-grow w-full justify-between border-b border-gray-200"
    >
      <div className="flex w-2/5">
        <span className="text-gray-700">{ingredient.food.description}</span>
      </div>
      <div className="flex w-1/5">
        <span className="text-gray-700">{ingredient.amount}</span>
        <span className="text-gray-700 ml-2">{ingredient.measure}</span>
      </div>
      <div className="flex w-1/5 justify-end">
        <span className="text-gray-700">{Math.round(dailyNutrientAmountOfIngredient)}</span>
        <span className="text-gray-700 ml-2">{nutrient.unit}</span>
      </div>
      <div className="flex w-1/5 justify-end pr-8">
        <span className="text-gray-700">{Math.round((dailyNutrientAmountOfIngredient / dailyAmountInPlan) * 100)}</span>
        <span className="text-gray-700 ml-2">%</span>
      </div>
    </div>
  );
}
