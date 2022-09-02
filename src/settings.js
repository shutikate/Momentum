import { storageEventTarget } from './utils/storage';

let switchButton = document.querySelectorAll('.widget-btn');
const settingsButton = document.querySelector('.settings__icon');
const settingsForm = document.querySelector('.settings__form');
const backgroundButtons = document.getElementsByName('background');
const languageButtons = document.getElementsByName('language');
const tagUnsplash = document.querySelector('.tag-unsplash');
const tagFlickr = document.querySelector('.tag-flickr');
const languageName = document.querySelector('.language-name');

const writeSettings = () => {
  if(languageButtons[0].checked) {
    languageName.textContent = 'Language:';
    document.querySelector('.english').textContent = 'English';
    document.querySelector('.russian').textContent = 'Russian';
    document.querySelector('.source-name').textContent = 'Image source:';
    document.querySelector('.widget-audio').textContent = 'Audio Player';
    document.querySelector('.widget-weather').textContent = 'Weather';
    document.querySelector('.widget-time').textContent = 'Time';
    document.querySelector('.widget-date').textContent = 'Date';
    document.querySelector('.widget-greeting').textContent = 'Greeting';
    document.querySelector('.widget-quotes').textContent = 'Quotes';
    document.querySelector('.widget-todo').textContent = 'To do list'; 
  }
  if(languageButtons[1].checked) {
    languageName.textContent = 'Язык:';
    document.querySelector('.english').textContent = 'Английский';
    document.querySelector('.russian').textContent = 'Русский';
    document.querySelector('.source-name').textContent = 'Источник изображения:';
    document.querySelector('.widget-audio').textContent = 'Аудио Плеер';
    document.querySelector('.widget-weather').textContent = 'Погода';
    document.querySelector('.widget-time').textContent = 'Время';
    document.querySelector('.widget-date').textContent = 'Дата';
    document.querySelector('.widget-greeting').textContent = 'Приветствие';
    document.querySelector('.widget-quotes').textContent = 'Цитаты';
    document.querySelector('.widget-todo').textContent = 'Список дел';
  }
}

const applySettingsForApp = (settings) => {
  for (let key in settings) {
    if (typeof settings[key] === 'boolean' && settings[key]) {
      document.querySelector(`#${key}`).classList.add('widget-btn--on');
      document.querySelector(`.${key}`).classList.add('visibility');
    }
    if(settings[key] === 'russian') {
      languageButtons[1].setAttribute('checked', true);
      languageButtons[0].removeAttribute('checked'); 
    }
    if(settings[key] === 'english') {
      languageButtons[0].setAttribute('checked', true);
      languageButtons[1].removeAttribute('checked'); 
    }
    if(settings[key] === 'unsplash') {
      backgroundButtons[1].setAttribute('checked', true);
      backgroundButtons[0].removeAttribute('checked'); 
      backgroundButtons[2].removeAttribute('checked');
      tagUnsplash.removeAttribute('disabled');
      tagUnsplash.classList.add('tag-active');
    }
    if(settings[key] === 'github') {
      backgroundButtons[0].setAttribute('checked', true);
      backgroundButtons[1].removeAttribute('checked'); 
      backgroundButtons[2].removeAttribute('checked');
    }
    if(settings[key] === 'flickr') {
      backgroundButtons[2].setAttribute('checked', true);
      backgroundButtons[0].removeAttribute('checked'); 
      backgroundButtons[1].removeAttribute('checked');
      tagFlickr.removeAttribute('disabled');
      tagFlickr.classList.add('tag-active');
    }
  }
}

const setupInitialSettings = () => {
  const definedSettings = localStorage.getItem('settings');
  if (!definedSettings) {
    const initialSettings = {
      player: true,
      weather: true,
      time: true,
      date: true,
      greeting: true,
      quotes: true,
      toDo: true,
      language: 'english',
      source: 'github',
    };
    applySettingsForApp(initialSettings);
    localStorage.setItem('settings', JSON.stringify(initialSettings));
  } else {
    const definedSettingsObj = JSON.parse(definedSettings);
    applySettingsForApp(definedSettingsObj);
  }
}

const toggleSwitchButton = (event) => {
  event.target.classList.toggle('widget-btn--on');
  const id = event.target.id;
  document.querySelector(`.${id}`).classList.toggle('visibility');

  const definedSettings = localStorage.getItem('settings');
  const definedSettingsObj = JSON.parse(definedSettings);
  definedSettingsObj[id] = !definedSettingsObj[id];
  
  localStorage.setItem('settings', JSON.stringify(definedSettingsObj));
  storageEventTarget.changeSettings(definedSettingsObj);
}

const changeLanguage = () => {
  const definedSettings = localStorage.getItem('settings');
  const definedSettingsObj = JSON.parse(definedSettings);
  if(languageButtons[0].checked) {
    definedSettingsObj.language = 'english';
  }
  if(languageButtons[1].checked) {
    definedSettingsObj.language = 'russian';
  }
  localStorage.setItem('settings', JSON.stringify(definedSettingsObj));
  storageEventTarget.changeSettings(definedSettingsObj);
  writeSettings();
}

const changeSourceOfBackground = () => {
  const definedSettings = localStorage.getItem('settings');
  const definedSettingsObj = JSON.parse(definedSettings);
  if(backgroundButtons[0].checked) {
    definedSettingsObj.source = 'github';
  }
  if(backgroundButtons[1].checked) {
    definedSettingsObj.source = 'unsplash';
  }
  if(backgroundButtons[2].checked) {
    definedSettingsObj.source = 'flickr';
  }
  localStorage.setItem('settings', JSON.stringify(definedSettingsObj));
  storageEventTarget.changeSettings(definedSettingsObj);
}

const toggleOpenSettings = () => {
  settingsForm.classList.toggle('settings__open');
  settingsButton.classList.toggle('settings__icon-active');
}

switchButton.forEach(el => el.addEventListener('click', toggleSwitchButton));
settingsButton.addEventListener('click', toggleOpenSettings);
window.addEventListener('beforeunload', setupInitialSettings);
window.addEventListener('load', setupInitialSettings);
window.addEventListener('load', writeSettings);
languageButtons.forEach(element => element.addEventListener('change', changeLanguage));
backgroundButtons.forEach(element => element.addEventListener('change', changeSourceOfBackground));

