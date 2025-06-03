const fs = require('fs');
const fetch = require('node-fetch');

const API_KEY = process.env.GOOGLE_API_KEY;
const LAT = '-34.16218364232106';
const LON = '24.814381324944208';

const forecastUrl = `https://weather.googleapis.com/v1/forecast/days:lookup?key=${API_KEY}&location.latitude=${LAT}&location.longitude=${LON}&days=5&pageSize=5`;
const currentUrl = `https://weather.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}&location.latitude=${LAT}&location.longitude=${LON}`;

async function fetchAndSave() {
  try {
    const forecastRes = await fetch(forecastUrl);
    const currentRes = await fetch(currentUrl);

    const forecastData = await forecastRes.json();
    const currentData = await currentRes.json();

    fs.writeFileSync('./docs/forecast.json', JSON.stringify(forecastData, null, 2));
    fs.writeFileSync('./docs/current.json', JSON.stringify(currentData, null, 2));

    console.log('✅ Weather data saved.');
  } catch (err) {
    console.error('❌ Failed to fetch weather data:', err);
    process.exit(1); // Fails the GitHub Action
  }
}

fetchAndSave();