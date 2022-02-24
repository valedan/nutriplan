import { Portion, useGetPlanQuery } from "generated/graphql/hooks";
import { useState } from "react";
import { sortByOrder } from "../shared/utils";
import Ingredient from "./Ingredient";
import Meal from "./Meal";
import { useCurrentPlan } from "./PlanContext";

export default function IngredientList() {
  const { id, refetch } = useCurrentPlan();
  const { data } = useGetPlanQuery({ variables: { id } });

  if (!data) {
    return null;
  }

  interface IngredientItem {
    __typename?: "Ingredient";
    id: number;
    amount: number;
    measure: string;
    order: number;
    food: {
      description: string;
      portions: Portion[];
    };
  }

  interface MealItem {
    __typename?: "Meal";
    id: number;
    servings: number;
    order: number;
    recipe?: {
      name?: string | null;
      id: number;
    } | null;
    ingredients: IngredientItem[];
  }

  // TODO: look into a better pattern here.
  const ingredients = data?.plan?.ingredients;
  const meals = data?.plan?.meals;
  const planItems: (IngredientItem | MealItem)[] = [
    ...(ingredients?.length ? ingredients : []),
    ...(meals?.length ? meals : []),
  ];

  return (
    <ul className="mt-2 w-full">
      {planItems.map((planItem) => {
        // eslint-disable-next-line no-underscore-dangle
        if (planItem.__typename === "Ingredient" && planItem.food) {
          return (
            <Ingredient
              id={planItem.id}
              amount={planItem.amount}
              measure={planItem.measure}
              foodDescription={planItem.food?.description}
              portions={planItem.food?.portions}
              refetch={refetch}
              key={planItem.id}
            />
          );
        }
        // eslint-disable-next-line no-underscore-dangle
        if (planItem.__typename === "Meal" && planItem.recipe?.name) {
          return (
            <Meal
              key={planItem.id}
              id={planItem.id}
              recipeName={planItem.recipe.name}
              recipeId={planItem.recipe.id}
              servings={planItem.servings}
              ingredients={planItem.ingredients}
              refetch={refetch}
            />
          );
        }
        return null;
      })}
    </ul>
  );
}
