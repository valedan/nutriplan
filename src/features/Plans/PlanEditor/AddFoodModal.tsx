import { FoodSearch, ContentModal, Heading } from "components";
import { useAddIngredientMutation, useAddMealMutation } from "generated/graphql/hooks";
import { useCurrentPlan } from "./PlanContext";
import RecipeLibraryDropdown from "./RecipeLibraryDropdown";

interface Props {
  onClose: () => void;
}

export default function AddFoodModal({ onClose }: Props) {
  const { id, refetch } = useCurrentPlan();
  const [addIngredient] = useAddIngredientMutation();
  const [addMeal] = useAddMealMutation();

  const handleSelectFood = async (foodId: number) => {
    await addIngredient({
      variables: {
        input: {
          planId: id,
          foodId,
        },
      },
    });

    // TODO: do something more efficient here
    void refetch();
    onClose();
  };

  const handleSelectRecipe = async (recipeId: number) => {
    await addMeal({
      variables: {
        input: {
          planId: id,
          recipeId,
        },
      },
    });

    void refetch();
    onClose();
  };
  return (
    <ContentModal open onClose={onClose} title="Add Food">
      <Heading>Add Food</Heading>
      <RecipeLibraryDropdown onSelect={handleSelectRecipe} />
      <FoodSearch onSelectFood={handleSelectFood} />
    </ContentModal>
  );
}
