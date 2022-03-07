import { useApolloClient, gql } from "@apollo/client";
import { useRemoveIngredientMutation, useUpdateIngredientMutation } from "generated/graphql/hooks";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

interface Ingredient {
  __typename: "Ingredient";
  id: number;
  amount: number;
  measure: string;
  order: number;
  food: {
    id: number;
    description: string;
    portions: {
      measure: string;
      gramWeight: number;
    }[];
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
}

// TODO: this needs unit tests
export const useLocalIngredient = (id: number) => {
  const client = useApolloClient();
  const ingredient = client.readFragment<Ingredient>(
    {
      id: `Ingredient:${id}`,
      fragment: gql`
        fragment Ingredient on Ingredient {
          id
          amount
          measure
          order
          food {
            id
            description
            portions {
              measure
              gramWeight
            }
            foodNutrients {
              id
              amount
              nutrient {
                id
                name
                unit
              }
            }
          }
        }
      `,
    },
    // use optimistic results
    true
  );

  const [removeIngredient] = useRemoveIngredientMutation({
    update: (cache) => {
      cache.evict({ id: cache.identify({ ...ingredient }) });
      cache.gc();
    },
    variables: {
      id,
    },

    optimisticResponse: {
      __typename: "Mutation",
      removeIngredient: {
        __typename: "Ingredient",
        id,
      },
    },
  });

  const [updateIngredientMutation] = useUpdateIngredientMutation({
    optimisticResponse: (variables) => ({
      updateIngredient: {
        __typename: "Ingredient",
        id,
        amount: variables.input.amount || ingredient?.amount || 0,
        measure: variables.input.measure || ingredient?.measure || "",
      },
    }),
  });

  const updateAmount = (amount: number) => {
    void updateIngredientMutation({
      variables: {
        input: {
          id,
          amount,
        },
      },
    });
  };

  const updateMeasure = (measure: string) => {
    void updateIngredientMutation({
      variables: {
        input: {
          id,
          measure,
        },
      },
    });
  };

  const updateIngredient = ({ amount, measure }: { amount?: number; measure?: string }) => {
    if (amount !== undefined) {
      updateAmount(amount);
    }
    if (measure !== undefined) {
      updateMeasure(measure);
    }
  };

  return { ingredient, removeIngredient, updateIngredient };
};
