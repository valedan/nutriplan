import { useApolloClient, gql } from "@apollo/client";
import { useRemoveIngredientMutation, useUpdateIngredientMutation } from "generated/graphql/hooks";
import { useCallback } from "react";

interface Ingredient {
  __typename: "Ingredient";
  id: number;
  amount: number;
  measure: string;
  food: {
    id: number;
    description: string;
    portions: {
      measure: string;
      gramWeight: number;
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
          food {
            id
            description
            portions {
              measure
              gramWeight
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

  const updateIngredient = useCallback(
    ({ amount, measure }: { amount?: number; measure?: string }) => {
      void updateIngredientMutation({
        variables: {
          input: {
            id,
            amount,
            measure,
          },
        },
      });
    },
    [id, updateIngredientMutation]
  );

  return { ingredient, removeIngredient, updateIngredient };
};
