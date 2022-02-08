import classNames from "classnames";
import { useState } from "react";
import useGetNutrientAmountInPlan from "./useGetNutrientAmountInPlan";
import { useGetNutrientQuery } from "../../generated/graphql/hooks";

interface NutrientAmountProps {
  amount: number;
  unit: string;
  isHover: boolean;
  min?: number | null;
}

const NutrientAmount = ({ amount, isHover, unit, min }: NutrientAmountProps) => {
  const percentageOfTarget = min && (amount / min) * 100;

  const amountWithUnits =
    typeof min === "number"
      ? `${Math.round(amount)}/${Math.round(min)} ${unit.toLowerCase()}`
      : `${Math.round(amount)} ${unit.toLowerCase()}`;

  if (typeof percentageOfTarget === "number") {
    return isHover ? (
      <span className="w-16 text-sm text-gray-700">{amountWithUnits}</span>
    ) : (
      <span className="w-16 text-gray-700">{Math.round(percentageOfTarget)}%</span>
    );
  }

  return (
    <div className="w-16 text-gray-600">
      <span>{Math.round(amount)}</span>
      <span className="ml-0.5">{unit.toLowerCase()}</span>
    </div>
  );
};

interface NutrientProps {
  id: number;
  planId: number;
  openNutrientModal: (nutrientId: number) => void;
}

export default function Nutrient({ id, planId, openNutrientModal }: NutrientProps) {
  const [isHover, setIsHover] = useState(false);
  const { data } = useGetNutrientQuery({
    variables: {
      id,
    },
  });

  const { amount } = useGetNutrientAmountInPlan({
    nutrientId: id,
    planId,
  });

  if (!data?.nutrient || !amount) {
    return null;
  }

  const min = data.nutrient.activeTarget?.min;
  const max = data.nutrient.activeTarget?.max;
  const name = data.nutrient.displayName || data.nutrient.name;
  const { unit } = data.nutrient;

  const percentageOfTarget = min && (amount / min) * 100;
  const isAboveMax = max && amount > max;

  const nameWithParens = name.match(/(.+)(\(.+\))/);

  return (
    <button
      className="flex items-center cursor-pointer py-2 px-4 hover:bg-blue-50 hover:shadow-md"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => openNutrientModal(id)}
      type="button"
    >
      <div className="text-right w-32 text-gray-700">
        <span>{nameWithParens ? nameWithParens[1] : name}</span>
        <span className="text-sm">{nameWithParens ? nameWithParens[2] : null}</span>
      </div>
      {typeof percentageOfTarget === "number" ? (
        <div className="flex flex-grow bg-gray-200 h-2 mx-2 rounded">
          <div
            className={classNames("rounded", {
              "bg-green-500": Math.round(percentageOfTarget) >= 100 && !isAboveMax,
              "bg-yellow-300": Math.round(percentageOfTarget) < 100,
              "bg-red-600": isAboveMax,
            })}
            style={{ width: `${Math.round(percentageOfTarget)}%` }}
          />
        </div>
      ) : (
        <p className="flex flex-grow mx-2 italic text-gray-500 text-sm justify-center">No target</p>
      )}
      <NutrientAmount amount={amount} isHover={isHover} unit={unit} min={min} />
    </button>
  );
}
