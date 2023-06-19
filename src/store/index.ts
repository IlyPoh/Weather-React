// libraries
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

// reducers
import { reducer } from './reducer';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
