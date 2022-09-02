const time = document.querySelector('.time');
const date = document.querySelector('.date');
const languageButtons = document.getElementsByName('language');


const showTime = () => {
  const currentTime = new Date().toLocaleTimeString('ru');
  time.textContent = currentTime;
}
showTime();
setInterval(showTime, 1000);

const showDate = () => {
  const options = {month: 'long', day: 'numeric', weekday: 'long'};
  let currentDate;
  if(languageButtons[0].checked) {
    currentDate = new Date().toLocaleDateString('en-US', options);
  }
  if(languageButtons[1].checked) {
    currentDate = new Date().toLocaleDateString('ru', options);
  }
  date.textContent = currentDate;
}
showDate();

setInterval(showDate, 1000);

window.addEventListener('load', showDate);
languageButtons.forEach(element => element.addEventListener('change', showDate));




