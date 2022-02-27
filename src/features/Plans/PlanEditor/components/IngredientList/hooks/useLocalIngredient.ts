import { useApolloClient, gql } from "@apollo/client";
import { useRemoveIngredientMutation, useUpdateIngredientMutation } from "generated/graphql/hooks";
import { debounce } from "lodash";
import { useMemo, useState } from "react";

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
  const [localAmount, setLocalAmount] = useState<number>(ingredient?.amount || 0);

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

  // Need the debounce function to not change (otherwise the internal debounce queue will be cleared)
  const debouncedUpdateAmount = useMemo(
    () =>
      debounce((amount: number) => {
        void updateIngredientMutation({
          variables: {
            input: {
              id,
              amount,
            },
          },
        });
        // Not sure we actually need this debounce... and UI is faster without it because nutrients can update immediately
      }, 0),
    [updateIngredientMutation, id]
  );

  const updateAmount = (amount: number) => {
    setLocalAmount(amount);
    debouncedUpdateAmount(amount);
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

  const ingredientWithLocalAmount = ingredient ? { ...ingredient, amount: localAmount } : undefined;

  return { ingredient: ingredientWithLocalAmount, removeIngredient, updateIngredient };
};
