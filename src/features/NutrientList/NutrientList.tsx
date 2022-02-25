import { useState } from "react";
import { useGetNutrientGroupsQuery } from "generated/graphql/hooks";
import { sortByOrder } from "utils";
import NutrientGroup from "./NutrientGroup";
import Nutrient from "./Nutrient";
import NutrientModal from "./NutrientModal/NutrientModal";

export default function NutrientList() {
  const { data } = useGetNutrientGroupsQuery();

  const [openNutrientId, setOpenNutrientId] = useState<number | null>(null);

  const closeNutrientModal = () => {
    setOpenNutrientId(null);
  };

  const openNutrientModal = (id: number) => {
    setOpenNutrientId(id);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {openNutrientId && <NutrientModal nutrientId={openNutrientId} onClose={closeNutrientModal} />}

      <div className="min-h-0 flex flex-col overflow-y-auto overflow-x-hidden w-full">
        {sortByOrder(data.nutrientGroups).map(({ id, name, nutrients: nutrientsInGroup }) => (
          <NutrientGroup name={name} key={id}>
            {sortByOrder(nutrientsInGroup).map((nutrient) => {
              return <Nutrient key={nutrient.id} id={nutrient.id} openNutrientModal={openNutrientModal} />;
            })}
          </NutrientGroup>
        ))}
      </div>
    </>
  );
}
