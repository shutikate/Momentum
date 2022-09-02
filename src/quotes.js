import { getRandomNum } from './utils/common';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteUpdate = document.querySelector('.quote-update');
const languageButtons = document.getElementsByName('language');

async function getQuotes() {  
  let randomNum;
  if(languageButtons[0].checked) {
    const res = await fetch('./json/quotesEn.json');
    const data = await res.json(); 
    randomNum = getRandomNum(0, (data.length - 1));
    quote.textContent = data[randomNum].quote;
    author.textContent = data[randomNum].author;
  }
  if(languageButtons[1].checked) {
    const res = await fetch('./json/quotesRu.json');
    const data = await res.json(); 
    randomNum = getRandomNum(0, (data.length - 1));
    quote.textContent = data[randomNum].quote;
    author.textContent = data[randomNum].author;
  }
}

window.addEventListener('load', getQuotes);
quoteUpdate.addEventListener('click', getQuotes);
languageButtons.forEach(element => element.addEventListener('change', getQuotes));