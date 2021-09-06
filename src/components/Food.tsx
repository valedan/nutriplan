import React from "react";

interface FoodNutrient {
  id: number;
  nutrient: {
    name: string;
  };
}

interface Portion {
  id: number;
  gram_weight: number;
  measure: string;
  sequence_number: number;
}

export interface FoodProps {
  brand?: string;
  category?: string;
  data_source?: string;
  description?: string;
  id: number;
  portions: Portion[];
  serving_size?: number;
  searchScore?: number;
}

const Food = (props: FoodProps) => {
  return (
    <div className="py-2 px-8">
      <div className="flex flex-row justify-between text-gray-800">
        <div className="flex-grow">
          <span>{props.description?.charAt(0).toUpperCase().join(props.description.slice(1).toLowerCase())}</span>
          <div className="flex justify-between w-full pr-32 text-sm text-gray-500">
            <span>{props.data_source}</span>
            <span>Brand: {props.brand || "--"}</span>
            <span>Category: {props.category || "--"}</span>
            <span>Score: {props.searchScore || "--"}</span>
          </div>
        </div>
        <div className="flex-col">
          <p>
            {props.food_nutrients.length} <span className="text-sm text-gray-500">Nutrients</span>{" "}
          </p>
          <p>
            {props.portions.length} <span className="text-sm text-gray-500">Portions</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Food;
