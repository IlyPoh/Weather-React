// components
import { months, directions } from '../utils/constants';
import {
  fetchCityByGeolocation,
  fetchCityByName,
  handleErrorMessage,
} from '../store/actions';

// types
import { AppState, WeatherActionTypes } from '../types/store';
import { City } from '../types/city';
import { ThunkDispatch } from 'redux-thunk';

export const getUserGeolocation = (
  dispatch: ThunkDispatch<null, AppState, WeatherActionTypes>,
  cityList: string[]
): void => {
  navigator.geolocation.getCurrentPosition(
    (data: GeolocationPosition): void => {
      const { latitude, longitude } = data.coords;

      if (!localStorage.userCity) {
        dispatch(fetchCityByGeolocation(latitude, longitude));
      } else {
        dispatch(fetchCityByName(localStorage.userCity));
      }
    },
    (error: GeolocationPositionError): void => {
      dispatch(handleErrorMessage(error.message));

      if (!localStorage.userCity) {
        dispatch(fetchCityByName(cityList[0]));
      } else {
        dispatch(fetchCityByName(localStorage.userCity));
      }
    }
  );
};

function dewPointCelsius(temperature: number, humidity: number): number {
  const vaporPressureConstant = 17.27;
  const saturationVaporPressureConstant = 237.7;
  const alpha =
    (vaporPressureConstant * temperature) /
      (saturationVaporPressureConstant + temperature) +
    Math.log(humidity / 100.0);
  const dewPoint = Math.round(
    (saturationVaporPressureConstant * alpha) / (vaporPressureConstant - alpha)
  );

  return dewPoint;
}

function findWindDirection(windDeg: number): string {
  const windDirectionDegrees = 45;
  const numberOfDirections = 8;
  const windDirectionIndex =
    Math.round(windDeg / windDirectionDegrees) % numberOfDirections;
  const windDirectionCardinal = directions[windDirectionIndex];

  return windDirectionCardinal;
}

function getLocalTime(value: number): string {
  const time = new Date();
  const currentUTCDate = new Date(
    time.getTime() + time.getTimezoneOffset() * 60 * 1000
  );
  const localTime = new Date(currentUTCDate.getTime() + value * 1e3);
  let hours = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const date = localTime.getDate();
  const month = localTime.getMonth();
  const currentMonth = months[month];

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm} ${currentMonth} ${date}`;
}

function firstLetterToUpperCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const updateData = (data: Partial<City>): Partial<City> => {
  const visibilityMetric = 1000;

  data.fullname = `${data.name}, ${data.sys?.country}`;
  data.temp = Math.round(data.main?.temp || 0);
  data.state = data.weather?.[0]?.main || '';
  data.secondState = firstLetterToUpperCase(
    data.weather?.[0]?.description || ''
  );
  data.icon = data.weather?.[0]?.icon || '';
  data.time = getLocalTime(data.timezone || 0);
  data.feelsLike = Math.round(data.main?.feels_like || 0);
  data.windDirection = findWindDirection(data.wind?.deg || 0);
  data.dew = dewPointCelsius(data.main?.temp || 0, data.main?.humidity || 0);
  data.visibility = (
    data.visibility ? parseFloat(data.visibility) / visibilityMetric : 0
  ).toFixed(1);

  return data;
};

export const imageSrc = (imageURL: string): string => {
  return `https://openweathermap.org/img/wn/${imageURL}@2x.png`;
};
