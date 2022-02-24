export interface IIngredient {
  id: number;
  name: string;
  amount: number;
  measure: string;
  dailyNutrientAmount: number;
  dailyNutrientPercentage: number;
}

interface Props {
  ingredient: IIngredient;
  unit: string;
}

// TODO: You should be able to adjust amounts or remove ingredients from here
export default function Ingredient({ ingredient, unit }: Props) {
  return (
    <div
      key={ingredient.id}
      className="flex items-center  px-2 py-4 flex-grow w-full justify-between border-b border-gray-200"
    >
      <div className="flex w-2/5">
        <span className="text-gray-700">{ingredient.name}</span>
      </div>
      <div className="flex w-1/5">
        <span className="text-gray-700">{ingredient.amount}</span>
        <span className="text-gray-700 ml-2">{ingredient.measure}</span>
      </div>
      <div className="flex w-1/5 justify-end">
        <span className="text-gray-700">{ingredient.dailyNutrientAmount}</span>
        <span className="text-gray-700 ml-2">{unit}</span>
      </div>
      <div className="flex w-1/5 justify-end pr-8">
        <span className="text-gray-700">{ingredient.dailyNutrientPercentage}</span>
        <span className="text-gray-700 ml-2">%</span>
      </div>
    </div>
  );
}
