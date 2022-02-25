import { useApolloClient, gql } from "@apollo/client";

export const useReadIngredient = (id: number) => {
  const client = useApolloClient();

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

  return client.readFragment<Ingredient>({
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
  });
};
