import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SimpleQuery from "../../components/SimpleQuery";

const client = new ApolloClient({
  uri: "https://nutriplan-api.herokuapp.com/",
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

const Heroku = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Heroku</h1>
        <SimpleQuery />
      </div>
    </ApolloProvider>
  );
};

export default Heroku;
