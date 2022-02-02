import ClientOnly from "../../../utils/ClientOnly";
import RequireAuth from "../../../utils/RequireAuth";
import RecipeEditor from "../../../components/Recipes/RecipeEditor";

export default function EditRecipe() {
  return (
    <RequireAuth>
      <ClientOnly>
        <RecipeEditor />
      </ClientOnly>
    </RequireAuth>
  );
}
