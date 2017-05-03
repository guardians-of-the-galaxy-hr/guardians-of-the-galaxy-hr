const express = require('express');
const app = express();

app.use(express.static(__dirname + '/client'));

console.log(__dirname + '/client');

app.listen(process.env.port || 3000, () => {
  console.log('Server running on port: ' + 3000);
});
