/* eslint-disable no-nested-ternary */
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GET_FOOD } from "../graphql";

interface Food {
  id: number;
  description: string;
  brand: string;
}
interface FoodData {
  food: Food;
}

const SimpleQuery = () => {
  const [started, setStarted] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [loadQuery, { data, loading, error }] = useLazyQuery<FoodData>(GET_FOOD, {
    variables: { id: 167512 },
    onCompleted: () => setResponseTime(Date.now() - started),
  });

  const handleClick = () => {
    setStarted(Date.now());
    loadQuery();
  };

  return (
    <div>
      <h2>Simple Query</h2>
      <button type="button" onClick={handleClick}>
        Hello world
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :(</p>
      ) : data ? (
        <div>
          <p>{data.food.description}</p>
          <p>{responseTime}ms</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SimpleQuery;
