// libraries
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

// components
import App from './App';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
