import Head from "next/head";
import { useRouter } from "next/router";
import { compact } from "lodash";
import { useAddIngredientMutation, useGetPlanQuery } from "../../generated/graphql";
import { FoodSearch } from "../shared";
import PlanNameInput from "./PlanNameInput";
import PlanDateInput from "./PlanDateInput";
import Ingredient from "./Ingredient";
import NutrientList from "./NutrientList";
import { differenceInCalendarDays } from "date-fns";

interface IngredientWithPortion {
  food?: { id: number; portions: { measure: string; gramWeight: number }[] } | null;
  amount: number;
  measure: string;
}
const gramWeightOfIngredient = (ingredient: IngredientWithPortion) => {
  if (!ingredient?.food?.portions || !ingredient?.amount) {
    return null;
  }
  const matchingPortion = ingredient.food.portions.find((p) => p.measure === ingredient.measure);

  if (!matchingPortion) {
    return null;
  }

  return ingredient.amount * matchingPortion.gramWeight;
};

const foodAmountsFromIngredients = (ingredients: IngredientWithPortion[]) =>
  ingredients.map((ingredient) => {
    const amount = gramWeightOfIngredient(ingredient);
    if (!amount || !ingredient.food?.id) {
      return null;
    }
    return { foodId: ingredient.food.id, amount };
  });

export default function PlanEditor() {
  const router = useRouter();
  const { id: planId } = router.query;
  const { data, loading, error, refetch } = useGetPlanQuery({ variables: { id: Number(planId) } });
  const [addIngredient] = useAddIngredientMutation();

  console.log(data);
  const handleSelectFood = async (foodId: number) => {
    await addIngredient({
      variables: {
        input: {
          planId: Number(planId),
          foodId,
        },
      },
    });

    // TODO: do something more efficient here
    void refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error || !planId) return <p>Error :(</p>;

  return (
    <div className="p-2 h-full flex flex-col overflow-hidden relative">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>
      <h1 className="text-gray-500 text-lg leading-6 mb-4">Edit meal plan</h1>
      <div className="shadow sm:rounded-md bg-white py-4 px-8 flex justify-between mb-4 z-10">
        <PlanNameInput planId={Number(planId)} className="w-2/3" />
        <PlanDateInput planId={Number(planId)} />
      </div>
      <div className="flex relative overflow-hidden">
        <div className="flex flex-col w-2/3 mr-4 shadow overflow-hidden sm:rounded-md bg-white h-full">
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <h3 className="text-center mb-2 text-gray-500 text-lg leading-6 ">Foods</h3>
            <FoodSearch onSelectFood={handleSelectFood} />
          </div>
          <div className="px-8 overflow-y-auto">
            <ul className="mt-4">
              {data?.plan?.ingredients?.map(
                (ingredient) =>
                  ingredient.food && (
                    <Ingredient
                      id={ingredient.id}
                      amount={ingredient.amount}
                      measure={ingredient.measure}
                      foodDescription={ingredient.food?.description}
                      portions={ingredient.food?.portions}
                      refetch={refetch}
                      key={ingredient.id}
                    />
                  )
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-1/3 shadow  bg-white h-full relative rounded-md">
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <h3 className="text-center text-gray-500 text-lg leading-6 ">Average daily nutrients</h3>
          </div>
          {data?.plan?.ingredients && (
            <NutrientList
              daysInPlan={differenceInCalendarDays(data.plan.endDate, data.plan.startDate)}
              foodAmounts={compact(foodAmountsFromIngredients(data?.plan?.ingredients))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
