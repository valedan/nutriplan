import { useState } from "react";
import FoodSearch from "../components/FoodSearch";
import Food, { FoodProps } from "../components/Food";
import RequireAuth from "../components/RequireAuth";

const SearchTest = () => {
  const [foods, setFoods] = useState<FoodProps[] | null>(null);
  const onSelectFood = (food: FoodProps) => {
    setFoods(foods ? [...foods, food] : [food]);
  };

  return (
    <RequireAuth>
      <div>
        <FoodSearch onSelectFood={onSelectFood} />
        <div className="divide-y divide-gray-200 px-16 mt-8">
          {foods && foods.map((food) => <Food key={food.id} {...food} />)}
        </div>
      </div>
    </RequireAuth>
  );
};

export default SearchTest;
