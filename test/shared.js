var assert = require('assert');

var similar = function(result, actual, threshold) {
  if (threshold === void 0) {
    threshold = 0.00001;
  }

  var value = parseFloat(/^\.test{content:(.*)}$/.exec(result.css)[1]);
  var message = 'Function: ' + value + ' is not similar to ' + actual + '.';
  assert(Math.abs(value - actual) < threshold, message);
};

module.exports = {
  similar: similar
};
