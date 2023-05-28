// libraries
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// components
import App from './App';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
