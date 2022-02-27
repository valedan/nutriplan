import { sortByOrder } from "utils";
import Ingredient from "./Ingredient";
import Meal from "./Meal";
import { useReadContributors } from "./hooks/useReadContributors";

export default function IngredientList() {
  const { contributors } = useReadContributors();

  if (!contributors) {
    return null;
  }

  return (
    <ul className="mt-2 w-full">
      {sortByOrder(contributors).map((contributor) =>
        contributor.__typename === "Ingredient" ? (
          <Ingredient id={contributor.id} key={contributor.id} />
        ) : (
          <Meal key={contributor.id} id={contributor.id} />
        )
      )}
    </ul>
  );
}
