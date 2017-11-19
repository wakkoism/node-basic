const request = require('request');

const url = 'http://ipinfo.io';

module.exports = (callback) => {
  request({
    url,
    json: true,
  }, callback);
};
