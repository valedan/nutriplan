import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SimpleQuery from "../../components/SimpleQuery";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const Vercel = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Vercel</h1>
        <SimpleQuery />
      </div>
    </ApolloProvider>
  );
};

export default Vercel;
