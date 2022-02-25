import { useApolloClient, gql } from "@apollo/client";
import { useCurrentPlan } from "../../../PlanContext";

export const useReadContributors = () => {
  const { id } = useCurrentPlan();
  const client = useApolloClient();

  interface Contributor {
    __typename: "Ingredient" | "Meal";
    id: number;
    order: number;
  }

  return client.readFragment<{ id: number; ingredients: Contributor[]; meals: Contributor[] }>({
    id: `Plan:${id}`,
    fragment: gql`
      fragment Contributors on Plan {
        id
        ingredients {
          id
          order
        }
        meals {
          id
          order
        }
      }
    `,
  });
};
