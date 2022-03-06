import { useApolloClient } from "@apollo/client";
import { useCurrentPlan } from "features/Plans/PlanEditor/PlanContext";
import {
  readNutrientAmountFromIngredient,
  readNutrientAmountFromMeal,
  WeighableIngredientWithNutrients,
} from "features/Plans/shared/utils";
import { GetPlanWithNutrientsDocument, GetPlanWithNutrientsQuery } from "generated/graphql/hooks";

const parseIngredientInfo = (ingredient: WeighableIngredientWithNutrients, nutrientId?: number) => {
  const ingredientInfo = { __typename: "Ingredient", id: ingredient.id, order: ingredient.order };

  const nutrientAmount = nutrientId ? readNutrientAmountFromIngredient(ingredient, nutrientId) : undefined;

  return { ...ingredientInfo, nutrientAmount };
};

const parseMealInfo = (
  meal: { id: number; order: number; ingredients: WeighableIngredientWithNutrients[] },
  nutrientId?: number
) => {
  const mealIngredients = meal.ingredients.map((ingredient) => parseIngredientInfo(ingredient, nutrientId));
  const mealInfo = { __typename: "Meal", id: meal.id, ingredients: mealIngredients, order: meal.order };

  const nutrientAmount = nutrientId ? readNutrientAmountFromMeal(meal, nutrientId) : undefined;

  return { ...mealInfo, nutrientAmount };
};

interface Options {
  nutrientId?: number;
}

export const useLocalContributors = ({ nutrientId }: Options = {}) => {
  const { id: planId } = useCurrentPlan();
  const client = useApolloClient();

  const planData = client.readQuery<GetPlanWithNutrientsQuery>({
    query: GetPlanWithNutrientsDocument,
    variables: {
      planId,
    },
  });

  if (!planData?.plan) {
    return { contributors: [] };
  }

  const { plan } = planData;

  const ingredients = plan.ingredients.map((ingredient) => parseIngredientInfo(ingredient, nutrientId));
  const meals = plan.meals.map((meal) => parseMealInfo(meal, nutrientId));

  const contributors = [...meals, ...ingredients];

  const totalNutrientAmount = nutrientId
    ? contributors.reduce(
        (total, contributor) => (contributor.nutrientAmount ? total + contributor.nutrientAmount : total),
        0
      )
    : undefined;

  return {
    contributors,
    totalNutrientAmount,
  };
};
