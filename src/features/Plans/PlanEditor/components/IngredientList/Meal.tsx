import classNames from "classnames";
import { Fragment, useState } from "react";
import { Disclosure, Transition, Menu } from "@headlessui/react";
import { ChevronRightIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { Input } from "components";
import { Portion, useRemoveMealMutation } from "generated/graphql/hooks";
import { sortByOrder } from "utils";
import Ingredient from "./Ingredient";
import { useReadMeal } from "./hooks/useReadMeal";

interface Props {
  id: number;
  refetch: () => void;
}

export default function Meal({ id, refetch }: Props) {
  const meal = useReadMeal(id);
  const [localServings, setLocalServings] = useState(meal?.servings);
  const [removeMeal] = useRemoveMealMutation();

  if (!meal) {
    return null;
  }

  const handleChangeServings = (newServings: number) => {
    // TODO
    setLocalServings(newServings);
  };

  const handleRemoveMeal = async () => {
    await removeMeal({ variables: { id: Number(id) } });
    void refetch();
  };

  return (
    <Disclosure key={id} defaultOpen>
      {({ open }) => (
        <div className="flex my-4   ">
          <div className="flex flex-col shadow w-full ml-4 rounded-lg border-gray-200 border">
            <div className="flex  items-center flex-grow bg-gray-100 shadow">
              <div className="flex items-center ml-2 px-2  flex-grow justify-between ">
                <div className="flex items-center">
                  <Disclosure.Button className="mr-2">
                    <ChevronRightIcon className={`${open ? "transform rotate-90" : ""} w-5 h-5 text-gray-500`} />
                  </Disclosure.Button>
                  <p className="text-gray-700">{meal.recipe.name}</p>
                </div>
                <div className="flex my-2 items-center">
                  <Input
                    type="number"
                    value={localServings}
                    onChange={(e) => handleChangeServings(Number(e.target.value))}
                    name="amount"
                    className="w-24"
                    sizing="small"
                  />
                  <p className="ml-4 text-gray-700 text-sm">servings</p>
                  <Menu as="div" className="ml-12 mr-4 relative z-30 inline-block text-left">
                    <div>
                      <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={`/recipes/${meal.recipe.id}/edit`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Go to recipe
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={handleRemoveMeal}
                                className={classNames(
                                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                  "flex px-4 py-2 text-sm w-full"
                                )}
                              >
                                Remove
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4   text-sm">
                {sortByOrder(meal.ingredients).map((ingredient) => (
                  <Ingredient key={ingredient.id} id={ingredient.id} refetch={refetch} isMealIngredient />
                ))}
              </Disclosure.Panel>
            </Transition>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
