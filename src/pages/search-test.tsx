import { useState } from "react";
import FoodSearch from "../components/FoodSearch";
import Food, { FoodProps } from "../components/Food";

const SearchTest = () => {
  const [foods, setFoods] = useState<FoodProps[] | null>(null);
  const onSelectFood = (food: FoodProps) => {
    console.log("selected");
    console.log(food);
    setFoods(foods ? [...foods, food] : [food]);
  };
  console.log(foods);
  return (
    <div>
      <FoodSearch onSelectFood={onSelectFood} />
      <div className="divide-y divide-gray-200 px-16 mt-8">
        {foods && foods.map((food) => <Food key={food.id} {...food} />)}
      </div>
    </div>
  );
};

export default SearchTest;
