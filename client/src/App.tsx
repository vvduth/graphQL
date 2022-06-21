import React from "react";
import Header from "./components/Header";
import Client from "./components/Client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="container">
          <Header />
          <Client />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
