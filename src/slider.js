import { getTimeOfDayEn } from './utils/common';
import { getRandomNum } from './utils/common';

const body = document.body;
const tagUnsplash = document.querySelector('.tag-unsplash');
const tagFlickr = document.querySelector('.tag-flickr');
const backgroundButtons = document.getElementsByName('background');
const languageButtons = document.getElementsByName('language');
const notFound = document.querySelector('.not-found');

let randomNum = getRandomNum(1, 20);

const changeNotFoundMessage = () => {
  if(languageButtons[0].checked) {
    notFound.textContent = "Error! Images by provided tag haven't been found";
  }
  if(languageButtons[1].checked) {
    notFound.textContent = "Ошибка! По указанному тегу изображения не найдены";
  }
}

export const setBg = () => {
  notFound.classList.remove('not-found--visible');
  tagUnsplash.setAttribute('disabled', true);
  tagUnsplash.classList.remove('tag-active');
  tagFlickr.setAttribute('disabled', true);
  tagFlickr.classList.remove('tag-active');
  const timeOfDay = getTimeOfDayEn();
  const bgNum = randomNum.toString().padStart(2, '0');
  const image = new Image();
  image.src = `https://raw.githubusercontent.com/shutikate/momentum-backgrounds/main/images/${timeOfDay}/${bgNum}.webp`;
  image.addEventListener('load', () => {
    body.style.backgroundImage = `url(${image.src})`;
  });
}

const getLinkToImageUnsplash = async () => {
  try {
    tagUnsplash.removeAttribute('disabled');
    tagUnsplash.classList.add('tag-active');
    tagFlickr.setAttribute('disabled', true);
    tagFlickr.classList.remove('tag-active');
    const url = `https://api.unsplash.com/photos/random?query=${tagUnsplash.value}&client_id=4mDrkwLX7JqGLHf-20ymOFjrAQncuJ8QBdk-bsEBe0Q&sort=relevance`;
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res);
    }
    notFound.classList.remove('not-found--visible');
    const data = await res.json();
    const image = new Image();
    image.src = data.urls.raw;
    image.addEventListener('load', () => {
      body.style.backgroundImage = `url(${image.src})`;
    });
  } catch (e) {
    body.style.backgroundImage = '';
    notFound.classList.add('not-found--visible');
    tagUnsplash.value = '';
  }
  localStorage.setItem('tagUnsplash', tagUnsplash.value);
}

const getLinkToImageFlick = async () => {
  try {
    tagFlickr.removeAttribute('disabled');
    tagFlickr.classList.add('tag-active');
    tagUnsplash.setAttribute('disabled', true);
    tagUnsplash.classList.remove('tag-active');
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0fdf8f725b6d102384e1a6d194828731&tags=${tagFlickr.value}&tag_mode=all&extras=url_l&format=json&nojsoncallback=1&safe_search=1&sort=relevance`;
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error(res);
    }
    notFound.classList.remove('not-found--visible');
    const data = await res.json();
    const image = new Image();
    image.src = data.photos.photo[getRandomNum(0, (data.photos.photo.length - 1))].url_l;
    image.addEventListener('load', () => {
      body.style.backgroundImage = `url(${image.src})`;
    });
  } catch (e) {
    body.style.backgroundImage = '';
    notFound.classList.add('not-found--visible');
    tagFlickr.value = '';
  }
  localStorage.setItem('tagFlickr', tagFlickr.value);
}

const checkBackground = () => {
  if(backgroundButtons[0].checked) {
    setBg(); 
  }
  if(backgroundButtons[1].checked) {
    getLinkToImageUnsplash(); 
  }
  if(backgroundButtons[2].checked) {
    getLinkToImageFlick(); 
  }
}

const initialize = () => {
  localStorage.getItem('tagUnsplash') ? tagUnsplash.value = localStorage.getItem('tagUnsplash') : tagUnsplash.value = `${getTimeOfDayEn()}`;
  localStorage.getItem('tagFlickr') ? tagFlickr.value = localStorage.getItem('tagFlickr') : tagFlickr.value = `${getTimeOfDayEn()}`;

  if (localStorage.getItem('settings')) {
    const definedSettings = localStorage.getItem('settings');
    const definedSettingsObj = JSON.parse(definedSettings);
    if (definedSettingsObj.source === 'github') {
      setBg();
    }
    if (definedSettingsObj.source === 'unsplash') {
      getLinkToImageUnsplash();
    };
    if (definedSettingsObj.source === 'flickr') {
      getLinkToImageFlick();
    }
  } else {
    checkBackground();
  } 
  changeNotFoundMessage();
}

const prevButton = document.querySelector('.slider__prev');
const nextButton = document.querySelector('.slider__next');

const getSlidePrevGitHub = () => {
  randomNum > 1 ? randomNum -= 1 : randomNum = 20;
  setBg(); 
}

const getSlideNextGitHub = () => {
  randomNum < 20 ? randomNum += 1 : randomNum = 1;
  setBg(); 
}

const getSlidePrev = () => {
  if(backgroundButtons[0].checked) {
    getSlidePrevGitHub(); 
  }
  if(backgroundButtons[1].checked) {
    getLinkToImageUnsplash(); 
  }
  if(backgroundButtons[2].checked) {
    getLinkToImageFlick(); 
  }
}

const getSlideNext = () => {
  if(backgroundButtons[0].checked) {
    getSlideNextGitHub(); 
  }
  if(backgroundButtons[1].checked) {
    getLinkToImageUnsplash(); 
  }
  if(backgroundButtons[2].checked) {
    getLinkToImageFlick(); 
  }
}

backgroundButtons.forEach(element => element.addEventListener('change', checkBackground));
languageButtons.forEach(element => element.addEventListener('change', changeNotFoundMessage));
prevButton.addEventListener('click', getSlidePrev);
nextButton.addEventListener('click', getSlideNext);
window.addEventListener('load', initialize);
tagUnsplash.addEventListener('change', getLinkToImageUnsplash);
tagFlickr.addEventListener('change', getLinkToImageFlick);

