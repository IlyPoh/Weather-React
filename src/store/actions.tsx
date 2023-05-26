// libraries
import { Dispatch } from 'react';
import axios from '../../node_modules/axios/index';

// components
import {
  fetchWeatherByCityURL,
  fetchWeatherByGeolocationURL,
} from '../utils/config';
import { updateData } from '../helpers/helpers';

// types
import {
  ActionTypes,
  UpdateCityAction,
  UpdateErrorsAction,
  UpdateLoadingAction,
  WeatherActionTypes,
} from '../types/store';

const updateCity = (city: string): UpdateCityAction => ({
  type: ActionTypes.UPDATE_CITY,
  payload: city,
});

const updateErrors = (error: string): UpdateErrorsAction => ({
  type: ActionTypes.UPDATE_ERRORS,
  payload: error,
});

const updateLoading = (loading: boolean): UpdateLoadingAction => ({
  type: ActionTypes.UPDATE_LOADING,
  payload: loading,
});

export const fetchCityByGeolocation = (lat: number, lon: number) => {
  return async (dispatch: Dispatch<WeatherActionTypes>): Promise<void> => {
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
  return async (dispatch: Dispatch<WeatherActionTypes>): Promise<void> => {
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
