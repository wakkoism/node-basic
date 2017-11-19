
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
  let locationArg = myArgs.location;
  if (!locationArg) {
    location((error, response, body) => {
      if (!error) {
        locationArg = body.city;
        weather(locationArg, (body) => {
          console.log(`It's ${body.main.temp} in ${body.name}!`);
        });
      }
    });
  } else {
    weather(locationArg, (body) => {
      console.log(`It's ${body.main.temp} in ${body.name}!`);
    });
  }
}
