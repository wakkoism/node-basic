const express = require('express');
const app = express();
const port = 3000;
const middleWare = {
  requireAuthentication: (request, response, next) => {
    console.log('Private route hit!');
    next();
  },
  logger: (request, response, next) => {
    console.log(`Request: ${request.method} ${request.originalUrl} at ${new Date().toString()}!`);
    next();
  },
};

app.use(middleWare.logger);

// About us
app.get('/about', middleWare.requireAuthentication, (request, response) => {
  response.send('About us');
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
