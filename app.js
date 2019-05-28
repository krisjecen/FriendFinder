// require node modules
const path = require('path');
const express = require('express');

// create an instance of Express
const app = express();

// set the port of the application
// i will test using localhost port 8080 and Heroku will use the process.env.PORT
const PORT = process.env.PORT || 8080;

// start the server so it will begin listening to client requests
app.listen(PORT, function(){
    // server side confirmation that the server has started
    console.log("Server listening on: http://localhost:" + PORT);
});