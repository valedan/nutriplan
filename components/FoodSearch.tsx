import styled, { css } from "styled-components";
import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useCombobox } from "downshift";
import { useCallback, useEffect, useState } from "react";
import FoodSuggestion from "./FoodSuggestion";
import { gql } from "@apollo/client";
import TextField from "./TextField";

const searchFoodsQuery = gql`
  SearchFoods($searchTerm: String!) {
    searchFoods(searchTerm: $searchTerm) {
      description
      id
      portions {
        id
        measure
        gram_weight
        sequence_number
      }
    }
  }
`;

interface SearchFoodsData {
  searchFoods: IFoodSuggestion[];
}

interface SearchFoodsVars {
  searchTerm: string;
}

interface Portion {
  id: number;
  measure: string;
  gram_weight: number;
  sequence_number: number;
}

interface IFoodSuggestion {
  id: number;
  description: string;
  portions: Portion[];
}

const AbsoluteHint = styled.p`
  position: absolute;
  top: 0;
  margin-top: -4px;
`;

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  && {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

// If I set bottom: 0 on the menu itself, it expands upwards
const DropdownAnchor = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: -4px;
  min-height: var(--spacing-vertical-3);
  max-height: var(--spacing-vertical-5);
  overflow-y: auto;
  border: 1px solid var(--color-secondary);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 100%;
  background-color: var(--color-white);
`;

const DropdownOpenTextFieldStyles = css`
  input {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const StyledTextField = styled(TextField)<{ dropdownOpen?: boolean }>`
  flex-grow: 1;

  ${(props) => props.dropdownOpen && DropdownOpenTextFieldStyles}
`;

const Combobox = styled.div`
  display: flex;
`;

const DropdownMessage = styled.p`
  width: 100%;
  text-align: center;
  margin-top: var(--spacing-vertical-1);
  font-style: italic;
  color: var(--color-darkGrey);
`;

interface Props {
  onSelectFood: (food: IFoodSuggestion) => void;
}

const FoodSearch = ({ onSelectFood }: Props) => {
  const [searchFoods, { loading, error, data }] = useLazyQuery<SearchFoodsData, SearchFoodsVars>(searchFoodsQuery, {});
  const [searchInput, setSearchInput] = useState("");

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
    itemToString: (item) => item?.description || "unknown",
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) {
        return;
      }
      onSelectFood(changes.selectedItem);
      // setSearchInput(changes.selectedItem);
    },
    circularNavigation: false,
    // This triggers when you change the selected item and makes the search very specific
    onInputValueChange: debouncedSearch,
  });

  useEffect(() => {
    // When the parent adds the ingredient it resets the form, so we want to clear the combobox selection too
    if (searchInput === null) {
      reset();
    }
  }, [searchInput, reset]);

  const shouldShowDropdown = isOpen && (loading || error || data?.searchFoods !== undefined);

  return (
    <Wrapper>
      <Combobox {...getComboboxProps()}>
        <StyledTextField name="foodSearch" label="Ingredient" dropdownOpen={shouldShowDropdown} {...getInputProps()} />
        {!shouldShowDropdown && (
          <DropdownAnchor>
            <AbsoluteHint>Search food database</AbsoluteHint>
          </DropdownAnchor>
        )}
      </Combobox>
      <DropdownAnchor hidden={!shouldShowDropdown}>
        <DropdownMenu {...getMenuProps()}>
          {!shouldShowDropdown ? null : !!loading ? (
            <DropdownMessage>Loading...</DropdownMessage>
          ) : !!error ? (
            <DropdownMessage>Error :(</DropdownMessage>
          ) : data?.searchFoods?.length === 0 ? (
            <DropdownMessage>No foods found</DropdownMessage>
          ) : data?.searchFoods?.length && data?.searchFoods?.length >= 0 ? (
            data?.searchFoods?.map((item, index: number) => (
              <FoodSuggestion
                selected={highlightedIndex === index}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {`${item.description}`}
              </FoodSuggestion>
            ))
          ) : null}
        </DropdownMenu>
      </DropdownAnchor>
    </Wrapper>
  );
};

export default FoodSearch;
