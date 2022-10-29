import getAllWidgetData from './widgets';
import initModeSwitch from './components/mode-switch';
import { getTimeOfDayText } from './helpers';
import './styles/main.scss';

const setDocumentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
};

const getBgImage = async () => {
  const timeOfDayText = getTimeOfDayText();
  // ---- for unsplash random images ------------------
  // unsplash random images: https://source.unsplash.com/random/1280x853/?morning
  // document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1280x853/?${timeOfDayText})`;
  // --------------------------------------------------
  const { body } = document;
  body.style.backgroundImage = `url(/imgs/bg/${timeOfDayText}.png)`;
  body.classList.add(timeOfDayText);
};

const getGreeting = () => {
  const timeOfDayText = getTimeOfDayText();
  const greeingText = {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'afternoon',
    night: 'evening',
  };
  document.querySelector(
    'h1'
  ).innerHTML = `Good ${greeingText[timeOfDayText]}, <span>${process.env.USER_NAME}!</span>`;
};

const registerSw = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  }
};

const init = async () => {
  setDocumentHeight();
  window.addEventListener('resize', setDocumentHeight);

  initModeSwitch();
  getBgImage();
  getGreeting();
  await getAllWidgetData();
  document.querySelector('.loading').classList.add('isHidden');
};

registerSw();
init();
