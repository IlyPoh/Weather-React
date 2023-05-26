import { City } from './city';

export interface AppState {
  city: City | null;
  error: string | null;
  loading: boolean;
}

export enum ActionTypes {
  UPDATE_CITY = 'UPDATE_CITY',
  UPDATE_ERRORS = 'UPDATE_ERRORS',
  UPDATE_LOADING = 'UPDATE_LOADING',
}

export interface UpdateCityAction {
  type: ActionTypes.UPDATE_CITY;
  payload: string;
}

export interface UpdateErrorsAction {
  type: ActionTypes.UPDATE_ERRORS;
  payload: string;
}

export interface UpdateLoadingAction {
  type: ActionTypes.UPDATE_LOADING;
  payload: boolean;
}

export type WeatherActionTypes =
  | UpdateCityAction
  | UpdateErrorsAction
  | UpdateLoadingAction;
