const apiKey = '42a96677383d049abbfb41ac23dce6ae';
const request = require('request');

const getWeather = location => new Promise((resolve, reject) => {
  if (!location) {
    reject(new Error('No location provided'));
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=imperial&appid=${apiKey}`;
  request({
    url,
    json: true,
  }, (error, response, body) => {
    if (error) {
      reject(new Error('Something went wrong while fetching the weather.'));
    } else if (response.statusCode === 200) {
      resolve(body);
    }
  });
});

getWeather('New York').then((body) => {
  console.log(`It's ${body.main.temp} in ${body.name}!`);
}, (error) => {
  console.log(error);
});
