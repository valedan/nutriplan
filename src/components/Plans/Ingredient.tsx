import { debounce } from "lodash";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Portion, useRemoveIngredientMutation, useUpdateIngredientMutation } from "../../generated/graphql/hooks";
import { Input, Select, Checkbox } from "../shared";

interface Props {
  id: number;
  amount: number;
  measure: string;
  foodDescription: string;
  portions: Portion[];
  isMealIngredient?: boolean;
  refetch: () => void;
}

export default function Ingredient({
  id,
  amount,
  measure,
  foodDescription,
  portions,
  refetch,
  isMealIngredient = false,
}: Props) {
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
    <Disclosure key={id}>
      {({ open }) => (
        <div className="">
          <div className="flex flex-col ">
            <div className="flex  items-center flex-grow">
              {!isMealIngredient && <Checkbox />}
              <div className="flex items-center ml-4 mr-2 px-2 py-2 flex-grow justify-between border-b border-gray-200">
                <div className="flex flex-col">
                  <p className="text-gray-700">{foodDescription}</p>
                  {/* <Disclosure.Button className="mt-2"> */}
                  {/* <p className="text-sm text-gray-700 cursor-pointer">Details</p> */}
                  {/* </Disclosure.Button> */}
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
                    onChange={(e) => handleChangeMeasure(e.target.value)}
                    className="w-24 ml-4"
                    sizing="small"
                    defaultValue={localMeasure}
                  >
                    {portions.map((portion) => (
                      <option key={portion.measure} value={portion.measure}>
                        {portion.measure}
                      </option>
                    ))}
                  </Select>

                  <button
                    type="button"
                    onClick={handleRemoveIngredient}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500  hover:bg-red-100 focus:outline-none ml-4"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <Disclosure.Panel className="">
            <p>open</p>
          </Disclosure.Panel> */}
        </div>
      )}
    </Disclosure>
  );
}
