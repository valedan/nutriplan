/* eslint-disable no-nested-ternary */
import { debounce } from "lodash";
import { useCombobox } from "downshift";
import { useCallback } from "react";
import FoodSuggestion from "./FoodSuggestion";
import { useSearchFoodsLazyQuery } from "../../../generated/graphql";

interface Props {
  onSelectFood: (foodId: number) => void;
}

const FoodSearch = ({ onSelectFood }: Props) => {
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
    items: data?.searchFoods ? data.searchFoods : [],
    itemToString: (food) => food?.description || "",
    onSelectedItemChange: (changes) => {
      if (changes.selectedItem) {
        onSelectFood(changes.selectedItem.id);
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
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full "
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
            data?.searchFoods?.map(
              (food, index: number) =>
                food && (
                  <FoodSuggestion
                    selected={highlightedIndex === index}
                    key={`${food.id}`}
                    food={food}
                    {...getItemProps({ item: food, index })}
                  />
                )
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;
