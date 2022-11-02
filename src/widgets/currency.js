import axios from 'axios';
import { format } from 'date-fns';

const getCurrencyData = async () => {
  const options = {
    method: 'GET',
    url: process.env.EXCHANGE_RATES_API_URL,
    // vancouver location
    params: { to: 'JPY', from: 'CAD', amount: 1 },
    headers: {
      apikey: process.env.EXCHANGE_RATES_API_KEY,
    },
    timeout: process.env.AXIOS_TIMEOUT,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios(options);
      const fromValInt = data.info.rate.toString().split('.')[0];
      const fromValDecimal = data.info.rate.toString().split('.')[1];
      document.querySelector('.currency').innerHTML += `
      <p class="currency__from">${Number(data.query.amount).toFixed(
        2
      )} Canadian Dollar = </p>
      <p class="currency__to">${fromValInt}<span class="currency__decimal">.${fromValDecimal}</span> Japanese Yen</p>
      <p class="currency__time">Updated at: ${format(
        data.info.timestamp * 1000,
        'MM/dd HH:mm'
      )}</p>
      `;
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default getCurrencyData;
