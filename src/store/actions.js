import axios from 'axios';
import {
  fetchWeatherByCityURL,
  fetchWeatherByGeolocationURL,
} from '/src/utils/config';
import { updateData } from '/src/helpers/helpers';

export const UPDATE_CITY = 'UPDATE_CITY';
export const UPDATE_ERRORS = 'UPDATE_ERRORS';
export const UPDATE_LOADING = 'UPDATE_LOADING';

const updateCity = (city) => ({
  type: UPDATE_CITY,
  payload: city,
});

const updateErrors = (error) => ({
  type: UPDATE_ERRORS,
  payload: error,
});

const updateLoading = (loading) => ({
  type: UPDATE_LOADING,
  payload: loading,
});

export const fetchCityByGeolocation = (lat, lon) => {
  return async (dispatch) => {
    try {
      // Add animation here if needed
      dispatch(updateLoading(true));

      const response = await axios.get(fetchWeatherByGeolocationURL(lat, lon));
      const data = response.data;

      updateData(data);

      // Update city in the state
      dispatch(updateCity(data));
      dispatch(updateErrors(null));
      localStorage.userCity = data.name;

      // Remove animation here if needed
      dispatch(updateLoading(false));
    } catch (error) {
      console.log('error', error);

      // Update errors in the state
      dispatch(updateErrors(error));
    }
  };
};

export const fetchCityByName = (cityName) => {
  return async (dispatch) => {
    try {
      dispatch(updateLoading(true));

      const response = await axios.get(fetchWeatherByCityURL(cityName));
      const data = response.data;

      updateData(data);

      dispatch(updateCity(data));
      dispatch(updateErrors(null));
      localStorage.userCity = data.name;

      dispatch(updateLoading(false));
    } catch (error) {
      console.log('error', error);

      // Update errors in the state
      dispatch(updateErrors(error));
    }
  };
};
