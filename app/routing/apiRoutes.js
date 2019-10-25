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

//Would normally use lodash for sum, zip, zipWith, and minBy.
//I wrote them here for illustration.
function sum(vals) {
  let tot = 0;
  for(let i = 0; i < vals.length; i++) {
    tot += vals[i]
  }
  return tot;
}
/* Pair of arrays -> Array of pairs
 * https://lodash.com/docs/#zip
 * Note: with my change to use zipWith, zip isn't needed here.
 * Leaving it for posterity.
 * Freeze the pair arrays for good measure, to make them like a
 * tuple in python.
 */
function zip(xs, ys) {
  return zipWith(xs, ys, (x, y) => Object.freeze([x, y])) 
}
/* Combines the pair of arrays using the combining function func
 * return_value[i] = func(xs[i], ys[i]) for all i indexes in the shorter
 * of xs and ys */
function zipWith(xs, ys, func) {
  let combined = []
  let len = Math.min(xs.length, ys.length)
  for(let i = 0; i < len; i++) {
    combined.push(func(xs[i], ys[i]))
  }
  return combined
}
/* Find the element in an array that minimizes a score function.
 * https://lodash.com/docs/#minBy
 */
function minBy(xs, scoreFunc){
  if (xs.length == 0) {
    return undefined
  } else if (xs.length == 1) {
    return xs[0]
  } else {
    let minVal = xs[0]
    let minKey = scoreFunc(minVal)
    for(let i = 1; i < xs.length; i++){
      const key = scoreFunc(xs[i])
      if(key < minKey) {
        minVal = xs[i]
        minKey = key
      }
    }
    return minVal
  }
}
function incompatibility(user1, user2){
  let diffs = zipWith(
    user1.scores, user2.scores,
    (score1, score2) => Math.abs(score1 - score2)
  );
  return sum(diffs);
}

function bestMatch(user, prospects){
  return minBy(prospects, function(prospect) {
    return incompatibility(user, prospect)})
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
        //should probably fix this in the client?
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
module.exports.zipWith = zipWith
