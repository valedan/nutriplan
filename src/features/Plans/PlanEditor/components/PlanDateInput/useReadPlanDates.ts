import { useApolloClient, gql } from "@apollo/client";

export const useReadPlanDates = (id: number) => {
  const client = useApolloClient();

  return client.readFragment<{ startDate: string; endDate: string }>({
    id: `Plan:${id}`,
    fragment: gql`
      fragment CurrentPlanDates on Plan {
        startDate
        endDate
      }
    `,
  });
};
