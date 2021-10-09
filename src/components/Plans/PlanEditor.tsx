import { useRouter } from "next/router";
import { useAddIngredientMutation, useGetPlanQuery } from "../../generated/graphql";
import { FoodSearch } from "../shared";
import PlanNameInput from "./PlanNameInput";
import Ingredient from "./Ingredient";
import Head from "next/head";

export default function PlanEditor() {
  const router = useRouter();
  const { id: planId } = router.query;
  const { data, loading, error, refetch } = useGetPlanQuery({ variables: { id: parseInt(planId) } });
  const [addIngredient] = useAddIngredientMutation();

  const handleSelectFood = async (food: any) => {
    await addIngredient({
      variables: {
        input: {
          planId: parseInt(planId),
          foodId: food.id,
        },
      },
    });
    void refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="p-8">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>
      <PlanNameInput planId={planId} />
      <hr className="mt-4 mb-4" />
      <h3 className="text-center mb-2">Foods</h3>
      <FoodSearch onSelectFood={handleSelectFood} />
      <ul className="mt-4">
        {data?.plan?.ingredients?.map((ingredient: any) => (
          <Ingredient {...ingredient} refetch={refetch} />
        ))}
      </ul>
    </div>
  );
}
