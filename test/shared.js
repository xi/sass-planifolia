var path = require('path');
var sass = require('sass');
var assert = require('assert');

var Renderer = function(head) {
  this.head = head;
}

Renderer.prototype.block = function(input) {
  var result = sass.compileString(
    this.head + ' .test{' + input + '}',
    {
      style: 'compressed',
      loadPaths: [path.resolve(__dirname, '../sass/')],
    },
  );
  return result.css.slice(".test".length);
};

Renderer.prototype.value = function(input) {
  return this.block('content:' + input).slice("{content:".length, -("}".length));
};

var similar = function(result, actual, threshold) {
  if (threshold === void 0) {
    threshold = 0.00001;
  }

  var value = parseFloat(result);
  var message = 'Function: ' + value + ' is not similar to ' + actual + '.';
  assert(Math.abs(value - actual) < threshold, message);
};

var declares = function(result, key, value) {
  var rules = result.split(/[{};]/);
  var found = false;
  var values = [];

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i].split(':').map(x => x.trim());

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
  Renderer: Renderer,
  similar: similar,
  declares: declares,
};
