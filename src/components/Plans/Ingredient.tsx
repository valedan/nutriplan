import { debounce } from "lodash";
import { useState } from "react";
import { Portion, useRemoveIngredientMutation, useUpdateIngredientMutation } from "../../generated/graphql";
import { Input } from "../shared";

interface Props {
  id: number;
  amount: number;
  measure: string;
  foodDescription: string;
  portions: Portion[];
  refetch: () => void;
}

export default function Ingredient({ id, amount, measure, foodDescription, portions, refetch }: Props) {
  const [localAmount, setLocalAmount] = useState(amount);
  const [localMeasure, setLocalMeasure] = useState(measure);
  const [updateIngredient] = useUpdateIngredientMutation();
  const [removeIngredient] = useRemoveIngredientMutation();

  const updateAmount = debounce((newAmount: number) => {
    void updateIngredient({ variables: { input: { id: Number(id), amount: Number(newAmount) } } });
  }, 500);

  const updateMeasure = debounce((newMeasure: string) => {
    void updateIngredient({ variables: { input: { id: Number(id), measure: newMeasure } } });
  }, 500);

  const handleChangeAmount = (newAmount: number) => {
    setLocalAmount(newAmount);
    updateAmount(newAmount);
  };

  const handleChangeMeasure = (newMeasure: string) => {
    setLocalMeasure(newMeasure);
    updateMeasure(newMeasure);
  };

  const handleRemoveIngredient = async () => {
    await removeIngredient({ variables: { id: Number(id) } });
    void refetch();
  };

  return (
    <div className="flex justify-between mb-4">
      <span>{foodDescription}</span>
      <div>
        <Input
          type="number"
          value={localAmount}
          onChange={(e) => handleChangeAmount(Number(e.target.value))}
          name="amount"
          className="w-24"
        />

        <select
          id="portion"
          name="portion"
          onChange={(e) => handleChangeMeasure(e.target.value)}
          className=" ml-3 mr-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md w-24"
          defaultValue={localMeasure}
        >
          {portions.map((portion) => (
            <option key={portion.measure} value={portion.measure}>
              {portion.measure}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleRemoveIngredient}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline ml-8 text-gray-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
