import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

const query = gql`
  query HelloWorld {
    greeting
  }
`;
const SimpleQuery = () => {
  const [started, setStarted] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [loadQuery, { data, loading, error }] = useLazyQuery(query, {
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
          <p>{data.greeting}</p>
          <p>{responseTime}ms</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SimpleQuery;
