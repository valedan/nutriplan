import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "components";
import { useGetRecipeQuery, useUpdateRecipeMutation } from "generated/graphql/hooks";

interface Props {
  recipeId: number;
  className?: string;
}

export default function RecipeServingsInput({ recipeId, className }: Props) {
  const { data, loading, error } = useGetRecipeQuery({ variables: { id: Number(recipeId) } });
  const [servings, setServings] = useState<number>(1);

  useEffect(() => {
    if (data?.recipe?.servings) {
      setServings(data.recipe.servings);
    }
  }, [data]);

  const [updateRecipe] = useUpdateRecipeMutation();

  // TODO: need to refetch or udpate cache after this
  const updateServings = debounce((newServings: number) => {
    void updateRecipe({ variables: { input: { id: Number(recipeId), servings: newServings } } });
  }, 500);

  const handleChangeServings = (newServings: number) => {
    setServings(newServings);
    updateServings(newServings);
  };

  if (loading || error || !data?.recipe) return null;

  return (
    <Input
      value={servings}
      type="number"
      onChange={(e) => handleChangeServings(Number(e.target.value))}
      label="Number of servings"
      id="recipeServings"
      name="recipeServings"
      className={className}
    />
  );
}
