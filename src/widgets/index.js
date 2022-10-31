import getWeatherData from './weather';
import getQuote from './quote';
import getCurrencyData from './currency';
import { defaultTimeout } from '../helpers';
import getNewsData from './news';

const getAllWidgetData = () => {
  return Promise.allSettled([
    defaultTimeout(1000),
    getWeatherData(),
    getQuote(),
    getCurrencyData(),
    getNewsData(),
  ]);
};

export default getAllWidgetData;
