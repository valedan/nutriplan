import { ClientOnly, RequireAuth } from "providers";
import { RecipeEditor } from "features/Recipes";

export default function EditRecipe() {
  return (
    <RequireAuth>
      <ClientOnly>
        <RecipeEditor />
      </ClientOnly>
    </RequireAuth>
  );
}
