const request = require('request');

const apiKey = '42a96677383d049abbfb41ac23dce6ae';
const url = `http://api.openweathermap.org/data/2.5/weather?q=Orlando&units=imperial&appid=${apiKey}`;

request({
  url,
  json: true,
}, (error, response, body) => {
  if (error) {
    console.log('Uneable to reach weather');
  } else {
    // Print out the temperature.
    console.log(`The temperature in ${body.name} is ${body.main.temp} degrees ferenheight.`);
  }
});
