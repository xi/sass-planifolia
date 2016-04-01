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
    it('ln(12345678.9)', function() {
      shared.similar(sassaby.func('ln').calledWithArgs('12345678.9'), Math.log(12345678.9));
    });
  });

  describe('sin', function() {
    it('sin(0) == 0', function() {
      sassaby.func('sin').calledWithArgs('0').equals('0');
    });
    it('sin(pi()) == 0', function() {
      sassaby.func('sin').calledWithArgs('pi()').equals('0');
    });
    it('sin(2 * pi()) == 0', function() {
      sassaby.func('sin').calledWithArgs('2 * pi()').equals('0');
    });
    it('sin(123456789 * pi()) ~= 0', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('123456789 * pi()'), 0);
    });
    it('sin(-1 * pi()) == 0', function() {
      sassaby.func('sin').calledWithArgs('-1 * pi()').equals('0');
    });
    it('sin(1/2 * pi()) == 1', function() {
      sassaby.func('sin').calledWithArgs('1/2 * pi()').equals('1');
    });
    it('sin(3/2 * pi()) == -1', function() {
      sassaby.func('sin').calledWithArgs('3/2 * pi()').equals('-1');
    });
    it('sin(1)', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('1'), Math.sin(1));
    });
    it('sin(2)', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('2'), Math.sin(2));
    });
    it('sin(-1)', function() {
      shared.similar(sassaby.func('sin').calledWithArgs('-1'), Math.sin(-1));
    });
    it('sin(270deg) == -1', function() {
      sassaby.func('sin').calledWithArgs('270deg').equals('-1');
    });
  });

  describe('cos', function() {
    it('cos(0) == 1', function() {
      sassaby.func('cos').calledWithArgs('0').equals('1');
    });
    it('cos(1)', function() {
      shared.similar(sassaby.func('cos').calledWithArgs('1'), Math.cos(1));
    });
    it('cos(-2)', function() {
      shared.similar(sassaby.func('cos').calledWithArgs('-2'), Math.cos(-2));
    });
  });

  describe('tan', function() {
    it('tan(0) == 0', function() {
      sassaby.func('tan').calledWithArgs('0').equals('0');
    });
    it('tan(1)', function() {
      shared.similar(sassaby.func('tan').calledWithArgs('1'), Math.tan(1));
    });
    it('tan(-1)', function() {
      shared.similar(sassaby.func('tan').calledWithArgs('-1'), Math.tan(-1));
    });
    it('tan(12345678.9)', function() {
      shared.similar(sassaby.func('tan').calledWithArgs('12345678.9'), Math.tan(12345678.9));
    });
  });

  describe('asin', function() {
    it('asin(0) == 0', function() {
      sassaby.func('asin').calledWithArgs('0').equals('0');
    });
    it('asin(0.1)', function() {
      shared.similar(sassaby.func('asin').calledWithArgs('0.1'), Math.asin(0.1));
    });
    it('asin(0.5)', function() {
      shared.similar(sassaby.func('asin').calledWithArgs('0.5'), Math.asin(0.5));
    });
    it('asin(0.9)', function() {
      shared.similar(sassaby.func('asin').calledWithArgs('0.9'), Math.asin(0.9));
    });
    it('asin(1)', function() {
      shared.similar(sassaby.func('asin').calledWithArgs('1'), Math.asin(1));
    });
    it('asin(-0.5)', function() {
      shared.similar(sassaby.func('asin').calledWithArgs('-0.5'), Math.asin(-0.5));
    });
    it('asin(2) throws', function() {
      assert.throws(function () {
        sassaby.func('asin').calledWithArgs('2');
      });
    });
  });

  describe('acos', function() {
    it('acos(1) == 0', function() {
      sassaby.func('acos').calledWithArgs('1').equals('0');
    });
    it('acos(0.5)', function() {
      shared.similar(sassaby.func('acos').calledWithArgs('0.5'), Math.acos(0.5));
    });
    it('acos(-0.5)', function() {
      shared.similar(sassaby.func('acos').calledWithArgs('-0.5'), Math.acos(-0.5));
    });
    it('acos(2) throws', function() {
      assert.throws(function () {
        sassaby.func('asin').calledWithArgs('2');
      });
    });
  });

  describe('atan', function() {
    it('atan(0) == 0', function() {
      sassaby.func('atan').calledWithArgs('0').equals('0');
    });
    it('atan(0.5)', function() {
      shared.similar(sassaby.func('atan').calledWithArgs('0.5'), Math.atan(0.5));
    });
    it('atan(-0.5)', function() {
      shared.similar(sassaby.func('atan').calledWithArgs('-0.5'), Math.atan(-0.5));
    });
    it('atan(12345678.9)', function() {
      shared.similar(sassaby.func('atan').calledWithArgs('12345678.9'), Math.atan(12345678.9));
    });
  });

  describe('atan2', function() {
    it('atan2(0, 1) == 0', function() {
      sassaby.func('atan2').calledWithArgs('0', '1').equals('0');
    });
    it('atan2(1, 0)', function() {
      shared.similar(sassaby.func('atan2').calledWithArgs('1', '0'), Math.atan2(1, 0));
    });
    it('atan2(0, -1)', function() {
      shared.similar(sassaby.func('atan2').calledWithArgs('0', '-1'), Math.atan2(0, -1));
    });
    it('atan2(-1, 0)', function() {
      shared.similar(sassaby.func('atan2').calledWithArgs('-1', '0'), Math.atan2(-1, 0));
    });
    it('atan2(2, 0)', function() {
      shared.similar(sassaby.func('atan2').calledWithArgs('2', '0'), Math.atan2(2, 0));
    });
    it('atan2(-1, -1)', function() {
      shared.similar(sassaby.func('atan2').calledWithArgs('-1', '-1'), Math.atan2(-1, -1));
    });
  });

  describe('bezier', function() {
    it('bezier((0 0, 1 1), 0.5) == .5 .5', function() {
      sassaby.func('bezier').calledWithArgs('(0 0, 1 1)', '0.5').equals('.5 .5');
    });
    it('bezier((0 0, .2 .2, 1 1), 0.5) == .35 .35', function() {
      sassaby.func('bezier').calledWithArgs('(0 0, .2 .2, 1 1)', '0.5').equals('.35 .35');
    });
    it('bezier((0 0, .5 .2, 1 1), 0.5) == .5 .35', function() {
      sassaby.func('bezier').calledWithArgs('(0 0, .5 .2, 1 1)', '0.5').equals('.5 .35');
    });
    it('bezier((0, 1), 0.5) == .5', function() {
      sassaby.func('bezier').calledWithArgs('(0, 1)', '0.5').equals('.5');
    });
    it('bezier((0, 2), 0.5) == 1', function() {
      sassaby.func('bezier').calledWithArgs('(0, 2)', '0.5').equals('1');
    });
    it('bezier((0 0 0, 1 1 1), 0.5) == .5 .5 .5', function() {
      sassaby.func('bezier').calledWithArgs('(0 0 0, 1 1 1)', '0.5').equals('.5 .5 .5');
    });
  });
});
