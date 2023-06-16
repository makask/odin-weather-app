import { doc } from 'prettier';
import DateFormatter from './DateFormatter';

let data;
let weekData;
let celsius = true;

const temperature = document.querySelector('.temperature');
const feelsLike = document.querySelector('.feels-like');
const windSpeed = document.querySelector('.wind-speed');
const btnDaily = document.querySelector('.btn-daily');
const btnHourly = document.querySelector('.btn-hourly');
const leftDot = document.querySelector('.dot-left');
const middleDot = document.querySelector('.dot-middle');
const rightDot = document.querySelector('.dot-right');

function getWeatherData(serverData, week) {
  data = serverData;
  weekData = week;
}

function renderResults() {
  renderLeftSide();
  renderRightSide();
  renderWeeklyForecast();
}

function renderLeftSide() {
  document.querySelector('.current-weather').textContent =
    data.current.condition.text;
  document.querySelector('.location').textContent = data.location.name;
  document.querySelector('.region').textContent = `${data.location.region},`;
  document.querySelector('.country').textContent = data.location.country;
  document.querySelector('.day').textContent = `${DateFormatter.getWeekDay(
    data.location.localtime
  )},`;
  document.querySelector('.date').textContent = `${DateFormatter.formatDate(
    data.location.localtime
  )},`;
  document.querySelector(
    '.localtime'
  ).textContent = `${DateFormatter.formatTime(data.location.localtime)}`;
  temperature.textContent = `${data.current.temp_c} °C`;
}

function renderRightSide() {
  feelsLike.textContent = `${data.current.feelslike_c} °C`;
  document.querySelector(
    '.humidity'
  ).textContent = `${data.current.humidity} %`;
  document.querySelector(
    '.chance-of-rain'
  ).textContent = `${weekData.forecast.forecastday[0].day.daily_chance_of_rain} %`;
  document.querySelector(
    '.chance-of-snow'
  ).textContent = `${weekData.forecast.forecastday[0].day.daily_chance_of_snow} %`;
  windSpeed.textContent = `${data.current.wind_kph} km/h`;
}

function toggleCF() {
  const cf = document.querySelector('.toggle-CF');
  if (celsius) {
    celsius = false;
    cf.textContent = 'Display Celsius';
    temperature.textContent = `${data.current.temp_f} °F`;
    feelsLike.textContent = `${data.current.feelslike_f} °F`;
    windSpeed.textContent = `${data.current.wind_mph} mph`;
    if (btnDaily.classList.contains('active')) {
      renderWeeklyForecast();
    }
    if (
      btnHourly.classList.contains('active') &&
      leftDot.classList.contains('dot-active')
    ) {
      renderMorningHours();
    }
    if (
      btnHourly.classList.contains('active') &&
      middleDot.classList.contains('dot-active')
    ) {
      renderDailyHours();
    }

    if (
      btnHourly.classList.contains('active') &&
      rightDot.classList.contains('dot-active')
    ) {
      renderEveningHours();
    }

    return;
  }
  if (!celsius) {
    celsius = true;
    cf.textContent = 'Display Fahrenheit';
    temperature.textContent = `${data.current.temp_c} °C`;
    feelsLike.textContent = `${data.current.feelslike_c} °C`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    if (btnDaily.classList.contains('active')) {
      renderWeeklyForecast();
    }
    if (
      btnHourly.classList.contains('active') &&
      leftDot.classList.contains('dot-active')
    ) {
      renderMorningHours();
    }

    if (
      btnHourly.classList.contains('active') &&
      middleDot.classList.contains('dot-active')
    ) {
      renderDailyHours();
    }

    if (
      btnHourly.classList.contains('active') &&
      rightDot.classList.contains('dot-active')
    ) {
      renderEveningHours();
    }

    return;
  }
}

function renderWeeklyForecast() {
  let container = document.querySelector('.daily-weekly-forecast-container');
  let daysArray = weekData.forecast.forecastday;
  removeAllChildNodes(container);
  for (let i = 0; i < daysArray.length; i++) {
    if (celsius) {
      container.appendChild(
        createDayElement(
          DateFormatter.getWeekDay(daysArray[i].date),
          daysArray[i].day.maxtemp_c + ' °C',
          daysArray[i].day.avgtemp_c + ' °C'
        )
      );
    }
    if (!celsius) {
      container.appendChild(
        createDayElement(
          DateFormatter.getWeekDay(daysArray[i].date),
          daysArray[i].day.maxtemp_f + ' °F',
          daysArray[i].day.avgtemp_f + ' °F'
        )
      );
    }

    if (
      btnHourly.classList.contains('active') &&
      middleDot.classList.contains('dot-active')
    ) {
      renderDailyHours();
    }
  }
}

function renderMorningHours() {
  let container = document.querySelector('.daily-weekly-forecast-container');
  let hoursArray = weekData.forecast.forecastday[0].hour;
  removeAllChildNodes(container);
  //console.log(hoursArray[0].time);
  for (let i = 0; i < 8; i++) {
    if (celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_c + ' °C'
        )
      );
    }
    if (!celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_f + ' °F'
        )
      );
    }
  }
}

function renderDailyHours() {
  let container = document.querySelector('.daily-weekly-forecast-container');
  let hoursArray = weekData.forecast.forecastday[0].hour;
  removeAllChildNodes(container);
  for (let i = 8; i < 16; i++) {
    if (celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_c + ' °C'
        )
      );
    }
    if (!celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_f + ' °F'
        )
      );
    }
  }
}

function renderEveningHours() {
  let container = document.querySelector('.daily-weekly-forecast-container');
  let hoursArray = weekData.forecast.forecastday[0].hour;
  removeAllChildNodes(container);
  for (let i = 16; i < 24; i++) {
    if (celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_c + ' °C'
        )
      );
    }
    if (!celsius) {
      container.appendChild(
        createHourElement(
          DateFormatter.formatHour(hoursArray[i].time),
          hoursArray[i].temp_f + ' °F'
        )
      );
    }
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createDayElement(day, highest, average) {
  const dayElement = document.createElement('div');
  dayElement.classList.add('weekday-element');

  const dayName = document.createElement('h2');
  dayName.classList.add('day-name');
  dayName.textContent = `${day}`;

  const dayTemp = document.createElement('h1');
  dayTemp.classList.add('weekday-highest-temperature');
  dayTemp.textContent = `${highest}`;

  const dayAverageTemp = document.createElement('p');
  dayAverageTemp.classList.add('day-average-temperature');
  dayAverageTemp.textContent = `${average}`;

  dayElement.append(dayName, dayTemp, dayAverageTemp);

  return dayElement;
}

function createHourElement(time, temperature) {
  const hourElement = document.createElement('div');
  hourElement.classList.add('hour-element');

  const timeElement = document.createElement('p');
  timeElement.classList.add('time-hour');
  timeElement.textContent = `${time}`;

  const hourTemperature = document.createElement('h1');
  hourTemperature.classList.add('hour-temperature');
  hourTemperature.textContent = `${temperature}`;

  hourElement.append(timeElement, hourTemperature);

  return hourElement;
}

export {
  renderResults,
  getWeatherData,
  toggleCF,
  renderWeeklyForecast,
  renderMorningHours,
  renderDailyHours,
  renderEveningHours,
};
