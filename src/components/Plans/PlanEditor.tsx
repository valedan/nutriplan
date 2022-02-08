import Head from "next/head";
import { useRouter } from "next/router";
import {
  useAddIngredientMutation,
  useGetPlanWithNutrientsQuery,
  useAddMealMutation,
  Ingredient as TIngredient,
  Meal as TMeal,
} from "../../generated/graphql/hooks";
import { FoodSearch, LoadingScreen } from "../shared";
import PlanNameInput from "./PlanNameInput";
import PlanDateInput from "./PlanDateInput";
import Ingredient from "./Ingredient";
import RecipeLibraryDropdown from "./RecipeLibraryDropdown";
import NutrientList from "../NutrientList/NutrientList";
import Meal from "./Meal";

export default function PlanEditor() {
  const router = useRouter();
  const { id: planId } = router.query;
  const { data, loading, error, refetch } = useGetPlanWithNutrientsQuery({
    variables: { planId: Number(planId) },
  });
  const [addIngredient] = useAddIngredientMutation();
  const [addMeal] = useAddMealMutation();

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

  const handleSelectRecipe = async (recipeId: number) => {
    await addMeal({
      variables: {
        input: {
          planId: Number(planId),
          recipeId,
        },
      },
    });

    void refetch();
  };

  if (loading) {
    return <LoadingScreen />;
  }
  if (error || !planId) return <p>Error :(</p>;

  // TODO: look into a better pattern here.
  const ingredients = data?.plan?.ingredients;
  const meals = data?.plan?.meals;
  const planItems: (TIngredient | TMeal)[] = [
    ...(ingredients?.length ? ingredients : []),
    ...(meals?.length ? meals : []),
  ];
  return (
    <div className="  flex flex-col">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>
      <h1 className="text-gray-500 text-lg leading-6 mb-4 ">Edit meal plan</h1>
      <div className="shadow sm:rounded-md bg-white py-4 px-8 flex justify-between mb-4 z-10 mx-1">
        <PlanNameInput planId={Number(planId)} className="w-2/3" />
        <PlanDateInput planId={Number(planId)} />
      </div>
      <div className="flex  p-1 ">
        <div className="flex flex-col  h-full w-2/3 mr-4 shadow sm:rounded-md bg-white " style={{ minHeight: "30rem" }}>
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <div className="flex justify-between mb-2">
              <h3 className=" flex-grow text-center mb-2 text-gray-500 text-lg leading-loose">Foods</h3>
              <RecipeLibraryDropdown onSelect={handleSelectRecipe} />
            </div>
            <FoodSearch onSelectFood={handleSelectFood} />
          </div>
          <div className="px-8">
            <ul className="mt-4">
              {planItems.map((planItem) => {
                // eslint-disable-next-line no-underscore-dangle
                if (planItem.__typename === "Ingredient" && planItem.food) {
                  return (
                    <Ingredient
                      id={planItem.id}
                      amount={planItem.amount}
                      measure={planItem.measure}
                      foodDescription={planItem.food?.description}
                      portions={planItem.food?.portions}
                      refetch={refetch}
                      key={planItem.id}
                    />
                  );
                }
                // eslint-disable-next-line no-underscore-dangle
                if (planItem.__typename === "Meal") {
                  return (
                    <Meal
                      key={planItem.id}
                      id={planItem.id}
                      recipeName={planItem.recipe.name}
                      recipeId={planItem.recipe.id}
                      servings={planItem.servings}
                      ingredients={planItem.ingredients}
                      refetch={refetch}
                    />
                  );
                }
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-1/3 shadow  bg-white  rounded-md">
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <h3 className="text-center text-gray-500 text-lg leading-6 ">Average daily nutrients</h3>
          </div>
          <NutrientList planId={Number(planId)} />
        </div>
      </div>
    </div>
  );
}
