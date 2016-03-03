var path = require('path');
var assert = require('assert');
var Sassaby = require('sassaby');

var similar = function(result, actual, threshold) {
  if (threshold === void 0) {
    threshold = 0.00001;
  }

  var value = parseFloat(/^\.test{content:(.*)}$/.exec(result.css)[1]);
  var message = 'Function: ' + value + ' is not similar to ' + actual + '.';
  assert(Math.abs(value - actual) < threshold, message);
};

describe('math', function() {
  var file = path.resolve(__dirname, '../sass/math.scss');
  var sassaby = new Sassaby(file);

  describe('pow', function() {
    it('pow(3, 2) == 9', function() {
      sassaby.func('pow').calledWithArgs('3', '2').equals('9');
    });
    it('pow(4, 3/2) == 8', function() {
      sassaby.func('pow').calledWithArgs('4', '3/2').equals('8');
    });
    it('pow(144, 1/2) == 12', function() {
      sassaby.func('pow').calledWithArgs('144', '1/2').equals('12');
    });
    it('pow(-3, 2) == 9', function() {
      sassaby.func('pow').calledWithArgs('-3', '2').equals('9');
    });
    it('pow(3, -2) ~= 0.1111', function() {
      similar(sassaby.func('pow').calledWithArgs('3', '-2'), 0.1111);
    });
    it('pow(64, -1/2) == .125', function() {
      sassaby.func('pow').calledWithArgs('64', '-1/2').equals('.125');
    });
    it('pow(12, 3.4) ~= 4668.91789313', function() {
      similar(sassaby.func('pow').calledWithArgs('12', '3.4'), 4668.91789313);
    });
    it('pow(3px, 2.4) throws', function() {
      assert.throws(function () {
        sassaby.func('pow').calledWithArgs('3px', '2');
      });
    });
  });

  describe('ln', function() {
    it('ln(1) == 0', function() {
      sassaby.func('ln').calledWithArgs('1').equals('0');
    });
    it('ln(0.1) ~= -2.3025850929940455', function() {
      similar(sassaby.func('ln').calledWithArgs('0.1'), -2.3025850929940455);
    });
    it('ln(123456789) ~= 18.63140176616802', function() {
      similar(sassaby.func('ln').calledWithArgs('123456789'), 18.63140176616802);
    });
  });

  describe('sin', function() {
    it('sin(0) == 0', function() {
      sassaby.func('sin').calledWithArgs('0').equals('0');
    });
    it('sin($PI) == 0', function() {
      sassaby.func('sin').calledWithArgs('$PI').equals('0');
    });
    it('sin(2 * $PI) == 0', function() {
      sassaby.func('sin').calledWithArgs('2 * $PI').equals('0');
    });
    it('sin(123456789 * $PI) ~= 0', function() {
      similar(sassaby.func('sin').calledWithArgs('123456789 * $PI'), 0);
    });
    it('sin(-$PI) == 0', function() {
      sassaby.func('sin').calledWithArgs('-$PI').equals('0');
    });
    it('sin(1/2 * $PI) == 1', function() {
      sassaby.func('sin').calledWithArgs('1/2 * $PI').equals('1');
    });
    it('sin(3/2 * $PI) == -1', function() {
      sassaby.func('sin').calledWithArgs('3/2 * $PI').equals('-1');
    });
    it('sin(1) ~= 0.8414709848078965', function() {
      similar(sassaby.func('sin').calledWithArgs('1'), 0.8414709848078965);
    });
    it('sin(2) ~= 0.9092974268256817', function() {
      similar(sassaby.func('sin').calledWithArgs('2'), 0.9092974268256817);
    });
  });
});
