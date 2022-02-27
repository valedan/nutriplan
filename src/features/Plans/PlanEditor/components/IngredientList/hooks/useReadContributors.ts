import { useApolloClient, gql } from "@apollo/client";
import { useCurrentPlan } from "../../../PlanContext";

interface Contributor {
  __typename: "Ingredient" | "Meal";
  id: number;
  order: number;
}

export const useReadContributors = () => {
  const { id } = useCurrentPlan();
  const client = useApolloClient();

  const plan = client.readFragment<{ id: number; ingredients: Contributor[]; meals: Contributor[] }>({
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

  if (!plan) {
    return {};
  }

  const contributors = [...plan.meals, ...plan.ingredients];

  return { contributors };
};
