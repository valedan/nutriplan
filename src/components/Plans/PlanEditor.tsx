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
    <div className="p-4 ">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>
      <div className="shadow sm:rounded-md sm:overflow-hidden bg-white py-4 px-8 flex justify-between ">
        <PlanNameInput planId={Number(planId)} className="w-2/3" />
        <PlanDateInput planId={Number(planId)} />
      </div>
      <hr className="mt-4 mb-4" />
      <h3 className="text-center mb-2">Foods</h3>
      <FoodSearch onSelectFood={handleSelectFood} />
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
  );
}
