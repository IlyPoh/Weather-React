import { UPDATE_CITY, UPDATE_ERRORS, UPDATE_LOADING } from '../store/actions';
import { City } from './city';

export interface AppState {
  city: City | null;
  error: string | null;
  loading: boolean;
}

export interface UpdateCityAction {
  type: typeof UPDATE_CITY;
  payload: string;
}

export interface UpdateErrorsAction {
  type: typeof UPDATE_ERRORS;
  payload: string;
}

export interface UpdateLoadingAction {
  type: typeof UPDATE_LOADING;
  payload: boolean;
}

export type WeatherActionTypes =
  | UpdateCityAction
  | UpdateErrorsAction
  | UpdateLoadingAction;
