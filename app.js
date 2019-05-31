// require node modules
const path = require('path');
const express = require('express');

// create an instance of Express
const app = express();

// set the port of the application
// i will test using localhost port 8080 and Heroku will use the process.env.PORT
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// start the server so it will begin listening to client requests
app.listen(PORT, function(){
    // server side confirmation that the server has started
    console.log("Server listening on: http://localhost:" + PORT);
});