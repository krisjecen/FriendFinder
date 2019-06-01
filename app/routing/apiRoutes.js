// load our data source(s)
// in this case it is our friends survey data

var surveyData = require("../data/friends");

module.exports = function(app) {
    // GET route to /api/friends
    // displays the JSON object containing all stored survey data
    app.get("/api/friends", function(req, res) {
        console.log("is this where it's reading?")
        res.json(surveyData);
    });

    // POST route to /api/friends
    // takes survey data entered on the survey page
    app.post("/api/friends", function(req, res) {
        surveyData.push(req.body);
        res.json(surveyData);
        console.log(surveyData);
    })
};