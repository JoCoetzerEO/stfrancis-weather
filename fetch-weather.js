const fetch = require('node-fetch');
const fs = require('fs');

const endpoints = [
  {
    url: 'https://weather.googleapis.com/v1/forecast/days:lookup?key=AIzaSyAgUuPPnV4NxZylmPvEWBEr85gsAdxl-WY&location.latitude=-34.16218364232106&location.longitude=24.814381324944208&days=5&pageSize=5',
    filename: 'forecast.json'
  },
  {
    url: 'https://weather.googleapis.com/v1/currentConditions:lookup?key=AIzaSyAgUuPPnV4NxZylmPvEWBEr85gsAdxl-WY&location.latitude=-34.16218364232106&location.longitude=24.814381324944208',
    filename: 'current.json'
  }
];

(async () => {
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint.url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      fs.writeFileSync(`docs/${endpoint.filename}`, JSON.stringify(data, null, 2));
      console.log(`Saved ${endpoint.filename}`);
    } catch (error) {
      console.error(`Error fetching ${endpoint.url}:`, error);
    }
  }
})();
