import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/index';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const port = process.env.REACT_APP_MANAGE_DB_PORT;
const manage_db_client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `http://localhost:${port}/graphql`
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={manage_db_client}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ApolloProvider>
);
