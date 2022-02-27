import { debounce } from "lodash";
import { useState, useCallback, useMemo } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Input, Select } from "components";
import { useLocalIngredient } from "./hooks/useLocalIngredient";

export interface IngredientProps {
  id: number;
}

export default function Ingredient({ id }: IngredientProps) {
  const { ingredient, removeIngredient, updateIngredient } = useLocalIngredient(id);
  const [localAmount, setLocalAmount] = useState(ingredient?.amount);

  // https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks
  const updateAmount = useMemo(
    () =>
      debounce((amount: number) => {
        void updateIngredient({ amount });
      }, 500),
    [updateIngredient]
  );

  const handleChangeAmount = useCallback(
    (newAmount: number) => {
      // We need to set local here due to the debounce
      setLocalAmount(newAmount);
      updateAmount(newAmount);
    },
    [updateAmount]
  );

  if (!ingredient) {
    return null;
  }

  return (
    <div className="flex flex-col ">
      <div className="flex  items-center flex-grow">
        <div className="flex items-center ml-4 mr-2 px-2 py-2 flex-grow justify-between ">
          <div className="flex flex-col">
            <p className="text-gray-700">{ingredient.food.description}</p>
          </div>
          <div className="flex my-2">
            <Input
              type="number"
              value={localAmount}
              onChange={(e) => handleChangeAmount(Number(e.target.value))}
              name="amount"
              className="w-24"
              sizing="small"
            />

            <Select
              id="portion"
              name="portion"
              onChange={(e) => updateIngredient({ measure: e.target.value })}
              className="w-24 ml-4"
              sizing="small"
              defaultValue={ingredient.measure}
            >
              {ingredient.food.portions.map((portion) => (
                <option key={portion.measure} value={portion.measure}>
                  {portion.measure}
                </option>
              ))}
            </Select>

            <button
              type="button"
              onClick={() => removeIngredient()}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500  hover:bg-red-100 focus:outline-none ml-4"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
