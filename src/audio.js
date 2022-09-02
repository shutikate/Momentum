import { storageEventTarget } from './utils/storage';
import playList from './playList';

const playerSongs = document.querySelector('.player__songs');

playList.forEach((el, index) => {
  let li = document.createElement('li');
  li.setAttribute('data-number-of-song', index);
  li.classList.add('song');
  li.textContent = playList[index].title;
  playerSongs.append(li);
})

const inputVolume = document.querySelector('#volume');
const playPauseButton = document.querySelector('.button_play');
const previousButton = document.querySelector('.button_previous');
const nextButton = document.querySelector('.button_next');
let song = document.querySelectorAll('.song');
const timeLength = document.querySelector('.time-length');
const timeCurrent = document.querySelector('.time-current');
const playerSongName =document.querySelector('.player__song-name');
const progressScale = document.querySelector('.progress-scale');
const playerProgress = document.querySelector('.player__progress');
const volumeProgress = document.querySelector('.volume-progress');
const volumeButton = document.querySelector('.volume-button');

const audio = new Audio();
let playNum = 0;
let isPlay = false;
audio.src = playList[playNum].src;
audio.currentTime = 0;
let progressHandlerIntervalId;
audio.volume = 0.5;

const handleTimingOfSong = () => {
  if (!progressHandlerIntervalId) {
    progressHandlerIntervalId = setInterval(changeProgress, 500);
  }
}

const stopHandleTimingOfSong = () => {
  if (progressHandlerIntervalId) {
    progressHandlerIntervalId = clearInterval(progressHandlerIntervalId);
  }
}

const getTimeMinutes = (num) => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}

const getInformationOfSong = () => {
  timeCurrent.textContent = getTimeMinutes(audio.currentTime);
  timeLength.textContent = getTimeMinutes(playList[playNum].duration);
  playerSongName.textContent = `${playNum + 1}. ${playList[playNum].title}`;
}
getInformationOfSong();

const changeProgress = () => {
  timeCurrent.textContent = getTimeMinutes(audio.currentTime);
  progressScale.style.width = audio.currentTime / audio.duration * 100 + '%';
}

const changeStateOfProgress = (element) => {
  const progressWidth = window.getComputedStyle(playerProgress).width;
  const placeClicking = element.offsetX / parseInt(progressWidth) * audio.duration;
  audio.currentTime = placeClicking;
  changeProgress();
}

const changeVolume = ({ target }) => {
  audio.volume = Number(target.value) / 100;

  if (Number(target.value) && volumeButton.classList.contains('volume-mute')) {
    volumeButton.classList.remove('volume-mute');
  }
  if (!Number(target.value) && !volumeButton.classList.contains('volume-mute')) {
    volumeButton.classList.add('volume-mute');
  }
}

const toggleVolumeButton = () => {
  audio.muted = !audio.muted;
  if (audio.muted) { 
    volumeButton.classList.add('volume-mute');
    inputVolume.value = 0;
  } else {
      volumeButton.classList.remove('volume-mute');
      inputVolume.value = audio.volume * 100;
  }
}

const togglePlayButton = () => {
  playPauseButton.classList.toggle('button_pause');
  isPlay = !isPlay;
  isPlay ? audio.play() : audio.pause();
  isPlay ? handleTimingOfSong() : stopHandleTimingOfSong();
  song[playNum].classList.add('song-active');
  song[playNum].classList.toggle('song-active-icon');
}

const playPressingSong = (event) => {
  const clickedSong = Number(event.target.dataset.numberOfSong);
  song[playNum].classList.remove('song-active', 'song-active-icon');
  if (clickedSong !== playNum) audio.src = playList[clickedSong].src;
  if (isPlay && clickedSong === playNum) {
    song[clickedSong].classList.add('song-active');
    playPauseButton.classList.remove('button_pause');
    isPlay = false;
    audio.pause();
    stopHandleTimingOfSong();
  } else {
    playNum = Number(event.target.dataset.numberOfSong);
    playPauseButton.classList.add('button_pause');
    isPlay = true;
    audio.play()
    handleTimingOfSong();
    song[playNum].classList.add('song-active', 'song-active-icon');
  }
  playNum = clickedSong;
  getInformationOfSong();
}

const playNextSong = () => {
  playNum < playList.length -1 ? playNum += 1 : playNum = 0;
  audio.src = playList[playNum].src;
  if (isPlay) {
    audio.play();
  } else {
    playPauseButton.classList.add('button_pause');
    audio.play();
    isPlay = !isPlay;
  }; 
  song[playNum].classList.add('song-active', 'song-active-icon');
  playNum === 0 ? song[playList.length - 1].classList.remove('song-active', 'song-active-icon') : song[playNum - 1].classList.remove('song-active', 'song-active-icon');
  getInformationOfSong();
  handleTimingOfSong();
}

const playPrevSong = () => {
  playNum > 0 ? playNum -= 1 : playNum = playList.length - 1;
  audio.src = playList[playNum].src;
  if (isPlay) {
    audio.play();
  } else {
    playPauseButton.classList.add('button_pause');
    audio.play();
    isPlay = !isPlay;
  }; 
  song[playNum].classList.add('song-active', 'song-active-icon');
  playNum === playList.length - 1 ? song[0].classList.remove('song-active', 'song-active-icon') : song[playNum + 1].classList.remove('song-active', 'song-active-icon');
  getInformationOfSong();
  handleTimingOfSong();
}

const onChangeStorage = (e) => {
  if (!e.detail.settings.player && isPlay) {
    togglePlayButton();
  }
}

playPauseButton.addEventListener('click', togglePlayButton);
playerSongs.addEventListener('click', playPressingSong);
nextButton.addEventListener('click', playNextSong);
previousButton.addEventListener('click', playPrevSong);
audio.addEventListener('ended', playNextSong);
playerProgress.addEventListener('click', changeStateOfProgress);
volumeButton.addEventListener('click', toggleVolumeButton);
storageEventTarget.addEventListener('settings', onChangeStorage)
inputVolume.addEventListener('input', changeVolume);
