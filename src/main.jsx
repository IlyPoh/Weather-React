// libraries
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

// components
import App from './App.jsx';
import store from './store/index.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
