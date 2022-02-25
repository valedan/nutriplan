import { sortByOrder } from "../../../shared/utils";
import Ingredient from "./Ingredient";
import Meal from "./Meal";
import { useReadContributors } from "./hooks/useReadContributors";

export default function IngredientList() {
  const plan = useReadContributors();

  if (!plan) {
    return null;
  }

  const contributors = [...plan.meals, ...plan.ingredients];

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
