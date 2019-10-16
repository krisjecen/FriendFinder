'use strict';
// load our data source(s)
// in this case it is our friends survey data

var surveyData = require("../data/friends");

// i moved all of this function into the post request/response part below due to variable scope issues
// stretch goal: figure out the scope issues and clean this up
// function for calculating compatibility
function computeBestMatch(userScores){
    // get just the scores part of the user's data
    // console.log("within the function: " + userScores);
    // compare the scores with the scores of other users
    var matchDifference = 0;
    var lowestDifference = Infinity;
    var bestMatch = null;
    for (let p = 0; p < surveyData.length; p++) {
        matchDifference = 0;
        console.log(`currently we are comparing with: ${surveyData[p].name}`)
        for (let i = 0; i < userScores.length; i++) {
            // walk through the arrays and compare
            matchDifference += Math.abs(userScores[i] - surveyData[p].scores[i]);
        };
        console.log(`the match difference for ${surveyData[p].name} is ${matchDifference}.`)
        if (matchDifference < lowestDifference) {
            lowestDifference = matchDifference;
            bestMatch = surveyData[p].name;
            console.log(`the best match so far is ${bestMatch} with ${lowestDifference}.`)

        };
    };
    // return bestMatch;
}

//TODO: replace with Lodash sum
function sum(vals) {
  let tot = 0;
  for(let i = 0; i < vals.length; i++) {
    tot += vals[i]
  }
  return tot;
}

module.exports = function(app) {
    // GET route to /api/friends
    // displays the JSON object containing all stored survey data
    app.get("/api/friends", function(req, res) {
        res.json(surveyData);
    });

    // POST route to /api/friends
    // takes survey data entered on the survey page
    app.post("/api/friends", function(req, res) {
        // save our scores data so we can pass it into our compute "function"
        var userScores = req.body.scores;
        var matchDifference = 0;
        var lowestDifference = Infinity;
        var bestMatch = null;
        var bestMatchData = null;
        for (let p = 0; p < surveyData.length; p++) {
            matchDifference = 0;
            // console.log(`currently we are comparing with: ${surveyData[p].name}`)
            for (let i = 0; i < userScores.length; i++) {
                // walk through the arrays and compare
                matchDifference += Math.abs(userScores[i] - surveyData[p].scores[i]);
                // console.log(`current match difference: ${matchDifference}`)
            };
            // console.log(`the match difference for ${surveyData[p].name} is ${matchDifference}.`)
            if (matchDifference < lowestDifference) {
                lowestDifference = matchDifference;
                bestMatch = surveyData[p].name;
                bestMatchData = surveyData[p];
                // console.log(`the best match so far is ${bestMatch} with ${lowestDifference}.`)
    
            };
        };
        // console.log(`can i see ${bestMatch} out here?`)
        surveyData.push(req.body);
        res.json(bestMatchData);
        // console.log(surveyData);
    })
};
//just exposing these here for testing.
module.exports.sum = sum
