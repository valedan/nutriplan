import styled, { css } from "styled-components/macro";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { useCombobox } from "downshift";
import { useCallback, useEffect, useState } from "react";
import FoodSuggestion from "./FoodSuggestion";
import { SEARCH_FOODS } from "../graphql";
import { useAuth0 } from "@auth0/auth0-react";

import { Listbox, Transition } from "@headlessui/react";
import LoginButton from "./LoginButton";

interface SearchFoodsData {
  searchFoods: IFoodSuggestion[];
}

interface SearchFoodsVars {
  searchTerm: string;
}

export interface IFoodSuggestion {
  id: number;
  description: string;
  portions: Portion[];
}
// const AbsoluteHint = styled(Hint)`
//   position: absolute;
//   top: 0;
//   margin-top: -4px;
// `;

// const Wrapper = styled.div`
//   position: relative;
//   flex-grow: 1;
//   && {
//     margin-left: 16px;
//     margin-right: 16px;
//   }
// `;

// // If I set bottom: 0 on the menu itself, it expands upwards
// const DropdownAnchor = styled.div`
//   position: absolute;
//   width: 100%;
//   bottom: 0;
// `;

// const DropdownMenu = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: absolute;
//   left: 0;
//   top: 0;
//   margin-top: -4px;
//   min-height: var(--spacing-vertical-3);
//   max-height: var(--spacing-vertical-5);
//   overflow-y: auto;
//   border: 1px solid var(--color-secondary);
//   border-bottom-left-radius: 8px;
//   border-bottom-right-radius: 8px;
//   width: 100%;
//   background-color: var(--color-white);
// `;

// const DropdownOpenTextFieldStyles = css`
//   input {
//     border-bottom-left-radius: 0;
//     border-bottom-right-radius: 0;
//   }
// `;

// const StyledTextField = styled(FormikTextField)<{ dropdownOpen?: boolean }>`
//   flex-grow: 1;

//   ${(props) => props.dropdownOpen && DropdownOpenTextFieldStyles}
// `;

// const Combobox = styled.div`
//   display: flex;
// `;

// const DropdownMessage = styled.p`
//   width: 100%;
//   text-align: center;
//   margin-top: var(--spacing-vertical-1);
//   font-style: italic;
//   color: var(--color-darkGrey);
// `;

interface Props {
  onSelectFood: (food: IFoodSuggestion) => void;
}

const FoodSearch = ({ onSelectFood }: Props) => {
  const [searchFoods, { loading, error, data }] = useLazyQuery<SearchFoodsData, SearchFoodsVars>(SEARCH_FOODS, {});

  // We need debouncedSearch to be a singleton
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async ({ inputValue }) => {
      searchFoods({ variables: { searchTerm: inputValue } });
    }, 500),
    []
  );

  const { isOpen, reset, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } = useCombobox({
    items: data ? data.searchFoods : [],
    itemToString: (item) => item.description,
    onSelectedItemChange: (changes) => {
      changes.selectedItem && onSelectFood(changes.selectedItem);
      reset();
    },
    circularNavigation: false,
    // This triggers when you change the selected item and makes the search very specific
    onInputValueChange: debouncedSearch,
  });

  const shouldShowDropdown = isOpen && (loading || error || data?.searchFoods !== undefined);

  // if (!isAuthenticated) {
  //   return <LoginButton />;
  // }

  return (
    <div className="mt-12 ml-28 mr-28">
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
          {!shouldShowDropdown ? null : !!loading ? (
            <p>Loading...</p>
          ) : !!error ? (
            <p>Error :(</p>
          ) : data?.searchFoods?.length === 0 ? (
            <p>No foods found</p>
          ) : data?.searchFoods?.length >= 0 ? (
            data?.searchFoods?.map((item, index: number) => (
              <FoodSuggestion
                selected={highlightedIndex === index}
                key={`${item}${index}`}
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
                      <span>Brand: {item.brand || "--"}</span>
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
