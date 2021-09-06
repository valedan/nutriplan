import React from "react";

export interface FoodNutrient {
  id: number;
  nutrient: {
    name: string;
  };
}

export interface Portion {
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
  portions?: Portion[];
  food_nutrients?: FoodNutrient[];
  serving_size?: number;
  searchScore?: number;
}

const titleCase = (str: string) => {
  const newString = str.toLowerCase();
  newString.charAt(0).toUpperCase();
  return newString;
};

const Food = ({ description, data_source, brand, category, searchScore, portions }: FoodProps) => {
  return (
    <div className="py-2 px-8">
      <div className="flex flex-row justify-between text-gray-800">
        <div className="flex-grow">
          <span>{description ? titleCase(description) : ""}</span>
          <div className="flex justify-between w-full pr-32 text-sm text-gray-500">
            <span>{data_source}</span>
            <span>Brand: {brand || "--"}</span>
            <span>Category: {category || "--"}</span>
            <span>Score: {searchScore || "--"}</span>
          </div>
        </div>
        <div className="flex-col">
          <p>
            {portions?.length} <span className="text-sm text-gray-500">Portions</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Food;
