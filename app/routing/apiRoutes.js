// load our data source(s)
// in this case it is our friends survey data

var surveyData = require("../data/friends");


module.exports = function(app) {
    // GET route to /api/friends
    // displays the JSON object containing all stored survey data
    app.get("/api/friends", function(req, res) {
        res.json(surveyData);
    });

    // POST route to /api/friends
    // takes survey data entered on the survey page
};