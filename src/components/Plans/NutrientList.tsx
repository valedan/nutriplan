import { useGetNutrientGroupsQuery, useGetFoodsWithNutrientsQuery } from "../../generated/graphql";
import NutrientGroup from "./NutrientGroup";

interface FoodAmount {
  foodId: number;
  amount: number;
}

interface FoodWithNutrients {
  id: number;
  foodNutrients: {
    amount: number;
    nutrient: {
      id: number;
    };
  }[];
}

// nutrientId => amount
const aggregateNutrientAmounts = (
  foodsWithNutrientData: FoodWithNutrients[],
  foodAmounts: FoodAmount[],
  daysInPlan: number
) => {
  const normalizedFoodAmounts: { [key: number]: number } = {};

  foodAmounts.forEach((foodAmount) => {
    normalizedFoodAmounts[foodAmount.foodId] = foodAmount.amount;
  });

  const nutrientAmounts: { [key: number]: number } = {};

  foodsWithNutrientData.forEach(({ id, foodNutrients }) => {
    const foodAmount = normalizedFoodAmounts[id];
    // Nutrient amount is per 100 grams
    // Food amount is expressed in grams
    foodNutrients.forEach(({ amount, nutrient: { id: nutrientId } }) => {
      if (nutrientAmounts[nutrientId]) {
        nutrientAmounts[nutrientId] += (amount * foodAmount) / (100 * daysInPlan);
      } else {
        nutrientAmounts[nutrientId] = (amount * foodAmount) / (100 * daysInPlan);
      }
    });
  });
  return nutrientAmounts;
};

interface Props {
  foodAmounts: FoodAmount[];
  daysInPlan: number;
}

export default function NutrientList({ foodAmounts, daysInPlan }: Props) {
  const foodIds = foodAmounts.map((fa) => fa.foodId);

  const { data, loading, error } = useGetNutrientGroupsQuery();
  const {
    data: foodData,
    loading: foodLoading,
    error: foodError,
  } = useGetFoodsWithNutrientsQuery({
    variables: {
      foodIds,
    },
  });

  if (!data || loading || error || !foodData || foodLoading || foodError) {
    return null;
  }

  const nutrientAmountsPerDay = aggregateNutrientAmounts(foodData.foods, foodAmounts, daysInPlan);

  return (
    <div className="min-h-0 flex flex-col overflow-y-auto overflow-x-hidden">
      {data.nutrientGroups
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(({ id, name, nutrients: nutrientsInGroup }) => (
          <NutrientGroup name={name} nutrients={nutrientsInGroup} nutrientAmounts={nutrientAmountsPerDay} key={id} />
        ))}
    </div>
  );
}
