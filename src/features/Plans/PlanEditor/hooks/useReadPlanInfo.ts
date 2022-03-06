import { useApolloClient, gql } from "@apollo/client";
import { differenceInDays } from "date-fns";
import { useCurrentPlan } from "../PlanContext";

export const useReadPlanInfo = () => {
  const { id } = useCurrentPlan();
  const client = useApolloClient();

  const plan = client.readFragment<{ id: number; startDate: string; endDate: string; name: string }>({
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

  if (!plan) {
    return {};
  }

  const daysInPlan = differenceInDays(new Date(plan.endDate), new Date(plan.startDate));

  return {
    plan: { ...plan, daysInPlan },
  };
};
