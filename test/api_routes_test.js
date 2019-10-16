'use strict';

const assert = require('assert');
const api = require('../app/routing/apiRoutes')

describe("sum", function(){
  it("should sum some nums", function(){
    assert.equal(api.sum([4, 7, -3, 12]), 20)})
  it("is 0 for empty input", function(){
    assert.equal(api.sum([]), 0)})
})

describe("zip", function(){
  it("will pair up equal length arrays", function(){
    assert.deepEqual(
      api.zip(
        [1, 2, 3, 4],
        [5, 6, 7, 8]),
      [[1, 5], [2, 6], [3, 7], [4, 8]])})
})

const valProp = (x) => x.val
describe("minBy", function(){
  it("is undefined on empty array", function(){
    assert.strictEqual(
      api.minBy([], valProp),
      undefined)})
  it("is the only item in a singleton array", function(){
    let val = {}
    assert.equal(
      api.minBy([val], valProp),
      val)})
  it("is the value where the keyfunction is minimum", function(){
    let smallest = {val: -25}
    assert.equal(
      api.minBy([{val: 12}, {val: 0}, smallest, {val: 56}], valProp),
      smallest)})
})

describe("incompatibility", function(){
  it("should sum the diffs of the scores", function(){
    assert.equal(api.incompatibility(
      {scores: [1, 3, 5]},
      {scores: [0, 7, 3]}), 1 + 4 + 2)})
})

describe("bestMatch", function(){
  it("finds the best match", function(){
    let tooHigh = {name: "whee", scores: [6, 6, 6]}
    let tooLow  = {name: "whomp", scores: [0, 0, 0]}
    let justRight = {name: "George Orr", scores: [3, 3, 2]}
    let you = {name: "u", scores: [2, 3, 3]}

    assert.equal(
      api.bestMatch(you, [tooHigh, justRight, tooLow]),
      justRight)})
})
