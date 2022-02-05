import ContentModal from "../../shared/Modal/ContentModal";
import { useGetNutrientQuery, useGetPlanWithNutrientsQuery } from "../../../generated/graphql";
import {
  numberOfDaysInRange,
  readTotalNutrientAmount,
  readNutrientAmountFromIngredient,
  readNutrientAmountFromMeal,
} from "../shared/utils";

interface Props {
  nutrientId: number;
  onClose: () => void;
  planId: number;
}

// TODO: somehow this is triggering 4 queries! Should only be 1 at max because Nutrient is cached already

export default function NutrientModal({ planId, nutrientId, onClose }: Props) {
  const { data, loading, error } = useGetPlanWithNutrientsQuery({
    variables: { planId, nutrientIds: [nutrientId] },
  });

  const {
    data: nutrientData,
    loading: nutrientLoading,
    error: nutrientError,
  } = useGetNutrientQuery({ variables: { id: nutrientId } });

  if (!data?.plan || !nutrientData?.nutrient) {
    return null;
  }

  const totalNutrientAmount = readTotalNutrientAmount(data.plan, nutrientId);

  return (
    <ContentModal open onClose={onClose} title="test">
      {nutrientData.nutrient.name} - {totalNutrientAmount} {nutrientData.nutrient.unit}
      <br />
      {data.plan.ingredients.map((ingredient) => {
        return (
          <p key={ingredient.id}>
            {ingredient.food.description} - {ingredient.amount} {ingredient.measure} -
            {readNutrientAmountFromIngredient(ingredient, nutrientId)} {nutrientData.nutrient?.unit ?? ""}
          </p>
        );
      })}
      {data.plan.meals.map((meal) => {
        return (
          // TODO: Meal should always have a recipe with a name here.
          <p key={meal.id}>
            {meal.recipe?.name ?? ""} - {meal.servings} servings - {readNutrientAmountFromMeal(meal, nutrientId)}{" "}
            {nutrientData.nutrient?.unit ?? ""}
          </p>
        );
      })}
    </ContentModal>
  );
}
