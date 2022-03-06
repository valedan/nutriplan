import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { ContentModal, Button } from "components";
import { useLocalPlan } from "features/Plans/PlanEditor/hooks/useLocalPlan";
import Ingredient from "./Ingredient";
import Meal from "./Meal";
import useLocalNutrient from "../Nutrient/useLocalNutrient";
import { useLocalContributors } from "../../Plans/PlanEditor/components/IngredientList/hooks/useLocalContributors";

interface Props {
  nutrientId: number;
  onClose: () => void;
}

export default function NutrientModal({ nutrientId, onClose }: Props) {
  const { nutrient } = useLocalNutrient(nutrientId);
  const { contributors, totalNutrientAmount } = useLocalContributors({ nutrientId });
  const { plan } = useLocalPlan();

  if (!nutrient || !totalNutrientAmount || !plan) {
    return null;
  }

  const dailyAmount = totalNutrientAmount / plan.daysInPlan;

  const min = nutrient.activeTarget?.min;
  const max = nutrient.activeTarget?.max;
  const name = nutrient.displayName || nutrient.name;
  const { unit } = nutrient;

  const calculateTargetStatus = () => {
    const isAboveMax = max && dailyAmount > max;
    const isBelowMin = min && dailyAmount < min;

    // I shouldn't need to have the && max here - tsc correctly recognizes that it's always defined. But for some reason next build struggles. Is it using an old typescript version? Not sure.
    if (isAboveMax && max) {
      const percentageAboveMax = ((dailyAmount - max) / max) * 100;
      return `${Math.round(percentageAboveMax)}% above target`;
    }

    if (isBelowMin && min) {
      const percentageBelowMin = ((min - dailyAmount) / min) * 100;
      return `${Math.round(percentageBelowMin)}% below target`;
    }

    if (min || max) {
      return `On target`;
    }

    return null;
  };

  return (
    <ContentModal
      open
      onClose={onClose}
      title={
        <p>
          {name} - <span className="font-medium">{calculateTargetStatus()}</span>
        </p>
      }
    >
      <div className="flex justify-between mb-10">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-400">Amount in current plan</span>
          <p className=" text-gray-900">
            {Math.round(dailyAmount)} {unit}
          </p>
        </div>
        <div>
          <div className="flex items-end">
            <div>
              <span className="text-sm font-medium text-gray-400">Target</span>
              <p className=" text-gray-900">
                {min} - {max} {unit}
              </p>
            </div>
            <Button variant="ghost" onClick={onClose} size="small" className="ml-4">
              Change target
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Tab.Group>
          <Tab.List className="border-b border-gray-200 mb-4">
            <Tab>
              {({ selected }) => (
                <button
                  type="button"
                  className={classNames(
                    selected
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                  )}
                >
                  Top Contributors
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  type="button"
                  className={classNames(
                    selected
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                  )}
                >
                  Best Sources
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="px-4">
                {contributors
                  .sort((a, b) => (b.nutrientAmount ?? 0) - (a.nutrientAmount ?? 0))
                  .map((contributor) =>
                    contributor.__typename === "Meal" ? (
                      <Meal id={contributor.id} key={contributor.id} nutrientId={nutrientId} />
                    ) : (
                      <Ingredient id={contributor.id} key={contributor.id} nutrientId={nutrientId} />
                    )
                  )}
              </div>
            </Tab.Panel>
            <Tab.Panel>Coming soon</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </ContentModal>
  );
}
