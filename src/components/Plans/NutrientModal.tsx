import ContentModal from "../shared/Modal/ContentModal";
import { Ingredient as TIngredient, Meal as TMeal } from "../../generated/graphql";

type Food = {
  id: number;
  description: string;
  foodNutrients: {
    id: number;
    amount: number;
    nutrient: {
      id: number;
      name: string;
      unit: string;
    };
  }[];
};

type FoodAmount = {
  foodId: number;
  amountInGrams: number;
  amount: number;
  measure: string;
};

interface Props {
  nutrientId: number | null;
  onClose: () => void;
  // TODO: clean up types
  foods: Food[];
  foodAmounts: FoodAmount[];
  daysInPlan: number;
}

const aggregateFoodsWithNutrientAmount = (
  foods: Food[],
  nutrientId: number,
  foodAmounts: FoodAmount[],
  daysInPlan: number
) => {
  // TODO: normalize lots of stuff for perf

  const getNutrientAmountForFood = (food: Food) => {
    const nutrientAmountPer100Grams = food.foodNutrients.find((fn) => fn.nutrient.id === nutrientId)?.amount;
    return (nutrientAmountPer100Grams || 0) / 100;
  };

  const foodsWithNutrientAmount = foodAmounts.map(({ foodId, amount }) => {
    const food = foods.find(({ id }) => id === foodId);
    const foodAmount = foodAmounts.find(({ foodId: faFoodId }) => foodId === faFoodId);
    if (!food || !foodAmount) {
      return null;
    }
    return {
      foodId,
      description: food.description,
      nutrientAmountPerDay: (getNutrientAmountForFood(food) * amount) / daysInPlan,
      amount: foodAmount.amount,
      measure: foodAmount.measure,
    };
  });

  return foodsWithNutrientAmount.filter(Boolean);
};

// TODO: does not currently include meals
// TODO: Include user-selected portion rather than normalized amount
export default function NutrientModal({ nutrientId, onClose, foods, foodAmounts, daysInPlan }: Props) {
  if (!nutrientId) {
    return null;
  }

  const foodsWithNutrientAmount = aggregateFoodsWithNutrientAmount(foods, nutrientId, foodAmounts, daysInPlan);
  console.log("foodsWithNutrientAmount", foodsWithNutrientAmount);
  return (
    <ContentModal open onClose={onClose} title="test">
      {nutrientId}
    </ContentModal>
  );
}
