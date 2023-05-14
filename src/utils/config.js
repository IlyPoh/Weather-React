const apiKey = '0c796f0b8200e08a4b2b28a170bb0484';
const URL = 'https://api.openweathermap.org/';

export const cityList = ['Kyiv', 'Odesa', 'New York', 'London', 'Tokyo'];

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

export const fetchWeatherByCity = (city) =>
  `${URL}data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
export const fetchWeatherByGeolocation = (lat, lon) =>
  `${URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
