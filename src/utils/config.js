import { URL, apiKey } from './constants';

export const fetchWeatherByCityURL = (city) =>
  `${URL}data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
export const fetchWeatherByGeolocationURL = (lat, lon) =>
  `${URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
