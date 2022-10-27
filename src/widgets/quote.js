import axios from 'axios';

const getQuote = async () => {
  const options = {
    method: 'GET',
    url: process.env.QUOTE_API_URL,
    timeout: 5000,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios(options);
      document.querySelector(
        '.quote'
      ).textContent = `“${data.quote}” - ${data.person}`;
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default getQuote;
