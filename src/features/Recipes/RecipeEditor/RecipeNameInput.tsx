import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Input } from "components";
import { useGetRecipeQuery, useUpdateRecipeMutation } from "generated/graphql/hooks";

interface Props {
  recipeId: number;
  className: string;
}

export default function RecipeNameInput({ recipeId, className }: Props) {
  const { data, loading, error } = useGetRecipeQuery({ variables: { id: Number(recipeId) } });
  const [name, setName] = useState("");

  useEffect(() => {
    if (data?.recipe?.name) {
      setName(data.recipe.name);
    }
  }, [data]);

  const [updateRecipe] = useUpdateRecipeMutation();

  const updateName = debounce((newName: string) => {
    void updateRecipe({ variables: { input: { id: Number(recipeId), name: newName } } });
  }, 500);

  const handleChangeName = (newName: string) => {
    setName(newName);
    updateName(newName);
  };

  if (loading || error || !data?.recipe) return null;

  return (
    <Input
      value={name}
      onChange={(e) => handleChangeName(e.target.value)}
      label="Recipe name"
      id="recipeName"
      name="recipeName"
      className={className}
    />
  );
}
