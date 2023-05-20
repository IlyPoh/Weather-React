// libraries
import thunk from '../../node_modules/redux-thunk/es/index';
import { createStore, applyMiddleware, AnyAction } from 'redux';

// components
import { UPDATE_CITY, UPDATE_ERRORS, UPDATE_LOADING } from './actions';

export interface IAppState {
  city: string | null;
  error: string | null;
  loading: boolean;
}

const initialState: IAppState = {
  city: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action: AnyAction) => {
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
