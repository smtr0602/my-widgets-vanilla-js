import getAllWidgetData from './widgets';
import initModeSwitch from './components/mode-switch';
import { getTimeOfDayText } from './helpers';
import './styles/main.scss';

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

const init = async () => {
  initModeSwitch();
  getBgImage();
  getGreeting();
  await getAllWidgetData();
  document.querySelector('.loading').classList.add('isHidden');
};

init();
