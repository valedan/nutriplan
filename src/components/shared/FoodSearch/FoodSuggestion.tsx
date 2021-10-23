import React, { forwardRef } from "react";
import { capitalize } from "lodash";
import { Food } from "../../../generated/graphql";

interface Props extends React.HTMLAttributes<HTMLElement> {
  selected: boolean;
  debug: boolean;
  food: Food;
}

const sentenceCase = (str: string) =>
  str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");

const humanSource = (source: string) => {
  switch (source) {
    case "usda_sr_legacy_food":
      return "USDA-SR";
    case "usda_survey_fndds_food":
      return "USDA-FNDDS";
    case "usda_branded_food":
      return "USDA-Branded";
    case "usda_foundation_food":
      return "USDA-Foundation";
    default:
      return "USDA";
  }
};

const DebugSuggestion = ({ food }: { food: Food }) => {
  return (
    <div className="flex flex-row justify-between text-gray-800">
      <div className="flex-grow">
        <span>
          {food.description &&
            food.description?.charAt(0).toUpperCase().concat(food.description.slice(1).toLowerCase())}
        </span>
        <div className="flex justify-between w-full pr-32 text-sm text-gray-500">
          <span>{food.dataSource}</span>
          <span>Brand: {food.brandName || "--"}</span>
          <span>Category: {food.category || "--"}</span>
          <span>Score: {food.searchScore || "--"}</span>
        </div>
      </div>
      <div className="flex-col">
        <p>
          <span className="text-sm text-gray-500">Nutrients: {food.nutrientCount}</span>
        </p>
      </div>
    </div>
  );
};

const FoodSuggestion = forwardRef<HTMLDivElement, Props>(({ food, debug, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="py-4 cursor-pointer hover:bg-blue-200 px-4">
      {debug ? (
        <DebugSuggestion food={food} />
      ) : (
        <div className="flex flex-row justify-between text-gray-800">
          <div className="flex-grow">
            <span>
              {food.description &&
                food.description?.charAt(0).toUpperCase().concat(food.description.slice(1).toLowerCase())}
            </span>
            {food.brandName && <span className="text-gray-400 text-sm ml-2">{sentenceCase(food.brandName)}</span>}
            <div className="flex justify-between w-full pr-32 text-sm text-gray-500">
              <span className="text-gray-400 text-sm">{food.category || "No category"}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center w-40">
            <p className="text-sm text-gray-500 text-right">Nutrients: {food.nutrientCount}</p>
            <p className="text-sm text-gray-500 text-right">Source: {humanSource(food.dataSource)}</p>
          </div>
        </div>
      )}
    </div>
  );
});

FoodSuggestion.displayName = "FoodSuggestion";

export default FoodSuggestion;
