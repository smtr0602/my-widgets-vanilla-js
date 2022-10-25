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
    timeout: 5000,
  };
  try {
    const { data } = await axios(options);
    let listItems = '';
    const todaysDate = format(new Date(data.data[0].timestamp_utc), 'dd');
    const todaysList = data.data.filter(
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

const getExchangeRatesData = async () => {
  const options = {
    method: 'GET',
    url: process.env.EXCHANGE_RATES_API_URL,
    // vancouver location
    params: { to: 'JPY', from: 'CAD', amount: 1 },
    headers: {
      apikey: process.env.EXCHANGE_RATES_API_KEY,
    },
    timeout: 5000,
  };
  try {
    const { data } = await axios(options);
    const fromValInt = data.info.rate.toString().split('.')[0];
    const fromValDecimal = data.info.rate.toString().split('.')[1];
    document.querySelector('.currency').innerHTML = `
    <p class="currency__from">${Number(data.query.amount).toFixed(
      2
    )} Canadian Dollar = </p>
    <p class="currency__to">${fromValInt}<span class="currency__decimal">.${fromValDecimal}</span> Japanese Yen</p>
    <p class="currency__time">Updated at: ${format(
      data.info.timestamp * 1000,
      'MM/dd HH:mm'
    )}</p>
    `;
  } catch (error) {
    console.log(error);
  }
};

getWeatherData();
getExchangeRatesData();
