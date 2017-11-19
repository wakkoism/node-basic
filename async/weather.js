const apiKey = '42a96677383d049abbfb41ac23dce6ae';

const request = require('request');

module.exports = (location, callback) => {
  if (location === '') {
    console.log('No location provided');
    return;
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=imperial&appid=${apiKey}`;
  request({
    url,
    json: true,
  }, (error, response, body) => {
    if (error) {
      console.log('Something went wrong while fetching the weather.');
    } else if (response.statusCode === 200) {
      callback(body);
    }
  });
};
