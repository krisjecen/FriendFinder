'use strict';

const assert = require('assert');
const api = require('../app/routing/apiRoutes')

describe("sum", function(){
  it("should sum some nums", function(){
    assert.equal(api.sum([4, 7, -3, 12]), 20)})
  it("is 0 for empty input", function(){
    assert(api.sum([]) == 0)})
})

describe("zip", function(){
  it("will pair up equal length arrays", function(){
    assert.deepEqual(
      api.zip(
        [1, 2, 3, 4],
        [5, 6, 7, 8]
      ), [[1, 5], [2, 6], [3, 7], [4, 8]])})
})

describe("incompatibility", function(){
  it("should sum the diffs of the scores", function(){
    assert(api.incompatibility(
      {scores: [1, 3, 5]},
      {scores: [0, 7, 3]}) == 1 + 4 + 2)})
})
