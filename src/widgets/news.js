import axios from 'axios';

const getNewsData = async () => {
  const options = {
    method: 'GET',
    url: process.env.NEWS_API_URL,
    params: {
      country: 'jp',
      apiKey: process.env.NEWS_API_KEY,
      pageSize: 100,
    },
    timeout: process.env.AXIOS_TIMEOUT,
  };
  return new Promise(async (resolve, reject) => {
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
      document.querySelector(
        '.news'
      ).innerHTML += `<div class="news__inner"><ul>${articleItems}</ul></div>`;
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export default getNewsData;
