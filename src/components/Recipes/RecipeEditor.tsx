import Head from "next/head";
import { useRouter } from "next/router";
import { compact } from "lodash";
import { useAddIngredientMutation, useGetRecipeQuery } from "../../generated/graphql";
import { FoodSearch, LoadingScreen } from "../shared";
import RecipeNameInput from "./RecipeNameInput";
import RecipeServingsInput from "./RecipeServingsInput";
import Ingredient from "../Plans/Ingredient";
import NutrientList from "../Plans/NutrientList";

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

export default function RecipeEditor() {
  const router = useRouter();
  const { id: recipeId } = router.query;
  const { data, loading, error, refetch } = useGetRecipeQuery({ variables: { id: Number(recipeId) } });
  const [addIngredient] = useAddIngredientMutation();

  const handleSelectFood = async (foodId: number) => {
    await addIngredient({
      variables: {
        input: {
          recipeId: Number(recipeId),
          foodId,
        },
      },
    });

    // TODO: do something more efficient here
    void refetch();
  };

  if (loading) {
    return <LoadingScreen />;
  }
  if (error || !recipeId) return <p>Error :(</p>;
  return (
    <div className="  flex flex-col">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.recipe?.name || "recipe"}</title>
      </Head>
      <h1 className="text-gray-500 text-lg leading-6 mb-4 ">Edit recipe</h1>
      <div className="shadow sm:rounded-md bg-white py-4 px-8 flex justify-between mb-4 z-10 mx-1">
        <RecipeNameInput recipeId={Number(recipeId)} className="w-2/3" />
        <RecipeServingsInput recipeId={Number(recipeId)} />
      </div>
      <div className="flex  p-1 ">
        <div className="flex flex-col  h-full w-2/3 mr-4 shadow sm:rounded-md bg-white " style={{ minHeight: "30rem" }}>
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <h3 className="text-center mb-2 text-gray-500 text-lg leading-6 ">Foods</h3>
            <FoodSearch onSelectFood={handleSelectFood} />
          </div>
          <div className="px-8">
            <ul className="mt-4">
              {data?.recipe?.ingredients?.map(
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

        <div className="flex flex-col w-1/3 shadow  bg-white  rounded-md">
          <div className="py-4 px-8 shadow bg-grey-50 z-10">
            <h3 className="text-center text-gray-500 text-lg leading-6 ">Average daily nutrients</h3>
          </div>
          {data?.recipe?.ingredients && (
            <NutrientList
              daysInPlan={data?.recipe?.servings || 1} // TODO - decouple this from Plan
              foodAmounts={compact(foodAmountsFromIngredients(data?.recipe?.ingredients))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
