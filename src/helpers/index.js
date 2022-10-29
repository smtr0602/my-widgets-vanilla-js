export const getTimeOfDayText = () => {
  const time = new Date().getHours();
  if (time >= 5 && time < 12) {
    return 'morning';
  } else if (time >= 12 && time < 17) {
    return 'afternoon';
  } else if (time >= 17 && time < 19) {
    return 'evening';
  } else {
    return 'night';
  }
};

export const defaultTimeout = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
