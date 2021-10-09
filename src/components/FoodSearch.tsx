/* eslint-disable no-nested-ternary */
import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useCombobox } from "downshift";
import { useCallback } from "react";
import FoodSuggestion from "./FoodSuggestion";
import { Portion, FoodNutrient } from "./Food";
import { useSearchFoodsLazyQuery } from "../generated/graphql";

interface SearchFoodsData {
  searchFoods: IFoodSuggestion[];
}

interface SearchFoodsVars {
  searchTerm: string;
}

export interface IFoodSuggestion {
  id: number;
  description?: string;
  data_source?: string;
  brand_owner?: string;
  category?: string;
  searchScore?: number;
  food_nutrients?: FoodNutrient[];
  portions?: Portion[];
}

interface Props {
  onSelectFood: (food: IFoodSuggestion) => void;
}

const FoodSearch = ({ onSelectFood }: Props) => {
  // const [searchFoods, { loading, error, data }] = useLazyQuery<SearchFoodsData, SearchFoodsVars>(SEARCH_FOODS, {});

  const [searchFoods, { loading, error, data }] = useSearchFoodsLazyQuery();

  // We need debouncedSearch to be a singleton
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(({ inputValue }: { inputValue?: string }) => {
      if (inputValue) {
        searchFoods({ variables: { searchTerm: inputValue } });
      }
    }, 500),
    []
  );

  const { isOpen, reset, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    items: data ? data.searchFoods : [],
    itemToString: (item) => item?.description || "",
    onSelectedItemChange: (changes) => {
      if (changes.selectedItem) {
        onSelectFood(changes.selectedItem);
      }
      reset();
    },
    circularNavigation: false,
    // This triggers when you change the selected item and makes the search very specific
    onInputValueChange: debouncedSearch,
  });

  const shouldShowDropdown = isOpen && (loading || error || data?.searchFoods !== undefined);

  return (
    <div className="">
      <div {...getComboboxProps()}>
        <input
          type="text"
          name="foodSearch"
          id="foodSearch"
          dropdownOpen={shouldShowDropdown}
          {...getInputProps()}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full "
          placeholder="Search food database"
        />
      </div>
      <div
        hidden={!shouldShowDropdown}
        className=" absolute z-10 mt-1 w-10/12 bg-white shadow-lg h-2/3 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto py-4 px-0"
      >
        <div {...getMenuProps()} className="divide-y divide-gray-200">
          {!shouldShowDropdown ? null : loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error :(</p>
          ) : data?.searchFoods?.length === 0 ? (
            <p>No foods found</p>
          ) : data?.searchFoods?.length ? (
            data?.searchFoods?.map((item, index: number) => (
              <FoodSuggestion
                selected={highlightedIndex === index}
                key={`${item.id}`}
                {...getItemProps({ item, index })}
              >
                <div className="flex flex-row justify-between text-gray-800">
                  <div className="flex-grow">
                    <span>
                      {item.description &&
                        item.description?.charAt(0).toUpperCase().concat(item.description.slice(1).toLowerCase())}
                    </span>
                    <div className="flex justify-between w-full pr-32 text-sm text-gray-500">
                      <span>{item.data_source}</span>
                      <span>Brand: {item.brand_owner || "--"}</span>
                      <span>Category: {item.category || "--"}</span>
                      <span>Score: {item.searchScore || "--"}</span>
                    </div>
                  </div>
                  <div className="flex-col">
                    <p>
                      {item.food_nutrients?.length} <span className="text-sm text-gray-500">Nutrients</span>{" "}
                    </p>
                    <p>
                      {item.portions?.length} <span className="text-sm text-gray-500">Portions</span>{" "}
                    </p>
                  </div>
                </div>
              </FoodSuggestion>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;
