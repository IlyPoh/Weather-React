// components
import { months, directions } from '../utils/constants';
import {
  fetchCityByGeolocation,
  fetchCityByName,
  handleErrorMessage,
} from '../store/actions';

export const getUserGeolocation = (dispatch, cityList) => {
  navigator.geolocation.getCurrentPosition(
    (data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;

      if (!localStorage.userCity) {
        dispatch(fetchCityByGeolocation(lat, lon));
      } else {
        dispatch(fetchCityByName(localStorage.userCity));
      }
    },
    (error) => {
      dispatch(handleErrorMessage(error));

      if (!localStorage.userCity) {
        dispatch(fetchCityByName(cityList[0]));
      } else {
        dispatch(fetchCityByName(localStorage.userCity));
      }
    }
  );
};

function dewPointCelsius(temperature, humidity) {
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

function findWindDirection(windDeg) {
  const windDirectionDegrees = 45;
  const numberOfDirections = 8;
  const windDirectionIndex =
    Math.round(windDeg / windDirectionDegrees) % numberOfDirections;
  const windDirectionCardinal = directions[windDirectionIndex];

  return windDirectionCardinal;
}

function getLocalTime(value) {
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

function firstLetterToUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const updateData = (data) => {
  const visibilityMetric = 1000;

  data.fullname = `${data.name}, ${data.sys.country}`;
  data.temp = Math.round(data.main.temp);
  data.state = data.weather[0].main;
  data.secondState = firstLetterToUpperCase(data.weather[0].description);
  data.icon = data.weather[0].icon;
  data.time = getLocalTime(data.timezone);
  data.feelsLike = Math.round(data.main.feels_like);
  data.windDeg = data.wind.deg;
  data.windDirection = findWindDirection(data.wind.deg);
  data.windSpeed = data.wind.speed;
  data.pressure = data.main.pressure;
  data.humidity = data.main.humidity;
  data.dew = dewPointCelsius(data.main.temp, data.main.humidity);
  data.visibility = (data.visibility / visibilityMetric).toFixed(1);
};
