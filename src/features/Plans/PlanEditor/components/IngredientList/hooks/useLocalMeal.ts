import { useApolloClient, gql } from "@apollo/client";
import { useRemoveMealMutation, useUpdateMealMutation } from "generated/graphql/hooks";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

interface Meal {
  __typename: "Meal";
  id: number;
  servings: number;
  recipe: {
    id: number;
    name: string;
  };
  ingredients: {
    id: number;
    order: number;
  }[];
}

export const useLocalMeal = (id: number) => {
  const client = useApolloClient();
  const meal = client.readFragment<Meal>(
    {
      id: `Meal:${id}`,
      fragment: gql`
        fragment Meal on Meal {
          id
          servings
          recipe {
            id
            name
          }
          ingredients {
            id
            order
          }
        }
      `,
    },
    true
  );
  const [localServings, setLocalServings] = useState<number>(meal?.servings || 0);
  const [removeMeal] = useRemoveMealMutation({
    update: (cache) => {
      cache.evict({ id: cache.identify({ ...meal }) });
      cache.gc();
    },
    variables: {
      id,
    },

    optimisticResponse: {
      __typename: "Mutation",
      removeMeal: {
        __typename: "Meal",
        id,
      },
    },
  });

  const [updateMealMutation] = useUpdateMealMutation({
    // TODO: need to scale ingredient amounts too
    optimisticResponse: (variables) => ({
      updateMeal: {
        __typename: "Meal",
        id,
        servings: variables.input.servings || meal?.servings || 0,
      },
    }),
  });

  // Need the debounce function to not change (otherwise the internal debounce queue will be cleared)
  const debouncedUpdateServings = useMemo(
    () =>
      debounce((servings: number) => {
        void updateMealMutation({
          variables: {
            input: {
              id,
              servings,
            },
          },
        });
        // Not sure we actually need this debounce... and UI is faster without it because nutrients can update immediately
      }, 0),
    [updateMealMutation, id]
  );

  const updateServings = (servings: number) => {
    setLocalServings(servings);
    debouncedUpdateServings(servings);
  };

  const updateMeal = ({ servings }: { servings?: number }) => {
    if (servings !== undefined) {
      updateServings(servings);
    }
  };

  const mealWithLocalServings = meal ? { ...meal, servings: localServings } : undefined;

  return { meal: mealWithLocalServings, removeMeal, updateMeal };
};
