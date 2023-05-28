import { URL, apiKey } from './constants';

export const fetchWeatherByCityURL = (city: string): string =>
  `${URL}data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
export const fetchWeatherByGeolocationURL = (
  lat: number,
  lon: number
): string =>
  `${URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
