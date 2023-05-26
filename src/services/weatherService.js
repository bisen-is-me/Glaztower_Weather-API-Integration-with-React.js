import {DateTime} from "luxon";
const API_KEY = "8e36af032c3348efaaa2d19c3a3e5462";
const BASE_URL = "https://api.weatherbit.io/v2.0";

//one call url
// openweatherapi
// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

// weatherbit
//current:https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=8e36af032c3348efaaa2d19c3a3e5462

//daily:https://api.weatherbit.io/v2.0/forecast/daily?lat=35.7796&lon=-78.6382&key=8e36af032c3348efaaa2d19c3a3e5462

//hourly:https://api.weatherbit.io/v2.0/forecast/hourly?lat=35.7796&lon=-78.6382&key=8e36af032c3348efaaa2d19c3a3e5462&hours=5

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);

  url.search = new URLSearchParams({ ...searchParams, key: API_KEY });
  console.log(url);
  return fetch(url).then((res) => res.json());
  
};

const formatCurrentWeather = (data) => {
  const {
          lat,lon,
          ts,
          city_name,country_code,
          weather:{description,icon},
          temp,
          clouds,dewpt,wind_spd,
          sunrise,sunset,aqi,precip

  } = data.data[0];
  return {
    lat,
    lon,
    ts,
    city_name,
    country_code,
    description ,
    icon,
    temp,
    clouds,
    dewpt,
    wind_spd,
    sunrise,
    sunset,
    aqi,
    precip
    
  }
};

//DAILY
const formatForecastWeatherDaily = (datam) => {
  let {timezone:timezone}=datam;
  let {
    data
  } = datam;

  
    data = data.slice(1,6).map((d) => {
    return {
      title: formatToLocalTime(d.ts, timezone, "ccc"),
      temp: d.temp,
      icon: d.weather.icon,
    };
  });
  let daily=data;
  return { timezone,daily};
};

//HOURLY
const formatForecastWeatherHourly = (datam) => {
  let {timezone:timezone}=datam;
  let {
    data
  } = datam;

  
    data = data.slice(1,6).map((d) => {
    return {
      title: formatToLocalTime(d.ts, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather.icon,
    };
  });
  let hourly=data;
  return { timezone,hourly};
};


const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "current",
    searchParams
  ).then(formatCurrentWeather);

  const {lat,lon}=formattedCurrentWeather;
  const dly="forecast/daily";
  const hly="forecast/hourly";

  const formattedForecastWeatherD = await getWeatherData(dly,
  {
    lat,
    lon,
    units: searchParams.units,
  }).then(formatForecastWeatherDaily);
  
  const formattedForecastWeatherH = await getWeatherData(hly,
    {
      lat,
      lon,
      units: searchParams.units,
    }).then(formatForecastWeatherHourly);
  
  return {...formattedCurrentWeather,...formattedForecastWeatherD,...formattedForecastWeatherH};
  
};

const formatToLocalTime=(
  secs,
  zone,
  format="cccc,dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

  const iconurlFromCode=(code)=>`icons/${code}.png`;
  export default getFormattedWeatherData;

  export {formatToLocalTime, iconurlFromCode};

