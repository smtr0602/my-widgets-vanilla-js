import axios from 'axios';
import { format } from 'date-fns';
import './styles/main.scss';

const getWeatherData = async () => {
  const options = {
    method: 'GET',
    url: process.env.WEATHER_API_URL,
    // vancouver location
    params: { lat: '49.2827', lon: '-123.1207' },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
    },
  };
  try {
    const weather = await axios(options);
    let listItems = '';
    const todaysDate = format(
      new Date(weather.data.data[0].timestamp_utc),
      'dd'
    );
    const todaysList = weather.data.data.filter(
      (item) =>
        format(new Date(item.timestamp_utc), 'dd') < parseInt(todaysDate) + 2
    );
    todaysList.forEach((item) => {
      const time = new Date(item.timestamp_utc);
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
    document.querySelector('.weather').innerHTML = `
    <ul>${listItems}</ul>
    `;
  } catch (error) {
    console.log(error);
  }
};

getWeatherData();
