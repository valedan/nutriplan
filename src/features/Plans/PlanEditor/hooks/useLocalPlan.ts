import { useApolloClient, gql } from "@apollo/client";
import { differenceInDays } from "date-fns";
import { debounce } from "lodash";
import { useUpdatePlanMutation } from "generated/graphql/hooks";
import { useMemo, useState } from "react";
import { useCurrentPlan } from "../PlanContext";

export const useLocalPlan = () => {
  const { id } = useCurrentPlan();
  const client = useApolloClient();

  const plan = client.readFragment<{ id: number; startDate: Date; endDate: Date; name: string }>(
    {
      id: `Plan:${id}`,
      fragment: gql`
        fragment CurrentPlanInfo on Plan {
          id
          name
          startDate
          endDate
        }
      `,
    },
    true
  );
  const [localName, setLocalName] = useState(plan?.name || "");

  const [updatePlanMutation] = useUpdatePlanMutation({
    optimisticResponse: (variables) => ({
      updatePlan: {
        __typename: "Plan",
        id,
        name: variables.input.name || plan?.name || "",
        startDate: variables.input.startDate || plan?.startDate || new Date(),
        endDate: variables.input.endDate || plan?.endDate || new Date(),
      },
    }),
  });

  // Need the debounce function to not change (otherwise the internal debounce queue will be cleared)
  const debouncedUpdateName = useMemo(
    () =>
      debounce((name: string) => {
        void updatePlanMutation({
          variables: {
            input: {
              id,
              name,
            },
          },
        });
      }, 500),
    [updatePlanMutation, id]
  );

  const debouncedUpdateDates = useMemo(
    () =>
      debounce((startDate: Date, endDate: Date) => {
        void updatePlanMutation({
          variables: {
            input: {
              id,
              startDate,
              endDate,
            },
          },
        });
      }, 0),
    [updatePlanMutation, id]
  );

  const updateName = (name: string) => {
    setLocalName(name);
    debouncedUpdateName(name);
  };

  const updateDates = (startDate: Date, endDate: Date) => {
    debouncedUpdateDates(startDate, endDate);
  };

  const updatePlan = ({ name, startDate, endDate }: { name?: string; startDate?: Date; endDate?: Date }) => {
    if (name !== undefined) {
      updateName(name);
    }
    if (startDate !== undefined && endDate !== undefined) {
      updateDates(startDate, endDate);
    }
  };

  if (!plan) {
    return {};
  }

  const daysInPlan = differenceInDays(new Date(plan.endDate), new Date(plan.startDate));

  return {
    plan: { ...plan, name: localName, daysInPlan },
    updatePlan,
  };
};
