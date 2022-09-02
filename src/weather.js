const weatherCity = document.querySelector('.weather__city');
const weatherIcon = document.querySelector('.weather__icon');
const temperature = document.querySelector('.weather_temperature');
const weatherDescription = document.querySelector('.weather_description');
const weatherWind = document.querySelector('.weather__wind');
const weatherHumidity = document.querySelector('.weather__humidity');
const languageButtons = document.getElementsByName('language');

let currentCorrectCity = weatherCity.value;
let languageByWeather;

const writeCorrectWeather = (data) => {
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  
  if(languageByWeather === 'en') {
    weatherWind.textContent = `Wind speed: ${Math.trunc(data.wind.speed)} m/s`;
    weatherHumidity.textContent = `Humidity: ${data.main.humidity} %`;
  } 
  if(languageByWeather === 'ru') {
    weatherWind.textContent = `Скорость ветра: ${Math.trunc(data.wind.speed)} м/с`;
    weatherHumidity.textContent = `Влажность: ${data.main.humidity} %`;
  } 
}

const writeErrorWeather = (data) => {
  weatherIcon.className = '';
  temperature.textContent = data.message;
  weatherDescription.textContent = '';
  weatherWind.textContent = '';
  weatherHumidity.textContent = '';
}

const getLanguageByWeather = () => {
  if (localStorage.getItem('settings')) {
    const definedSettings = localStorage.getItem('settings');
    const definedSettingsObj = JSON.parse(definedSettings);
    if (definedSettingsObj.language === 'english') {
      languageByWeather = 'en';
    } else if (definedSettingsObj.language === 'russian') {
      languageByWeather = 'ru';
    } else {
      languageByWeather = 'en';
    }
  }
}

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity.value}&lang=${languageByWeather}&appid=a360fdb14879fae1bb0901e4b60dc4e1&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    writeCorrectWeather(data);
    currentCorrectCity = weatherCity.value;
  } else {
    writeErrorWeather(data);
  }
  localStorage.setItem('city', currentCorrectCity);
}

changeLanguageByWeather = () => {
  if(languageButtons[0].checked) {
    languageByWeather = 'en';
    getWeather(); 
  }
  if(languageButtons[1].checked) {
    languageByWeather = 'ru';
    getWeather(); 
  }
  if (!localStorage.getItem('city')) {
    if(languageByWeather === 'en') {
      weatherCity.value = 'Minsk';
    }
    if (languageByWeather === 'ru') {
      weatherCity.value = 'Минск';
    }
  }
}

const getCity = () => {
  if (localStorage.getItem('city')) {
    weatherCity.value = localStorage.getItem('city');
  } else {
    if(languageByWeather === 'en') {
      weatherCity.value = 'Minsk';
    }
    if (languageByWeather === 'ru') {
      weatherCity.value = 'Минск';
    }
  } 
  getWeather();
}

weatherCity.addEventListener('change', getWeather);
window.addEventListener('load', getLanguageByWeather);
window.addEventListener('load', getCity);
languageButtons.forEach(element => element.addEventListener('change', changeLanguageByWeather));