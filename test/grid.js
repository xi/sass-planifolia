var path = require('path');
var assert = require('assert');
var Sassaby = require('sassaby');
var shared = require('./shared');

describe('grid', function() {
  var file = path.resolve(__dirname, '../sass/grid.scss');
  var sassaby = new Sassaby(file);

  describe('_grid-get', function() {
    it('get value', function() {
      sassaby.func('_grid-get').calledWithArgs('columns').equals('12');
    });
    it('get overwritten value', function() {
      sassaby.func('_grid-get').calledWithArgs('columns', '("columns": 13)').equals(13);
    });
  });

  describe('grid-width', function() {
    it('uses calc() for output', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('1');
      shared.declares(call, 'width', 'calc((100% + 1rem) * .08333 - 1rem)');
    });
    it('provides a fallback', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('1');
      shared.declares(call, 'width', '6.5%');
    });
    it('grid-width(2)', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('2');
      shared.declares(call, 'width', 'calc((100% + 1rem) * .16667 - 1rem)');
      shared.declares(call, 'width', '15%');
    });
    it('uses gutter setting', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('1', '(gutter: 2em)');
      shared.declares(call, 'width', 'calc((100% + 2em) * .08333 - 2em)');
      shared.declares(call, 'width', '6.5%');
    });
    it('uses gutter-fallback setting', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('1', '(gutter-fallback: 8%)');
      shared.declares(call, 'width', 'calc((100% + 1rem) * .08333 - 1rem)');
      shared.declares(call, 'width', '1%');
    });
    it('uses columns setting', function() {
      var call = sassaby.includedMixin('grid-width').calledWithArgs('1', '(columns: 8)');
      shared.declares(call, 'width', 'calc((100% + 1rem) * .125 - 1rem)');
      shared.declares(call, 'width', '10.75%');
    });
  });

  describe('grid-position', function() {
    it('uses calc() for output', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('1');
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * .08333)');
    });
    it('provides a fallback', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('1');
      shared.declares(call, 'margin-left', '8.5%');
    });
    it('grid-position(2)', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('2');
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * .16667)');
      shared.declares(call, 'margin-left', '17%');
    });
    it('uses gutter setting', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('1', '(gutter: 2em)');
      shared.declares(call, 'margin-left', 'calc((100% + 2em) * .08333)');
      shared.declares(call, 'margin-left', '8.5%');
    });
    it('uses gutter-fallback setting', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('1', '(gutter-fallback: 8%)');
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * .08333)');
      shared.declares(call, 'margin-left', '9%');
    });
    it('uses columns setting', function() {
      var call = sassaby.includedMixin('grid-position').calledWithArgs('1', '(columns: 8)');
      shared.declares(call, 'margin-left', 'calc((100% + 1rem) * .125)');
      shared.declares(call, 'margin-left', '12.75%');
    });
  });
});
