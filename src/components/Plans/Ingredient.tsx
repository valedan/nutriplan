import { debounce } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { useGetPlansQuery, useRemoveIngredientMutation, useUpdateIngredientMutation } from "../../generated/graphql";
import { Button } from "../shared";

interface Props {
  id: number;
  amount: number;
  measure: string;
  order: number;
  refetch: () => void;
  food: {
    id: number;
    description: string;
    portions: {
      amount: number;
      measure: string;
      gramWeight: number;
    };
  };
}

export default function Ingredient({ id, refetch, amount, measure, food: { description, portions } }: Props) {
  const [localAmount, setLocalAmount] = useState(amount);
  const [localMeasure, setLocalMeasure] = useState(measure);
  const [updateIngredient] = useUpdateIngredientMutation();
  const [removeIngredient] = useRemoveIngredientMutation();

  const updateAmount = debounce((newAmount: string) => {
    void updateIngredient({ variables: { input: { id: Number(id), amount: Number(newAmount) } } });
  }, 500);

  const updateMeasure = debounce((newMeasure: string) => {
    void updateIngredient({ variables: { input: { id: Number(id), measure: newMeasure } } });
  }, 500);

  const handleChangeAmount = (newAmount: string) => {
    setLocalAmount(newAmount);
    updateAmount(newAmount);
  };

  const handleRemoveIngredient = async () => {
    await removeIngredient({ variables: { id: Number(id) } });
    void refetch();
  };

  const handleUpdateMeasure = async (newMeasure: string) => {
    setLocalMeasure(newMeasure);
    updateMeasure(newMeasure);
  };

  // TODO
  // - perform portion update
  return (
    <div className="flex justify-between mb-4">
      <span>{description}</span>
      <div>
        <input
          type="number"
          name="amount"
          value={localAmount}
          onChange={(e) => handleChangeAmount(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-24 sm:text-sm border-gray-300 rounded-md"
        />
        <select
          id="portion"
          name="portion"
          onChange={(e) => handleUpdateMeasure(e.target.value)}
          className=" ml-3 mr-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md w-24"
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