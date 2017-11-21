const request = require('request');

const url = 'http://ipinfo.io';

module.exports = () => new Promise((resolve, reject) => {
  request({
    url,
    json: true,
  }, (error, response, location) => {
    if (error) {
      reject(new Error(error));
    } else {
      resolve(location.city);
    }
  });
});
