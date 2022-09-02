export const getTimeOfDayEn = () => {
  const hours = new Date().getHours();
  const timeOfDay = ['night', 'morning', 'afternoon', 'evening'];
  return timeOfDay[Math.trunc(hours / 6)];
}

export const getTimeOfDayRu = () => {
  const hours = new Date().getHours();
  const timeOfDay = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'];
  return timeOfDay[Math.trunc(hours / 6)];
}

export const getRandomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
