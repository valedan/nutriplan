import Head from "next/head";
import { useRouter } from "next/router";
import {
  useAddIngredientMutation,
  useGetPlanWithNutrientsQuery,
  useAddMealMutation,
  Portion,
} from "../../generated/graphql/hooks";
import { Button, FoodSearch, LoadingScreen } from "../shared";
import PlanNameInput from "./PlanNameInput";
import PlanDateInput from "./PlanDateInput";
import Ingredient from "./Ingredient";
import RecipeLibraryDropdown from "./RecipeLibraryDropdown";
import NutrientList from "../NutrientList/NutrientList";
import Meal from "./Meal";
import NavHeading from "components/shared/Text/NavHeading";
import Card from "components/shared/Card/Card";

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

  interface IngredientItem {
    __typename?: "Ingredient";
    id: number;
    amount: number;
    measure: string;
    order: number;
    food: {
      description: string;
      portions: Portion[];
    };
  }

  interface MealItem {
    __typename?: "Meal";
    id: number;
    servings: number;
    order: number;
    recipe?: {
      name?: string | null;
      id: number;
    } | null;
    ingredients: IngredientItem[];
  }

  // TODO: look into a better pattern here.
  const ingredients = data?.plan?.ingredients;
  const meals = data?.plan?.meals;
  const planItems: (IngredientItem | MealItem)[] = [
    ...(ingredients?.length ? ingredients : []),
    ...(meals?.length ? meals : []),
  ];
  return (
    <div className="  flex flex-col">
      <Head>
        {/* TODO: This is stale after updating */}
        <title key="title">Edit {data?.plan?.name || "plan"}</title>
      </Head>

      <div className="flex my-2 px-4">
        <NavHeading to="/">Edit meal plan</NavHeading>
      </div>
      <Card className="py-4 px-8 flex justify-between mb-4 rounded-none">
        <PlanNameInput planId={Number(planId)} className="w-2/3" />
        <PlanDateInput planId={Number(planId)} />
      </Card>
      <div className="flex">
        <div className="flex flex-col  h-full w-2/3  bg-white mr-2  rounded-sm" style={{ minHeight: "30rem" }}>
          <div className="mx-8 py-4  border-b">
            <div className="flex justify-between px-2">
              <h3 className=" text-gray-500 text-lg self-end">Foods</h3>
              <Button>Add Food</Button>
            </div>
          </div>
          <div className="px-4">
            <ul className="mt-2">
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
                if (planItem.__typename === "Meal" && planItem.recipe?.name) {
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
                return null;
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-1/3   bg-white rounded-sm ">
          <div className="py-2 bg-grey-50 z-10">
            <h3 className="text-center text-gray-500 text-lg leading-6 ">Average daily nutrients</h3>
          </div>
          <NutrientList planId={Number(planId)} />
        </div>
      </div>
    </div>
  );
}
