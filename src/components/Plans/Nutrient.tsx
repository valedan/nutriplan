import classNames from "classnames";

interface Props {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

// These are very rough and need solid research to pin down
const nutrientTargets = {
  // Calories
  1008: {
    min: 2300,
    max: 2700,
  },
  // TODO: DRI for fat is usually given as a percentage of total calories
  // Fat
  1004: {
    min: 50,
    max: 80,
  },
  // Carbohydrates
  1005: {
    min: 250,
    max: 350,
  },
  // Protein
  1003: {
    min: 56,
    max: 70,
  },
  // Fiber
  1079: {
    min: 30,
    max: 38,
  },
  // TODO: Vitamin A is calculated in a super complicated way with RAE. Research more.
  // Vitamin A
  1104: {
    min: 3000,
    max: 9000,
  },
  // Vitamin C
  1162: {
    min: 90,
    max: 2000,
  },
  // Vitamin D
  1110: {
    min: 600,
    max: 4000,
  },
  // Vitamin E
  1109: {
    min: 15,
    max: 1000,
  },
  // Vitamin K
  1185: { min: 120, max: null },
  // Choline
  1180: {
    min: 550,
    max: 3500,
  },
  // B1 (Thiamine)
  1165: {
    min: 1.2,
    max: null,
  },
  // B2 (Riboflavin)
  1166: {
    min: 1.3,
    max: null,
  },
  // B3 (Niacin)
  1167: {
    min: 16,
    max: 35, // Only for synthetic forms
  },
  // B5 (Pantothenic acid)
  1170: { min: 5, max: null },
  // B6 (Pyridoxine)
  1175: {
    min: 1.3,
    max: 100,
  },
  // B7 (Biotin)
  1176: {
    min: 30,
    max: null,
  },
  // TODO: research  this more - folate and folic acid both in db
  // B9 (Folate)
  1177: {
    min: 400,
    max: 1000,
  },
  // B12 (Cobalamin)
  1178: {
    min: 2.4,
    max: null,
  },
  // Calcium
  1087: {
    min: 1000,
    max: 2500,
  },
  // Copper
  1098: {
    min: 0.9,
    max: 10,
  },
  // Iron
  1089: {
    min: 8,
    max: 45,
  },
  // Magnesium
  1090: {
    min: 420,
    // TODO: There is an upper limit specifically for supplemental magnesium.
    // Add feature to detect supplements in plan and check if they're too high?
    max: null,
  },
  // Manganese
  1101: {
    min: 2.3,
    max: 11,
  },
  // Phosphorus
  1091: {
    min: 700,
    max: 4000,
  },
  // Potassium
  1092: {
    min: 3400,
    max: null,
  },
  // Selenium
  1103: {
    min: 55,
    max: 400,
  },
  // Sodium
  1093: {
    min: 500,
    // This is nuanced - 2300 is the current RDA, but the AHA says an ideal limit would be 1500.
    max: 2300,
  },
  // Zinc
  1095: {
    min: 11,
    max: 40,
  },
  // Monounsaturated
  // TODO: this should be percentages of fat, or maybe calories
  // These numbers are BS
  1292: {
    min: 30,
    max: 50,
  },
  // Polyunsaturated
  1293: {
    min: 15,
    max: 30,
  },
  // Saturated
  1258: {
    min: 5,
    max: 15,
  },
  // Trans-Fat
  1257: {
    min: null,
    max: 2,
  },
  // Cholesterol
  // No guidelines for cholesterol because dietary doesn't translate to blood levels
  // Recommended to limit LDL in favor of HDL, but that data is not in USDA dataset
  1253: {
    min: null,
    max: null,
  },
  // TODO: research different carbs more
  // Starch
  1009: {
    min: null,
    max: null,
  },
  // Sugars
  1063: {
    min: null,
    max: null,
  },
  // Fructose
  1012: {
    min: null,
    max: null,
  },
  // TODO: Amino acid rda's are given per kilo of bodyweight. need to get user's weight
  // RDA for methionine + cystine is usually combined, as methionine can produce cystine
  // This is also true for Phenylalanine + tyrosine
  // "In a diet low in tyrosine, as much as half the ingested phenylalanine may be converted to tyrosine in the body. Conversely, if the diet is rich in tyrosine, the requirement for phenylalanine could be reduced by 50%"
  // For now I'm giving each of the pair members half the AI of the whole pair
  // Cystine
  1216: {
    min: 0.7,
    max: null,
  },
  // Histidine
  1221: {
    min: 1,
    max: null,
  },
  // Isoleucine
  1212: {
    min: 1.3,
    max: null,
  },
  // Leucine
  1213: {
    min: 3,
    max: null,
  },
  // Lysine
  1214: {
    min: 2.7,
    max: null,
  },
  // Methionine
  1215: {
    min: 0.7,
    max: null,
  },
  // Phenylalanine
  1217: {
    min: 1.15,
    max: null,
  },
  // Threonine
  1211: {
    min: 1.4,
    max: null,
  },
  // Tryptophan
  1210: {
    min: 0.35,
    max: null,
  },
  // Tyrosine
  1218: {
    min: 1.15,
    max: null,
  },
  // Valine
  1219: {
    min: 1.7,
    max: null,
  },
  // Alpha-carotene
  1108: {
    min: null,
    max: null,
  },
  // Beta-carotene
  1107: {
    min: null,
    max: null,
  },
  // Retinol
  1105: {
    min: null,
    max: null,
  },
};

export default function Nutrient({ id, name, amount, unit }: Props) {
  const targets = nutrientTargets[id as keyof typeof nutrientTargets];
  const percentageOfTarget = targets.min && (amount / targets.min) * 100;
  const isAboveMax = targets.max && amount > targets.max;
  const nameWithParens = name.match(/(.+)(\(.+\))/);

  // TODO: hover state
  return (
    <div className="flex items-center">
      <div className="text-right w-32 text-gray-700">
        <span>{nameWithParens ? nameWithParens[1] : name}</span>
        <span className="text-sm">{nameWithParens ? nameWithParens[2] : null}</span>
      </div>
      {typeof percentageOfTarget === "number" ? (
        <>
          <div className="flex flex-grow bg-gray-200 h-2 mx-2 rounded">
            <div
              className={classNames("rounded", {
                "bg-green-500": Math.round(percentageOfTarget) >= 100 && !isAboveMax,
                "bg-yellow-300": Math.round(percentageOfTarget) < 100,
                "bg-red-600": isAboveMax,
              })}
              style={{ width: `${Math.round(percentageOfTarget)}%` }}
            />
          </div>
          <span className="w-8 text-gray-700">{Math.round(percentageOfTarget)}%</span>
        </>
      ) : (
        <>
          <p className="flex flex-grow mx-2 italic text-gray-500 text-sm justify-center">No target</p>
          <div className="w-8 text-gray-600">
            <span>{Math.round(amount)}</span>
            <span className="ml-0.5">{unit.toLowerCase()}</span>
          </div>
        </>
      )}
    </div>
  );
}
