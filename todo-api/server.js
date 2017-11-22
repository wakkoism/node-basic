const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('Todo API Root');
});

app.listen(port, () => {
  console.log(`Express lisening on port ${port}!`);
})
