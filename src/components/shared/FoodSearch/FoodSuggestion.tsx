import React, { forwardRef } from "react";
import { Food } from "../../../generated/graphql";

interface Props extends React.HTMLAttributes<HTMLElement> {
  selected: boolean;
  food: Food;
}

const FoodSuggestion = forwardRef<HTMLDivElement, Props>(({ food, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="py-2 cursor-pointer hover:bg-blue-200 px-4">
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
            {food.nutrients?.length} <span className="text-sm text-gray-500">Nutrients</span>{" "}
          </p>
          <p>
            {food.portions?.length} <span className="text-sm text-gray-500">Portions</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
});

FoodSuggestion.displayName = "FoodSuggestion";

export default FoodSuggestion;
