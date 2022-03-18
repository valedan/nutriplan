import classNames from "classnames";
import { ContentModal, Heading } from "components";
import {
  useAddIngredientMutation, useAddMealMutation
} from "generated/graphql/hooks";

import { Tab } from "@headlessui/react";

import { useCurrentPlan } from "../../PlanContext";
import FoodSearch from "./FoodSearch/FoodSearch";
import RecipeLibraryDropdown from "./RecipeLibraryDropdown";

interface Props {
  onClose: () => void;
}

export default function AddFoodModal({ onClose }: Props) {
  const { id, refetch } = useCurrentPlan();
  const [addIngredient] = useAddIngredientMutation();
  const [addMeal] = useAddMealMutation();

  const handleSelectFood = async (foodId: number) => {
    await addIngredient({
      variables: {
        input: {
          planId: id,
          foodId,
        },
      },
    });

    // TODO: do something more efficient here
    void refetch();
    // onClose();
  };

  const handleSelectRecipe = async (recipeId: number) => {
    await addMeal({
      variables: {
        input: {
          planId: id,
          recipeId,
        },
      },
    });

    void refetch();
    // onClose();
  };
  return (
    <ContentModal open onClose={onClose}>
      <ContentModal.Header onClose={onClose} className="p-4">
        <Heading>Add Food</Heading>
      </ContentModal.Header>
      <ContentModal.Content className="">
        <div className="">
          <Tab.Group>
            <Tab.List className="border-b border-gray-200 mt-2">
              <Tab>
                {({ selected }) => (
                  <button
                    type="button"
                    className={classNames(
                      selected
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                    )}
                  >
                    Search
                  </button>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <button
                    type="button"
                    className={classNames(
                      selected
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      " py-2 px-4 text-center border-b-2 font-medium text-sm -mb-px"
                    )}
                  >
                    Recipes
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="flex flex-col">
                <div className=" flex flex-col ">
                  <FoodSearch onSelectFood={handleSelectFood} />
                </div>
              </Tab.Panel>
              <Tab.Panel>Coming soon</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </ContentModal.Content>
    </ContentModal>
  );
}
