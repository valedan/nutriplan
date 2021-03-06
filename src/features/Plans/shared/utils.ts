import { differenceInDays } from "date-fns";

export interface WeighableIngredientWithNutrients {
  id: number;
  amount: number;
  measure: string;
  order: number;
  food: {
    portions: {
      measure: string;
      gramWeight: number;
    }[];
    foodNutrients: {
      amount: number;
      nutrient: {
        id: number;
      };
    }[];
  };
}

export const readGramWeightOfIngredient = (
  ingredient: Omit<WeighableIngredientWithNutrients, "foodNutrients">
): number | null => {
  const matchingPortion = ingredient.food.portions.find((p) => p.measure === ingredient.measure);

  if (!matchingPortion) {
    return null;
  }

  return ingredient.amount * matchingPortion.gramWeight;
};

export const readNutrientAmountFromIngredient = (
  ingredient: WeighableIngredientWithNutrients,
  nutrientId: number
): number => {
  const ingredientWeightInGrams = readGramWeightOfIngredient(ingredient);
  const nutrientAmountPer100G = ingredient.food.foodNutrients.find((fn) => fn.nutrient.id === nutrientId)?.amount;

  if (!nutrientAmountPer100G || !ingredientWeightInGrams) {
    // TODO: Add some error logging - this should never happen. Maybe handle this on backend or in a query hook.
    return 0;
  }

  return (nutrientAmountPer100G * ingredientWeightInGrams) / 100;
};

export const readNutrientAmountFromIngredients = (
  ingredients: WeighableIngredientWithNutrients[],
  nutrientId: number
): number => ingredients.reduce((acc, ingredient) => acc + readNutrientAmountFromIngredient(ingredient, nutrientId), 0);

export const readNutrientAmountFromMeal = (
  meal: { ingredients: WeighableIngredientWithNutrients[] },
  nutrientId: number
): number => readNutrientAmountFromIngredients(meal.ingredients, nutrientId);

export const readNutrientAmountFromMeals = (
  meals: { ingredients: WeighableIngredientWithNutrients[] }[],
  nutrientId: number
): number => meals.reduce((acc, meal) => acc + readNutrientAmountFromMeal(meal, nutrientId), 0);

export const readTotalNutrientAmount = (
  plan: {
    ingredients: WeighableIngredientWithNutrients[];
    meals: { ingredients: WeighableIngredientWithNutrients[] }[];
  },
  nutrientId: number
): number =>
  readNutrientAmountFromIngredients(plan.ingredients, nutrientId) + readNutrientAmountFromMeals(plan.meals, nutrientId);

export const readDailyNutrientAmount = (
  plan: {
    ingredients: WeighableIngredientWithNutrients[];
    meals: { ingredients: WeighableIngredientWithNutrients[] }[];
    startDate: string;
    endDate: string;
  },
  nutrientId: number
): number =>
  readTotalNutrientAmount(plan, nutrientId) / differenceInDays(new Date(plan.endDate), new Date(plan.startDate));
