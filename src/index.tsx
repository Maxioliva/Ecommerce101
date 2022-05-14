import 'core-js/stable';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import App from './App';

(async () => {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root')
  );
})();
