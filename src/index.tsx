import 'core-js/stable';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

(async () => {
  ReactDOM.render(
    <QueryClientProvider client={client}>
      <StrictMode>
        <App />
      </StrictMode>
      ,
    </QueryClientProvider>,
    document.getElementById('root')
  );
})();
