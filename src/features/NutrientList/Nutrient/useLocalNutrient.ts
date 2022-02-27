import { gql, useApolloClient } from "@apollo/client";
import { useCurrentPlan } from "features/Plans/PlanEditor/PlanContext";
import { Nutrient, GetPlanWithNutrientsDocument, GetPlanWithNutrientsQuery } from "generated/graphql/hooks";
import { readDailyNutrientAmount } from "../../Plans/shared/utils";

const useLocalNutrient = (id: number) => {
  const client = useApolloClient();
  const { id: planId } = useCurrentPlan();

  const nutrient = client.readFragment<Nutrient>(
    {
      id: `Nutrient:${id}`,
      fragment: gql`
        fragment Nutrient on Nutrient {
          id
          name
          unit
          order
          displayName
          activeTarget {
            id
            min
            max
          }
        }
      `,
    },
    // use optimistic results
    true
  );

  // TODO: This will use a TON of memory because we're grabbing the entire plan, including ALL foodNutrients, for every individual nutrient.
  // Benchmark this with a larger plan.
  const planData = client.readQuery<GetPlanWithNutrientsQuery>({
    query: GetPlanWithNutrientsDocument,
    variables: {
      planId,
    },
  });

  if (!nutrient || !planData?.plan) {
    return {};
  }

  const { plan } = planData;

  const amount = readDailyNutrientAmount(plan, nutrient.id);

  return {
    nutrient,
    amount,
  };
};

export default useLocalNutrient;
