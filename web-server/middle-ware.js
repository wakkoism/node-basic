module.exports = {
  requireAuthentication: (request, response, next) => {
    console.log('Private route hit!');
    next();
  },
  logger: (request, response, next) => {
    console.log(`Request: ${request.method} ${request.originalUrl} at ${new Date().toString()}!`);
    next();
  },
};
