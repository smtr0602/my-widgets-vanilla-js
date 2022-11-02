import axios from 'axios';
import { format } from 'date-fns';
import { getCurrentLocation } from '../helpers';

const getWeatherData = async () => {
  const { longitude, latitude } = await getCurrentLocation();
  // vancouver location
  const defaultLocation = {
    lat: '49.2827',
    lon: '-123.1207',
  };
  const options = {
    method: 'GET',
    url: process.env.WEATHER_API_URL,
    params: {
      lat: latitude || defaultLocation.lat,
      lon: longitude || defaultLocation.lon,
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    },
    timeout: 5000,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios(options);
      let listItems = '';
      const todaysDate = format(new Date(data.data[0].timestamp_local), 'dd');
      const todaysList = data.data.filter((item) => {
        return (
          format(new Date(item.timestamp_local), 'dd') <
          parseInt(todaysDate) + 3
        );
      });
      todaysList.forEach((item) => {
        const time = new Date(item.timestamp_local);
        listItems += `
        <li>
          <p class="weather__date">${format(time, 'MM/dd')}</p>
          <p class="weather__time">${format(
            time,
            'h:mm'
          )}<span class="unit">${format(time, "aaaaa'm'")}</span></p>
          <p class="weather__temp">${item.temp}<span class="unit">°C</span></p>
          <img
            src="https://www.weatherbit.io/static/img/icons/${
              item.weather.icon
            }.png"
          />
          <p class="weather__desc">${item.weather.description}</p>
        </li>
        `;
      });
      document.querySelector('.weather').innerHTML += `
      <p class="weather__location">Weather in: ${data.city_name} (timezone: ${data.timezone})</p>
      <ul>${listItems}</ul>
      `;
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default getWeatherData;
