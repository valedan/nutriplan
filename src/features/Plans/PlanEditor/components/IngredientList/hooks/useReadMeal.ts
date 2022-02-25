import { useApolloClient, gql } from "@apollo/client";

export const useReadMeal = (id: number) => {
  const client = useApolloClient();

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

  return client.readFragment<Meal>({
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
  });
};
