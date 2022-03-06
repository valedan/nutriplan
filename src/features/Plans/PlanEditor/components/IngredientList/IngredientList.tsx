import { sortByOrder } from "utils";
import Ingredient from "./Ingredient";
import Meal from "./Meal";
import { useLocalContributors } from "./hooks/useLocalContributors";

export default function IngredientList() {
  const { contributors } = useLocalContributors();

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
