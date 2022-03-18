import { Food } from "generated/graphql/hooks";

export const getNutrientAmountForFood = (food: Food, nutrientId: number): number => {
  const nutrientAmountPer100Grams = food.foodNutrients.find((fn) => fn.nutrient.id === nutrientId)?.amount;
  return (nutrientAmountPer100Grams || 0) / 100;
};
