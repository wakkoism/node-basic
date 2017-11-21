
const weather = require('./weather.js');
const location = require('./location.js');
const args = require('yargs');


const myArgs = args
  .options('location', {
    alias: 'l',
    type: 'string',
    description: 'Enter the city',
  })
  .help('help')
  .argv;
{
  const locationArg = myArgs.location;

  if (!locationArg) {
    location()
      .then(city => weather(city))
      .then((weatherResponse) => {
        console.log(`It's ${weatherResponse.main.temp} in ${weatherResponse.name}!`);
      });
  } else {
    weather(locationArg)
      .then((body) => {
        console.log(`It's ${body.main.temp} in ${body.name}!`);
      });
  }
}
