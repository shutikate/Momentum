import { getTimeOfDayEn } from './utils/common';
import { getTimeOfDayRu } from './utils/common';

const greeting = document.querySelector('.greeting__text');
const languageButtons = document.getElementsByName('language');
const greetingName = document.querySelector('.greeting__name');

const writeGreetingMessage = () => {
  if(languageButtons[0].checked) {
    greeting.textContent = `Good ${getTimeOfDayEn()},`;
    greetingName.placeholder = '[Enter name]';
  }
  if(languageButtons[1].checked) {
    greeting.textContent = `${getTimeOfDayRu()},`;
    greetingName.placeholder = '[Введите имя]';
  }
}

setInterval(writeGreetingMessage, 1000);

const setName = () => {
  localStorage.setItem('name', greetingName.value);
}

const getName = () => {
  if (localStorage.getItem('name')) {
    greetingName.value = localStorage.getItem('name');
  }
}

window.addEventListener('beforeunload', setName);
window.addEventListener('load', getName);
window.addEventListener('load', writeGreetingMessage);
languageButtons.forEach(element => element.addEventListener('change', writeGreetingMessage));