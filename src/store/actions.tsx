// libraries
import { Dispatch } from 'react';
import axios from '../../node_modules/axios/index';

// components
import {
  fetchWeatherByCityURL,
  fetchWeatherByGeolocationURL,
} from '../utils/config';
import { updateData } from '../helpers/helpers';

export const UPDATE_CITY = 'UPDATE_CITY';
export const UPDATE_ERRORS = 'UPDATE_ERRORS';
export const UPDATE_LOADING = 'UPDATE_LOADING';

interface IUpdateCityAction {
  type: typeof UPDATE_CITY;
  payload: string;
}

interface IUpdateErrorsAction {
  type: typeof UPDATE_ERRORS;
  payload: string;
}

interface IUpdateLoadingAction {
  type: typeof UPDATE_LOADING;
  payload: boolean;
}

export type WeatherActionTypes =
  | IUpdateCityAction
  | IUpdateErrorsAction
  | IUpdateLoadingAction;

const updateCity = (city: string): IUpdateCityAction => ({
  type: UPDATE_CITY,
  payload: city,
});

const updateErrors = (error: string): IUpdateErrorsAction => ({
  type: UPDATE_ERRORS,
  payload: error,
});

const updateLoading = (loading: boolean): IUpdateLoadingAction => ({
  type: UPDATE_LOADING,
  payload: loading,
});

export const fetchCityByGeolocation = (lat: number, lon: number) => {
  return async (dispatch: Dispatch<WeatherActionTypes>) => {
    try {
      dispatch(updateLoading(true));

      const response = await axios.get(fetchWeatherByGeolocationURL(lat, lon));
      const data = response.data;

      updateData(data);

      dispatch(updateCity(data));
      localStorage.userCity = data.name;

      dispatch(updateLoading(false));
    } catch (error: any) {
      dispatch(updateErrors(error));
    }
  };
};

export const fetchCityByName = (cityName: string) => {
  return async (dispatch: Dispatch<WeatherActionTypes>) => {
    try {
      dispatch(updateLoading(true));

      const response = await axios.get(fetchWeatherByCityURL(cityName));
      const data = response.data;

      updateData(data);

      dispatch(updateCity(data));
      localStorage.userCity = data.name;

      dispatch(updateLoading(false));
    } catch (error: any) {
      dispatch(updateErrors(error));
    }
  };
};

export const handleErrorMessage = (error: string) => {
  return (dispatch: Dispatch<WeatherActionTypes>) => {
    dispatch(updateErrors(error));
  };
};

export const handleLoading = (loading: boolean) => {
  return (dispatch: Dispatch<WeatherActionTypes>) => {
    dispatch(updateLoading(loading));
  };
};
