var assert = require('assert');
var shared = require('./shared');

describe('math', function() {
  var renderer = new shared.Renderer('@import "math";');

  describe('pow', function() {
    it('pow(3, 2) == 9', function() {
      assert.strictEqual(renderer.value('pow(3, 2)'), '9')
    });
    it('pow(4, 3/2) == 8', function() {
      assert.strictEqual(renderer.value('pow(4, 3/2)'), '8')
    });
    it('pow(144, 1/2) == 12', function() {
      assert.strictEqual(renderer.value('pow(144, 1/2)'), '12')
    });
    it('pow(0, 1/2) == 0', function() {
      assert.strictEqual(renderer.value('pow(0, 1/2)'), '0')
    });
    it('pow(-3, 2) == 9', function() {
      assert.strictEqual(renderer.value('pow(-3, 2)'), '9')
    });
    it('pow(-3, 3) == -27', function() {
      assert.strictEqual(renderer.value('pow(-3, 3)'), '-27')
    });
    it('pow(3, -2)', function() {
      shared.similar(renderer.value('pow(3, -2)'), Math.pow(3, -2));
    });
    it('pow(64, -1/2) == 0.125', function() {
      assert.strictEqual(renderer.value('pow(64, -1/2)'), '0.125')
    });
    it('pow(1200, 3.4)', function() {
      shared.similar(renderer.value('pow(1200, 3.4)'), Math.pow(1200, 3.4), 0.1);
    });
    it('pow(1200.3, 3.4)', function() {
      shared.similar(renderer.value('pow(1200.3, 3.4)'), Math.pow(1200.3, 3.4), 0.1);
    });
    it('pow(3px, 2.4) throws', function() {
      assert.throws(function () {
        renderer.value('pow(3px, 2)');
      });
    });
    it('pow(3.5, 0) == 1', function() {
      assert.strictEqual(renderer.value('pow(3.5, 0)'), '1')
    });
    it('pow(0, 3.5) == 0', function() {
      assert.strictEqual(renderer.value('pow(0, 3.5)'), '0')
    });
    it('pow(0, 0) == 1', function() {
      assert.strictEqual(renderer.value('pow(0, 0)'), '1')
    });
  });

  describe('log', function() {
    it('log(1) == 0', function() {
      assert.strictEqual(renderer.value('log(1)'), '0')
    });
    it('log(0.1)', function() {
      shared.similar(renderer.value('log(0.1)'), Math.log(0.1));
    });
    it('log(123456789)', function() {
      shared.similar(renderer.value('log(123456789)'), Math.log(123456789));
    });
    it('log(12345678.9)', function() {
      shared.similar(renderer.value('log(12345678.9)'), Math.log(12345678.9));
    });
  });

  describe('sin', function() {
    it('sin(0) == 0', function() {
      assert.strictEqual(renderer.value('sin(0)'), '0')
    });
    it('sin(pi()) == 0', function() {
      assert.strictEqual(renderer.value('sin(pi())'), '0');
    });
    it('sin(2 * pi()) == 0', function() {
      assert.strictEqual(renderer.value('sin(2 * pi())'), '0');
    });
    it('sin(123456789 * pi()) ~= 0', function() {
      shared.similar(renderer.value('sin(123456789 * pi())'), 0);
    });
    it('sin(-1 * pi()) == 0', function() {
      assert.strictEqual(renderer.value('sin(-1 * pi())'), '0');
    });
    it('sin(1/2 * pi()) == 1', function() {
      assert.strictEqual(renderer.value('sin(1/2 * pi())'), '1');
    });
    it('sin(3/2 * pi()) == -1', function() {
      assert.strictEqual(renderer.value('sin(3/2 * pi())'), '-1');
    });
    it('sin(1)', function() {
      shared.similar(renderer.value('sin(1)'), Math.sin(1));
    });
    it('sin(2)', function() {
      shared.similar(renderer.value('sin(2)'), Math.sin(2));
    });
    it('sin(-1)', function() {
      shared.similar(renderer.value('sin(-1)'), Math.sin(-1));
    });
    it('sin(270deg) == -1', function() {
      assert.strictEqual(renderer.value('sin(270deg)'), '-1')
    });
  });

  describe('cos', function() {
    it('cos(0) == 1', function() {
      assert.strictEqual(renderer.value('cos(0)'), '1')
    });
    it('cos(1)', function() {
      shared.similar(renderer.value('cos(1)'), Math.cos(1));
    });
    it('cos(-2)', function() {
      shared.similar(renderer.value('cos(-2)'), Math.cos(-2));
    });
    it('cos(270deg) == 0', function() {
      assert.strictEqual(renderer.value('cos(270deg)'), '0')
    });
  });

  describe('tan', function() {
    it('tan(0) == 0', function() {
      assert.strictEqual(renderer.value('tan(0)'), '0')
    });
    it('tan(1)', function() {
      shared.similar(renderer.value('tan(1)'), Math.tan(1));
    });
    it('tan(-1)', function() {
      shared.similar(renderer.value('tan(-1)'), Math.tan(-1));
    });
    it('tan(12345678.9)', function() {
      shared.similar(renderer.value('tan(12345678.9)'), Math.tan(12345678.9));
    });
    it('tan(45deg) == tan(pi() / 4)', function() {
      shared.similar(renderer.value('tan(45deg)'), Math.tan(Math.PI / 4));
    });
  });

  describe('asin', function() {
    it('asin(0) == 0', function() {
      assert.strictEqual(renderer.value('asin(0)'), '0')
    });
    it('asin(0.1)', function() {
      shared.similar(renderer.value('asin(0.1)'), Math.asin(0.1));
    });
    it('asin(0.5)', function() {
      shared.similar(renderer.value('asin(0.5)'), Math.asin(0.5));
    });
    it('asin(0.9)', function() {
      shared.similar(renderer.value('asin(0.9)'), Math.asin(0.9));
    });
    it('asin(1)', function() {
      shared.similar(renderer.value('asin(1)'), Math.asin(1));
    });
    it('asin(-0.5)', function() {
      shared.similar(renderer.value('asin(-0.5)'), Math.asin(-0.5));
    });
    it('asin(2) throws', function() {
      assert.throws(function () {
        renderer.value('asin(2)');
      });
    });
  });

  describe('acos', function() {
    it('acos(1) == 0', function() {
      assert.strictEqual(renderer.value('acos(1)'), '0')
    });
    it('acos(0.5)', function() {
      shared.similar(renderer.value('acos(0.5)'), Math.acos(0.5));
    });
    it('acos(-0.5)', function() {
      shared.similar(renderer.value('acos(-0.5)'), Math.acos(-0.5));
    });
    it('acos(2) throws', function() {
      assert.throws(function () {
        renderer.value('asin(2)');
      });
    });
  });

  describe('atan', function() {
    it('atan(0) == 0', function() {
      assert.strictEqual(renderer.value('atan(0)'), '0')
    });
    it('atan(0.5)', function() {
      shared.similar(renderer.value('atan(0.5)'), Math.atan(0.5));
    });
    it('atan(-0.5)', function() {
      shared.similar(renderer.value('atan(-0.5)'), Math.atan(-0.5));
    });
    it('atan(12345678.9)', function() {
      shared.similar(renderer.value('atan(12345678.9)'), Math.atan(12345678.9));
    });
  });

  describe('atan2', function() {
    it('atan2(0, 1) == 0', function() {
      assert.strictEqual(renderer.value('atan2(0, 1)'), '0')
    });
    it('atan2(1, 0)', function() {
      shared.similar(renderer.value('atan2(1, 0)'), Math.atan2(1, 0));
    });
    it('atan2(0, -1)', function() {
      shared.similar(renderer.value('atan2(0, -1)'), Math.atan2(0, -1));
    });
    it('atan2(-1, 0)', function() {
      shared.similar(renderer.value('atan2(-1, 0)'), Math.atan2(-1, 0));
    });
    it('atan2(2, 0)', function() {
      shared.similar(renderer.value('atan2(2, 0)'), Math.atan2(2, 0));
    });
    it('atan2(-1, -1)', function() {
      shared.similar(renderer.value('atan2(-1, -1)'), Math.atan2(-1, -1));
    });
  });

  describe('bezier', function() {
    it('bezier((0 0, 1 1), 0.5) == 0.5 0.5', function() {
      assert.strictEqual(renderer.value('bezier((0 0, 1 1), 0.5)'), '0.5 0.5');
    });
    it('bezier((0 0, 0.2 0.2, 1 1), 0.5) == 0.35 0.35', function() {
      assert.strictEqual(renderer.value('bezier((0 0, 0.2 0.2, 1 1), 0.5)'), '0.35 0.35');
    });
    it('bezier((0 0, 0.5 0.2, 1 1), 0.5) == 0.5 0.35', function() {
      assert.strictEqual(renderer.value('bezier((0 0, 0.5 0.2, 1 1), 0.5)'), '0.5 0.35');
    });
    it('bezier((0, 1), 0.5) == 0.5', function() {
      assert.strictEqual(renderer.value('bezier((0, 1), 0.5)'), '0.5');
    });
    it('bezier((0, 2), 0.5) == 1', function() {
      assert.strictEqual(renderer.value('bezier((0, 2), 0.5)'), '1');
    });
    it('bezier((0 0 0, 1 1 1), 0.5) == 0.5 0.5 0.5', function() {
      assert.strictEqual(renderer.value('bezier((0 0 0, 1 1 1), 0.5)'), '0.5 0.5 0.5');
    });
  });
});
