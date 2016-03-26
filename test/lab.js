var path = require('path');
var Sassaby = require('sassaby');
var shared = require('./shared');

describe('lab', function() {
  var file = path.resolve(__dirname, '../sass/lab.scss');
  var sassaby = new Sassaby(file, {
    dependencies: [
      path.resolve(__dirname, '../sass/math.scss')
    ]
  });

  describe('lch', function() {
    it('white', function() {
      sassaby.func('lch').calledWithArgs('100', '0', '0').equals('white');
    });
    it('black', function() {
      sassaby.func('lch').calledWithArgs('0', '0', '0').equals('black');
    });
    it('red', function() {
      sassaby.func('lch').calledWithArgs('53.23288', '104.57421', '0.69818').equals('red');
    });
    it('blue', function() {
      sassaby.func('lch').calledWithArgs('32.30259', '133.80605', '-0.93744').equals('blue');
    });
  });
});
