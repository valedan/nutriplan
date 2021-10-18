import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import {
  useGetFoodsWithNutrientsQuery,
  GetFoodsWithNutrientsQuery,
  useGetNutrientsQuery,
} from "../../generated/graphql";
import Nutrient from "./Nutrient";

interface FoodAmount {
  foodId: number;
  amount: number;
}

interface Props {
  foodAmounts: FoodAmount[];
  daysInPlan: number;
}

interface FoodWithNutrients {
  id: number;
  nutrients: {
    id: number;
    amount: number;
    name: string;
    unit: string;
  }[];
}

const NUTRIENT_GROUPS = [
  {
    name: "General",
    nutrients: [
      { name: "Calories", id: 1008 },
      { name: "Fats", id: 1004 },
      { name: "Carbs", id: 1005 },
      { name: "Protein", id: 1003 },
      { name: "Fiber", id: 1079 },
    ],
  },
  {
    name: "Vitamins",
    nutrients: [
      { name: "Vitamin A", id: 1104 },
      { name: "Vitamin C", id: 1162 },
      { name: "Vitamin D", id: 1110 },
      { name: "Vitamin E", id: 1109 },
      { name: "Vitamin K", id: 1185 },
      { name: "Choline", id: 1180 },
      { name: "B1 (Thiamine)", id: 1165 },
      { name: "B2 (Riboflavin)", id: 1166 },
      { name: "B3 (Niacin)", id: 1167 },
      { name: "B5 (Pant. acid)", id: 1170 },
      { name: "B6 (Pyridoxine)", id: 1175 },
      { name: "B7 (Biotin)", id: 1176 },
      { name: "B9 (Folate)", id: 1177 },
      { name: "B12 (Cobalamin)", id: 1178 },
    ],
  },
  {
    name: "Minerals",
    nutrients: [
      { name: "Calcium", id: 1087 },
      { name: "Copper", id: 1098 },
      { name: "Iron", id: 1089 },
      { name: "Magnesium", id: 1090 },
      { name: "Manganese", id: 1101 },
      { name: "Phosphorus", id: 1091 },
      { name: "Potassium", id: 1092 },
      { name: "Selenium", id: 1103 },
      { name: "Sodium", id: 1093 },
      { name: "Zinc", id: 1095 },
    ],
  },
  {
    name: "Fats",
    nutrients: [
      { name: "Monounsaturated", id: 1292 },
      { name: "Polyunsaturated", id: 1293 },
      { name: "Saturated", id: 1258 },
      // TODO: omegas are a pain because they're split up a bunch
      // { name: "Omega-3", id: 1002 },
      // { name: "Omega-6", id: 1002 },
      { name: "Trans-Fat", id: 1257 },
      { name: "Cholesterol", id: 1253 },
    ],
  },
  {
    name: "Sugars",
    nutrients: [
      { name: "Starch", id: 1009 },
      { name: "Sugars", id: 1063 },
      { name: "Fructose", id: 1012 },
    ],
  },
  {
    name: "Amino Acids",
    nutrients: [
      { name: "Cystine", id: 1216 },
      { name: "Histidine", id: 1221 },
      { name: "Isoleucine", id: 1212 },
      { name: "Leucine", id: 1213 },
      { name: "Lysine", id: 1214 },
      { name: "Methionine", id: 1215 },
      { name: "Phenylalanine", id: 1217 },
      { name: "Threonine", id: 1211 },
      { name: "Tryptophan", id: 1210 },
      { name: "Tyrosine", id: 1218 },
      { name: "Valine", id: 1219 },
    ],
  },
  {
    name: "Other",
    nutrients: [
      { name: "Alpha-carotene", id: 1108 },
      { name: "Beta-carotene", id: 1107 },
      { name: "Retinol", id: 1105 },
    ],
  },
];

// nutrientId => amount
const aggregateNutrientAmounts = (foods: FoodWithNutrients[], foodAmounts: FoodAmount[]) => {
  const normalizedFoodAmounts: { [key: number]: number } = {};

  foodAmounts.forEach((foodAmount) => {
    normalizedFoodAmounts[foodAmount.foodId] = foodAmount.amount;
  });

  const nutrientAmounts: { [key: number]: number } = {};
  foods.forEach(({ id, nutrients }) => {
    const foodAmount = normalizedFoodAmounts[id];
    nutrients.forEach((nutrient) => {
      if (nutrientAmounts[nutrient.id]) {
        // nutrient amounts from the api are per 100g
        nutrientAmounts[nutrient.id] += (nutrient.amount * foodAmount) / 100;
      } else {
        nutrientAmounts[nutrient.id] = (nutrient.amount * foodAmount) / 100;
      }
    });
  });
  return nutrientAmounts;
};

export default function NutrientList({ foodAmounts, daysInPlan }: Props) {
  const foodIds = foodAmounts.map((fa) => fa.foodId);
  const { data: nutrientData, loading: nutrientLoading, error: nutrientError } = useGetNutrientsQuery();

  const { data, loading, error } = useGetFoodsWithNutrientsQuery({ variables: { foodIds } });

  if (!nutrientData || loading || error || nutrientLoading || nutrientError) {
    return null;
  }
  console.log(nutrientData);

  const nutrientAmounts = aggregateNutrientAmounts(data?.foods, foodAmounts);
  return (
    <div className="min-h-0 flex flex-col overflow-y-auto">
      {NUTRIENT_GROUPS.map(({ name, nutrients: nutrientsInGroup }) => {
        return (
          <Disclosure key={name} defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex relative justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-7">
                  <h2>{name}</h2>
                  <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-gray-500`} />
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-col px-8 py-4 gap-2">
                  {nutrientsInGroup.map((nutrientInGroup) => {
                    const nutrient = nutrientData.nutrients.find((nut) => nut.id === nutrientInGroup.id);
                    if (!nutrient) {
                      return null;
                    }
                    return (
                      <Nutrient
                        key={nutrient.id}
                        id={nutrient.id}
                        amount={nutrientAmounts[nutrient.id] ? nutrientAmounts[nutrient.id] / daysInPlan : 0}
                        unit={nutrient.unit}
                        name={nutrientInGroup.name}
                      />
                    );
                  })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}
    </div>
  );
}
