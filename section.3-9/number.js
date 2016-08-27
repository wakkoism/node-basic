"use strict";
// Test grade for three test.
var test = [89, 87, 99];
/**
 * Get avereage grade.
 *
 * @param {Object} data
 *   The array of test scores.
 */
function getAverage(data) {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total += data[i];
  }
  return Math.round(total / data.length * 100) / 100 ;
}
// Output the test average
console.log('The average score is ' + getAverage(test) + '%');

