import * as Apollo from "@apollo/client";
import { useGetPlanWithNutrientsQuery } from "../../generated/graphql/hooks";
import { readDailyNutrientAmount } from "../Plans/shared/utils";

interface Props {
  nutrientId: number;
  planId: number;
  options?: {
    fetchPolicy?: Apollo.FetchPolicy;
  };
}

const useGetNutrientAmountInPlan = ({ nutrientId, planId, options }: Props) => {
  // Specifiying a nutrient id here would break caching, would have to figure out a complicated field policy to fix it.
  const { data, loading, error } = useGetPlanWithNutrientsQuery({
    variables: { planId },
    ...options,
  });

  let amount: number | null = null;

  if (data?.plan) {
    amount = readDailyNutrientAmount(data?.plan, nutrientId);
  }

  return {
    amount,
    loading,
    error,
  };
};

export default useGetNutrientAmountInPlan;
