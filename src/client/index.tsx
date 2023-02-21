import 'core-js/stable';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';
import { CartProvider } from './utils/StateContext';
import { IntlProvider } from 'react-intl';
import { ApolloProvider } from '@apollo/client';
import client from './utils/Apollo';

(async () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <CartProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
})();
