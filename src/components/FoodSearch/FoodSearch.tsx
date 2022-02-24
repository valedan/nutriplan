/* eslint-disable no-nested-ternary */
import { debounce } from "lodash";
import { useCombobox } from "downshift";
import { useCallback } from "react";
import classNames from "classnames";
import { useSearchFoodsLazyQuery } from "generated/graphql/hooks";
import FoodSuggestion from "./FoodSuggestion";
import Input from "../Forms/Input/Input";
import Spinner from "../Spinner";

const DEBUG = false;

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
        void searchFoods({ variables: { searchTerm: inputValue } });
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
    <div className="relative">
      <div {...getComboboxProps()}>
        <Input
          name="foodSearch"
          id="foodSearch"
          placeholder="Search food database"
          rounded
          dropdownOpen={shouldShowDropdown}
          {...getInputProps()}
        />
      </div>
      <div
        hidden={!shouldShowDropdown}
        className={classNames("", {
          "absolute z-10 mt-1 w-full bg-white shadow-lg h-96 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto px-0":
            DEBUG,
          " absolute z-10 mt-1 w-full bg-white shadow-lg h-96 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto px-0":
            !DEBUG,
        })}
      >
        <div {...getMenuProps()} className="divide-y divide-gray-200">
          {!shouldShowDropdown ? null : loading ? (
            <div className="w-full mt-16 flex items-center align-middle justify-center">
              <Spinner />
            </div>
          ) : error ? (
            <p>Error :(</p>
          ) : data?.searchFoods?.length === 0 ? (
            <p>No foods found</p>
          ) : data?.searchFoods?.length ? (
            data?.searchFoods?.map(
              (food, index: number) =>
                food && (
                  <FoodSuggestion
                    debug={DEBUG}
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
