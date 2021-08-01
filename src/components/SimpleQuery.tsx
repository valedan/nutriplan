import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const query = gql`
  query getFood($id: Int!) {
    food(id: $id) {
      id
      description
      brand
    }
  }
`;
const SimpleQuery = () => {
  const [started, setStarted] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [loadQuery, { data, loading, error }] = useLazyQuery(query, {
    variables: { id: 167512 },
    onCompleted: () => setResponseTime(Date.now() - started),
  });

  const handleClick = async () => {
    setStarted(Date.now());
    loadQuery();
  };
  return (
    <div>
      <h2>Simple Query</h2>
      <button onClick={handleClick}>Hello world</button>
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