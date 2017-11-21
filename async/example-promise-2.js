const request = require('request');

const apiKey = '42a96677383d049abbfb41ac23dce6ae';

const getLocation = () => new Promise((resolve, reject) => {
  request({
    url: 'http://ipinfo.io',
    json: true,
  }, (error, response, body) => {
    if (error) {
      reject(new Error(error));
    } else {
      resolve(body.city);
    }
  });
});

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

getLocation()
  .then(location => getWeather(location))
  .then((currentWeather) => {
    console.log(`It's ${currentWeather.main.temp} in ${currentWeather.name}!`);
  })
  .catch((e) => {
    console.log(e);
  });
