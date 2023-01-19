import 'core-js/stable';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';
import { CartProvider } from './utils/StateContext';
import { IntlProvider } from 'react-intl';

(async () => {
  ReactDOM.render(
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>,
    document.getElementById('root')
  );
})();
