var assert = require('assert');

var similar = function(result, actual, threshold) {
  if (threshold === void 0) {
    threshold = 0.00001;
  }

  var value = parseFloat(/^\.test{content:(.*)}$/.exec(result.css)[1]);
  var message = 'Function: ' + value + ' is not similar to ' + actual + '.';
  assert(Math.abs(value - actual) < threshold, message);
};

var declares = function(result, key, value) {
  var rules = result.css.split(/[{};]/);
  var found = false;
  var values = [];

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i].split(':');

    if (rule.length == 2 && rule[0] == key) {
      values.push(rule[1]);

      if (rule[1] == value) {
        found = true;
        break;
      }
    }
  }

  var message = 'Rule "' + key + ': ' + value + '" could not be found.'
  message += ' Other values for this key: ' + values.join(', ');
  assert(found, message);
};

module.exports = {
  similar: similar,
  declares: declares,
};
