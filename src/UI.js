import { doc } from 'prettier';
import { getServerData } from './serverData';
import {
  toggleCF,
  renderWeeklyForecast,
  renderMorningHours,
  renderDailyHours,
  renderEveningHours,
} from './renderWeatherData';

export default class UI {
  static loadPage() {
    getServerData('Tallinn');
    this.initEventListeners();
  }

  static initEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.search-icon');
    const toggleCelFahr = document.querySelector('.toggle-CF');
    const weeklyForecast = document.querySelector('.btn-daily');
    const hourlyForecast = document.querySelector('.btn-hourly');
    const navigator = document.querySelector('.navigator');
    const arrowLeft = document.querySelector('.left-arrow');
    const arrowRight = document.querySelector('.right-arrow');
    const leftDot = document.querySelector('.dot-left');
    const middleDot = document.querySelector('.dot-middle');
    const rightDot = document.querySelector('.dot-right');

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        getServerData(searchInput.value);
      }
    });

    searchIcon.addEventListener('click', () => {
      getServerData(searchInput.value);
    });

    toggleCelFahr.addEventListener('click', () => {
      toggleCF();
    });

    weeklyForecast.addEventListener('click', () => {
      hourlyForecast.classList.remove('active');
      weeklyForecast.classList.add('active');
      navigator.classList.add('hidden');
      renderWeeklyForecast();
    });

    hourlyForecast.addEventListener('click', () => {
      weeklyForecast.classList.remove('active');
      hourlyForecast.classList.add('active');
      navigator.classList.remove('hidden');
      renderMorningHours();
    });

    arrowLeft.addEventListener('click', () => {
      if (leftDot.classList.contains('dot-active')) {
        renderMorningHours();
        return;
      }

      if (middleDot.classList.contains('dot-active')) {
        middleDot.classList.remove('dot-active');
        leftDot.classList.add('dot-active');
        renderMorningHours();
        return;
      }

      if (rightDot.classList.contains('dot-active')) {
        rightDot.classList.remove('dot-active');
        middleDot.classList.add('dot-active');
        renderDailyHours();
        return;
      }
    });

    arrowRight.addEventListener('click', () => {
      if (leftDot.classList.contains('dot-active')) {
        leftDot.classList.remove('dot-active');
        middleDot.classList.add('dot-active');
        renderDailyHours();
        return;
      }

      if (middleDot.classList.contains('dot-active')) {
        middleDot.classList.remove('dot-active');
        rightDot.classList.add('dot-active');
        renderEveningHours();
        return;
      }
      if (rightDot.classList.contains('dot-active')) {
        renderEveningHours();
        return;
      }
    });

    leftDot.addEventListener('click', () => {
      leftDot.classList.add('dot-active');
      middleDot.classList.remove('dot-active');
      rightDot.classList.remove('dot-active');
      renderMorningHours();
    });

    middleDot.addEventListener('click', () => {
      leftDot.classList.remove('dot-active');
      middleDot.classList.add('dot-active');
      rightDot.classList.remove('dot-active');
      renderDailyHours();
    });

    rightDot.addEventListener('click', () => {
      leftDot.classList.remove('dot-active');
      middleDot.classList.remove('dot-active');
      rightDot.classList.add('dot-active');
      renderEveningHours();
    });
  }
}
