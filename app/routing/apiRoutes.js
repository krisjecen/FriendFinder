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

//TODO: replace with Lodash sum, zip, minBy
function sum(vals) {
  let tot = 0;
  for(let i = 0; i < vals.length; i++) {
    tot += vals[i]
  }
  return tot;
}
function zip(xs, ys) {
  let xyPairs = []
  let len = Math.min(xs.length, ys.length)
  for(let i = 0; i < len; i++) {
    xyPairs.push([xs[i], ys[i]])
  }
  return xyPairs
}
function minBy(xs, keyFn){
  if (xs.length == 0) {
    return undefined
  } else if (xs.length == 1) {
    return xs[0]
  } else {
    let minVal = xs[0]
    let minKey = keyFn(minVal)
    for(let i = 1; i < xs.length; i++){
      const key = keyFn(xs[i])
      if(key < minKey) {
        minVal = xs[i]
        minKey = key
      }
    }
    return minVal
  }
}
function incompatibility(user1, user2){
  let diffs = zip(user1.scores, user2.scores).map(([score1, score2]) =>
    Math.abs(score1 - score2));
  return sum(diffs);
}

function bestMatch(user, prospects){
  return minBy(prospects, (prospect) => incompatibility(user, prospect))
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
        var newUser = req.body;
        //convert strings from input to numbers
        newUser.scores = newUser.scores.map(Number);
        res.json(bestMatch(newUser, surveyData));
        surveyData.push(newUser);
    })
};

//just exposing these here for testing.
module.exports.sum = sum
module.exports.zip = zip
module.exports.minBy = minBy
module.exports.incompatibility = incompatibility
module.exports.bestMatch = bestMatch
