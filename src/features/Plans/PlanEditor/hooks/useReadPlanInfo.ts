import { useApolloClient, gql } from "@apollo/client";
import { useCurrentPlan } from "../PlanContext";

export const useReadPlanInfo = () => {
  const { id } = useCurrentPlan();
  const client = useApolloClient();

  return client.readFragment<{ id: number; startDate: string; endDate: string; name: string }>({
    id: `Plan:${id}`,
    fragment: gql`
      fragment CurrentPlanInfo on Plan {
        id
        name
        startDate
        endDate
      }
    `,
  });
};
