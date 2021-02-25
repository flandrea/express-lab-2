const express = require('express');
const routes = require('./cartitems.js');

const app = express();

app.use(express.json());

const port = 3000;

app.use('/', routes);

app.listen(port, () => console.log(`Listening on port: ${port}.`));
    
console.log("http://localhost:" + port + "/routes");