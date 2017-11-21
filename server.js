const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const middleWare = require('./web-server/middle-ware.js')

app.use(middleWare.logger);

// About us
app.get('/about', middleWare.requireAuthentication, (request, response) => {
  response.send('About us');
})

app.use(express.static(__dirname + '/web-server/public'));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
