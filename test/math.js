var path = require('path');
var assert = require('assert');
var Sassaby = require('sassaby');
var shared = require('./shared');

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
    it('pow(0, 1/2) == 0', function() {
      sassaby.func('pow').calledWithArgs('0', '1/2').equals('0');
    });
    it('pow(-3, 2) == 9', function() {
      sassaby.func('pow').calledWithArgs('-3', '2').equals('9');
    });
    it('pow(-3, 3) == -27', function() {
      sassaby.func('pow').calledWithArgs('-3', '3').equals('-27');
    });
    it('pow(3, -2)', function() {
      shared.similar(sassaby.func('pow').calledWithArgs('3', '-2'), Math.pow(3, -2));
    });
    it('pow(64, -1/2) == .125', function() {
      sassaby.func('pow').calledWithArgs('64', '-1/2').equals('.125');
    });
    it('pow(12, 3.4)', function() {
      shared.similar(sassaby.func('pow').calledWithArgs('12', '3.4'), Math.pow(12, 3.4));
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
    it('ln(0.1)', function() {
      shared.similar(sassaby.func('ln').calledWithArgs('0.1'), Math.log(0.1));
    });
    it('ln(123456789)', function() {
      shared.similar(sassaby.func('ln').calledWithArgs('123456789'), Math.log(123456789));
    });
  });

  describe('sin', function() {
    it('sin(0) == 0', function() {
      sassaby.func('sin').calledWithArgs('0').equals('0');
    });
    it('sin($pi) == 0', function() {
      sassaby.func('sin').calledWithArgs('$pi').equals('0');
    });
    it('sin(2 * $pi) == 0', function() {
      sassaby.func('sin').calledWithArgs('2 * $pi').equals('0');
    });
    it('sin(123456789 * $pi) ~= 0', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('123456789 * $pi'), 0);
    });
    it('sin(-$pi) == 0', function() {
      sassaby.func('sin').calledWithArgs('-$pi').equals('0');
    });
    it('sin(1/2 * $pi) == 1', function() {
      sassaby.func('sin').calledWithArgs('1/2 * $pi').equals('1');
    });
    it('sin(3/2 * $pi) == -1', function() {
      sassaby.func('sin').calledWithArgs('3/2 * $pi').equals('-1');
    });
    it('sin(1)', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('1'), Math.sin(1));
    });
    it('sin(2)', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('2'), Math.sin(2));
    });
  });
});
