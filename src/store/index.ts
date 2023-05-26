// libraries
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// reducers
import { reducer } from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
