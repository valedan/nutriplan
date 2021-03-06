import React from "react";
import { Dropdown, DropdownItem } from "components";
import { useGetRecipesQuery } from "generated/graphql/hooks";

interface Props {
  onSelect: (recipeId: number) => void;
}

export default function RecipeLibraryDropdown({ onSelect }: Props) {
  const { loading, error, data } = useGetRecipesQuery();

  if (loading || !data) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (data?.recipes.length === 0) return <div>No recipes found</div>;

  return (
    <Dropdown title="Recipes">
      {data.recipes.map((recipe) => (
        // TODO: Enforce on backend that recipes have a name (plans too!)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <DropdownItem key={recipe.id} onClick={() => onSelect(recipe.id)} title={recipe.name!} />
      ))}
    </Dropdown>
  );
}
