type CityMain = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
};

type CitySys = {
  country: string;
  sunrise: number;
  sunset: number;
};

type CityWind = {
  deg: number;
  gust: number;
  speed: number;
};

type CityWeather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type City = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dew: number;
  dt: number;
  feelsLike: number;
  fullname: string;
  icon: string;
  id: number;
  main: CityMain;
  name: string;
  secondState: string;
  state: string;
  sys: CitySys;
  temp: number;
  time: string;
  timezone: number;
  visibility: string;
  weather: [CityWeather];
  wind: CityWind;
  windDirection: string;
};
