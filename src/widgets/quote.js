import axios from 'axios';

const getQuote = async () => {
  const options = {
    method: 'POST',
    url: process.env.QUOTE_API_URL,
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
    },
    timeout: 5000,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios(options);
      document.querySelector('.quote').textContent = data;
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default getQuote;
