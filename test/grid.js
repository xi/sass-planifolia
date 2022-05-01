var assert = require('assert');
var shared = require('./shared');

describe('grid', function() {
  var renderer = new shared.Renderer('@import "grid";');

  describe('_grid-get', function() {
    it('get value', function() {
      assert.equal(renderer.value('_grid-get(columns)'), '12')
    });
    it('get overwritten value', function() {
      assert.equal(renderer.value('_grid-get(columns, ("columns": 13))'), 13)
    });
  });

  describe('grid-width', function() {
    it('uses calc() for output', function() {
      var call = renderer.block('@include grid-width(1)')
      shared.declares(call, 'width', 'calc((100% + 1rem) * 0.0833333333 - 1rem)');
    });
    it('provides a fallback', function() {
      var call = renderer.block('@include grid-width(1)')
      shared.declares(call, 'width', '6.5%');
    });
    it('grid-width(2)', function() {
      var call = renderer.block('@include grid-width(2)')
      shared.declares(call, 'width', 'calc((100% + 1rem) * 0.1666666667 - 1rem)');
      shared.declares(call, 'width', '15%');
    });
    it('uses gutter setting', function() {
      var call = renderer.block('@include grid-width(1, (gutter: 2em))')
      shared.declares(call, 'width', 'calc((100% + 2em) * 0.0833333333 - 2em)');
      shared.declares(call, 'width', '6.5%');
    });
    it('uses gutter-fallback setting', function() {
      var call = renderer.block('@include grid-width(1, (gutter-fallback: 8%))')
      shared.declares(call, 'width', 'calc((100% + 1rem) * 0.0833333333 - 1rem)');
      shared.declares(call, 'width', '1%');
    });
    it('uses columns setting', function() {
      var call = renderer.block('@include grid-width(1, (columns: 8))')
      shared.declares(call, 'width', 'calc((100% + 1rem) * 0.125 - 1rem)');
      shared.declares(call, 'width', '10.75%');
    });
  });

  describe('grid-position', function() {
    it('uses calc() for output', function() {
      var call = renderer.block('@include grid-position(1)')
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * 0.0833333333)');
    });
    it('provides a fallback', function() {
      var call = renderer.block('@include grid-position(1)')
      shared.declares(call, 'margin-left', '8.5%');
    });
    it('grid-position(2)', function() {
      var call = renderer.block('@include grid-position(2)')
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * 0.1666666667)');
      shared.declares(call, 'margin-left', '17%');
    });
    it('uses gutter setting', function() {
      var call = renderer.block('@include grid-position(1, (gutter: 2em))')
      shared.declares(call, 'margin-left', 'calc((100% + 2em) * 0.0833333333)');
      shared.declares(call, 'margin-left', '8.5%');
    });
    it('uses gutter-fallback setting', function() {
      var call = renderer.block('@include grid-position(1, (gutter-fallback: 8%))')
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * 0.0833333333)');
      shared.declares(call, 'margin-left', '9%');
    });
    it('uses columns setting', function() {
      var call = renderer.block('@include grid-position(1, (columns: 8))')
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * 0.125)');
      shared.declares(call, 'margin-left', '12.75%');
    });
  });
});
