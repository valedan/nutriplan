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
import Heading from "components/shared/Text/Heading";

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
      <Card className="py-4 px-8 justify-between mb-4 rounded-none">
        <Card.Content className="justify-between py-2">
          <PlanNameInput planId={Number(planId)} className="w-2/3" />
          <PlanDateInput planId={Number(planId)} />
        </Card.Content>
      </Card>
      <div className="flex px-2">
        <Card className="flex-col w-2/3 mr-4 h-full">
          <Card.Header className="justify-between mt-2">
            <Heading>Foods</Heading>
            <Button>Add Food</Button>
          </Card.Header>
          <Card.Content>
            <ul className="mt-2 w-full">
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
          </Card.Content>
        </Card>

        <Card className="flex-col w-1/3">
          <Card.Header>
            <Heading>Average daily nutrients</Heading>
          </Card.Header>
          <Card.Content>
            <NutrientList planId={Number(planId)} />
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
