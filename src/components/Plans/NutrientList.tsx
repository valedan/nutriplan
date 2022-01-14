import { useGetNutrientGroupsQuery, useGetFoodsWithNutrientsQuery } from "../../generated/graphql";
import NutrientGroup from "./NutrientGroup";

interface FoodAmount {
  foodId: number;
  amount: number;
}

interface FoodWithNutrients {
  id: number;
  nutrients: {
    id: number;
    amount: number;
  }[];
}

// nutrientId => amount
const aggregateNutrientAmounts = (
  foods: FoodWithNutrients[],
  foodAmountsPer100Grams: FoodAmount[],
  daysInPlan: number
) => {
  const normalizedFoodAmountsPer100Grams: { [key: number]: number } = {};

  foodAmountsPer100Grams.forEach((foodAmount) => {
    normalizedFoodAmountsPer100Grams[foodAmount.foodId] = foodAmount.amount;
  });

  const nutrientAmounts: { [key: number]: number } = {};
  foods.forEach(({ id, nutrients }) => {
    const foodAmountPer100Grams = normalizedFoodAmountsPer100Grams[id];
    nutrients.forEach((nutrient) => {
      if (nutrientAmounts[nutrient.id]) {
        nutrientAmounts[nutrient.id] += (nutrient.amount * foodAmountPer100Grams) / (100 * daysInPlan);
      } else {
        nutrientAmounts[nutrient.id] = (nutrient.amount * foodAmountPer100Grams) / (100 * daysInPlan);
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
        .sort((group) => group.order)
        .map(({ id, name, nutrients: nutrientsInGroup }) => (
          <NutrientGroup name={name} nutrients={nutrientsInGroup} nutrientAmounts={nutrientAmountsPerDay} key={id} />
        ))}
    </div>
  );
}
