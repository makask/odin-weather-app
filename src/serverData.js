import { renderResults, getWeatherData } from './renderWeatherData';

// Get your API key from https://www.weatherapi.com/
const apiKey = 'Your API key here';

async function getServerData(location) {
  try {
    const serverData = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`
    );
    const data = await serverData.json();

    const weeklyForecast = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=no&alerts=no`
    );
    const weekData = await weeklyForecast.json();

    getWeatherData(data, weekData);
    renderResults();
  } catch (error) {
    console.log(error);
  }
}

export { getServerData };
