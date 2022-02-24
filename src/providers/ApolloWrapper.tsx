import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, from, HttpLink } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => (isAuthenticated ? getAccessTokenSilently() : "");

    getToken().then(
      (fetchedToken) => setToken(fetchedToken),
      // eslint-disable-next-line no-console
      (error) => console.log(error)
    );
  }, [getAccessTokenSilently, isAuthenticated]);

  const authLink = new ApolloLink((operation, forward) => {
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return forward(operation);
  });

  const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URL });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            nutrient: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: "Nutrient",
                  id: args?.id as number,
                });
              },
            },
          },
        },

        Portion: {
          keyFields: ["measure", "gramWeight"],
        },
      },
    }),
    link: from([authLink, httpLink]),
    connectToDevTools: true,

    defaultOptions: {
      watchQuery: {
        errorPolicy: "ignore",
      },
      query: {
        errorPolicy: "all",
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
