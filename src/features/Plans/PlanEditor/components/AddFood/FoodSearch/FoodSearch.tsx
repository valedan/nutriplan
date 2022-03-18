import classNames from "classnames";
import { Button } from "components";
import { useCombobox } from "downshift";
import { useSearchFoodsLazyQuery } from "generated/graphql/hooks";
/* eslint-disable no-nested-ternary */
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";

import Input from "../../../../../../components/Forms/Input/Input";
import Spinner from "../../../../../../components/Spinner";
import FoodSuggestion from "./FoodSuggestion";

interface Props {
  onSelectFood: (foodId: number) => void;
}

const SearchError = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center text-gray-600">
        <p>
          <span role="img" aria-label="sad face">
            😢
          </span>
        </p>
        <p>Sorry, there was an error finding foods. Please try again.</p>
      </div>
    </div>
  );
};

const SearchResultsEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center text-gray-600">
        <p>
          <span role="img" aria-label="sad face">
            😢
          </span>
        </p>
        <p>No results found.</p>
      </div>
    </div>
  );
};

const FoodSearch = ({ onSelectFood }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(null);
  const [searchFoods, { loading, error, data }] = useSearchFoodsLazyQuery();

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        if (searchTerm) {
          setSelectedFoodIndex(null);
          void searchFoods({ variables: { searchTerm, nutrientIds: [1008] } });
        }
      }, 500),
    [searchFoods]
  );

  const handleChangeInput = (input: string) => {
    setInputValue(input);
    debouncedSearch(input);
  };

  console.log(data?.searchFoods);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col  pt-4 ">
        <Input
          name="foodSearch"
          id="foodSearch"
          placeholder="Search food database"
          rounded
          className="px-4"
          value={inputValue}
          onChange={(e) => handleChangeInput(e.target.value)}
        />
        <div className=" flex flex-col h-[55vh] overflow-y-auto">
          {loading ? (
            <div className="w-full mt-16 flex items-center align-middle justify-center">
              <Spinner />
            </div>
          ) : error ? (
            <SearchError />
          ) : data?.searchFoods?.length === 0 ? (
            <SearchResultsEmpty />
          ) : (
            data?.searchFoods?.map(
              (food, index) =>
                food && (
                  <FoodSuggestion
                    selected={false}
                    key={`${food.id}`}
                    food={food}
                    selected={index === selectedFoodIndex}
                    onClick={() => setSelectedFoodIndex(index)}
                  />
                )
            )
          )}
        </div>
      </div>
      <div className="flex h-[80px]  border-t border-gray-400 py-2 px-8 justify-between items-center">
        {selectedFoodIndex !== null && (
          <>
            <div>
              <p className="text-lg">{data.searchFoods[selectedFoodIndex].description}</p>
              <p>Calories: {data?.searchFoods[selectedFoodIndex]?.foodNutrients[0].amount} </p>
            </div>
            <Button>Add Food</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodSearch;
