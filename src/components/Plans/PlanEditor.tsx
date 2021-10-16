import Head from "next/head";
import { useRouter } from "next/router";
import { useAddIngredientMutation, useGetPlanQuery } from "../../generated/graphql";
import { FoodSearch } from "../shared";
import PlanNameInput from "./PlanNameInput";
import PlanDateInput from "./PlanDateInput";
import Ingredient from "./Ingredient";

export default function PlanEditor() {
  const router = useRouter();
  const { id: planId } = router.query;
  const { data, loading, error, refetch } = useGetPlanQuery({ variables: { id: Number(planId) } });
  const [addIngredient] = useAddIngredientMutation();

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
    <div className="p-2 h-full flex flex-col">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>
      <h1 className="text-gray-500 text-lg leading-6 mb-4">Edit meal plan</h1>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white py-4 px-8 flex justify-between mb-4">
        <PlanNameInput planId={Number(planId)} className="w-2/3" />
        <PlanDateInput planId={Number(planId)} />
      </div>
      <div className="flex flex-grow items-stretch">
        <div className="flex-1 flex-col w-2/3 mr-4 shadow sm:rounded-md sm:overflow-hidden bg-white h-full">
          <div className="py-4 px-8 shadow bg-grey-50">
            <h3 className="text-center mb-2 text-gray-500 text-lg leading-6 ">Foods</h3>
            <FoodSearch onSelectFood={handleSelectFood} />
          </div>
          <div className="px-8">
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

        <div className="flex flex-col w-1/3 shadow sm:rounded-md sm:overflow-hidden bg-white h-full">
          <div className="py-4 px-8 shadow bg-grey-50">
            <h3 className="text-center text-gray-500 text-lg leading-6 ">Average daily nutrients</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
