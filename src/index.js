import axios from 'axios';
import { format } from 'date-fns';
import './styles/main.scss';

const getGreeting = () => {
  const time = new Date().getHours();
  let timeOfDayText;
  if (time >= 5 && time < 12) {
    timeOfDayText = 'morning';
  } else if (time >= 12 && time < 17) {
    timeOfDayText = 'afternoon';
  } else {
    timeOfDayText = 'evening';
  }
  document.querySelector(
    'h1'
  ).textContent = `Good ${timeOfDayText}, ${process.env.USER_NAME}!`;
};

const getQuote = async () => {
  const options = {
    method: 'GET',
    url: process.env.QUOTE_API_URL,
    timeout: 5000,
  };
  try {
    const { data } = await axios(options);
    document.querySelector(
      '.quote'
    ).textContent = `“${data.quote}” - ${data.person}`;
  } catch (error) {
    console.log(error);
  }
};

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
        format(new Date(item.timestamp_utc), 'dd') < parseInt(todaysDate) + 3
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

const getNewsData = async () => {
  const options = {
    method: 'GET',
    url: process.env.NEWS_API_URL,
    params: {
      country: 'jp',
      apiKey: process.env.NEWS_API_KEY,
    },
    timeout: 5000,
  };
  try {
    const { data } = await axios(options);
    let articleItems = '';
    data.articles.forEach((article) => {
      articleItems += `
      <li class="news-item">
          <img src="${article.urlToImage}" alt="${article.title}" />
          <div class="news-content">
            <div class="link-bg">
            <a href="${article.url}" target="_blank">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            </div>
            <h2>${article.title}</h2>
            <p>${article.description}</p>
          </div>
      </li>
      `;
    });
    document.querySelector('.news').innerHTML = `<ul>${articleItems}</ul>`;
  } catch (error) {
    console.log(error);
  }
};

getGreeting();
getQuote();
getWeatherData();
getExchangeRatesData();
getNewsData();
