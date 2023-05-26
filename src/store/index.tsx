// libraries
import thunk from '../../node_modules/redux-thunk/es/index';
import { createStore, applyMiddleware, AnyAction } from 'redux';

// types
import { ActionTypes, AppState } from '../types/store';

const initialState: AppState = {
  city: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionTypes.UPDATE_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.UPDATE_LOADING:
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
