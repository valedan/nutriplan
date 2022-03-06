import { gql, useApolloClient } from "@apollo/client";
import { Nutrient } from "generated/graphql/hooks";

const useLocalNutrient = (id: number) => {
  const client = useApolloClient();

  const nutrient = client.readFragment<Nutrient>(
    {
      id: `Nutrient:${id}`,
      fragment: gql`
        fragment Nutrient on Nutrient {
          id
          name
          unit
          order
          displayName
          activeTarget {
            id
            min
            max
          }
        }
      `,
    },
    // use optimistic results
    true
  );

  if (!nutrient) {
    return {};
  }

  return {
    nutrient,
  };
};

export default useLocalNutrient;
