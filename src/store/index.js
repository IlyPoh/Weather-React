import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { UPDATE_CITY, UPDATE_ERRORS, UPDATE_LOADING } from './actions';

const initialState = {
  city: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case UPDATE_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
