import classNames from "classnames";
import { useState } from "react";

interface NutrientAmountProps {
  id: number;
  amount: number;
  unit: string;
  isHover: boolean;
}

const NutrientAmount = ({ id, amount, isHover, unit }: NutrientAmountProps) => {
  const targets = nutrientTargets[id as keyof typeof nutrientTargets];
  const percentageOfTarget = targets.min && (amount / targets.min) * 100;

  if (typeof percentageOfTarget === "number") {
    return isHover ? (
      <span className="w-16 text-sm text-gray-700">
        {Math.round(amount)}/{Math.round(targets.min)} {unit.toLowerCase()}
      </span>
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
  name: string;
  amount: number;
  unit: string;
}

export default function Nutrient({ id, name, amount, unit }: NutrientProps) {
  const targets = nutrientTargets[id as keyof typeof nutrientTargets];
  const percentageOfTarget = targets.min && (amount / targets.min) * 100;
  const isAboveMax = targets.max && amount > targets.max;

  const [isHover, setIsHover] = useState(false);

  const nameWithParens = name.match(/(.+)(\(.+\))/);

  // TODO: hover state
  return (
    <div
      className="flex items-center cursor-pointer py-2 px-4 hover:bg-blue-50 hover:shadow-md"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
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
      <NutrientAmount amount={amount} isHover={isHover} unit={unit} id={id} />
    </div>
  );
}
