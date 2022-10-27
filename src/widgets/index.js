import getWeatherData from './weather';
import getQuote from './quote';
import getCurrencyData from './currency';
import getNewsData from './news';

const getAllWidgetData = () => {
  return Promise.all([
    getWeatherData(),
    getQuote(),
    getCurrencyData(),
    getNewsData(),
  ]);
};

export default getAllWidgetData;
