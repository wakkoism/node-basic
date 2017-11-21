const express = require('express');
const app = express();
const port = 3000;
const middleWare = require('./middle-ware.js')

app.use(middleWare.logger);

// About us
app.get('/about', middleWare.requireAuthentication, (request, response) => {
  response.send('About us');
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
