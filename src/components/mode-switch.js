const initModeSwitch = () => {
  const modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', () => {
    modeSwitch.classList.toggle('isOn');
    document.body.classList.toggle('isEdit');
  });
  document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList.contains('delete-btn')) {
      const widgetItem = target.closest('.widget-item');
      widgetItem.style.opacity = '0';
      setTimeout(() => {
        widgetItem.style.display = 'none';
      }, 500);
    }
  });
};

export default initModeSwitch;
