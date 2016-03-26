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

  describe('lab-lightness', function() {
    it('white', function() {
      shared.similar(sassaby.func('lab-lightness').calledWithArgs('white'), 100);
    });
    it('black', function() {
      shared.similar(sassaby.func('lab-lightness').calledWithArgs('black'), 0);
    });
    it('red', function() {
      shared.similar(sassaby.func('lab-lightness').calledWithArgs('red'), 53.23288);
    });
    it('blue', function() {
      shared.similar(sassaby.func('lab-lightness').calledWithArgs('blue'), 32.30259);
    });
  });

  describe('lab-chroma', function() {
    it('white', function() {
      shared.similar(sassaby.func('lab-chroma').calledWithArgs('white'), 0, 0.0001);
    });
    it('black', function() {
      shared.similar(sassaby.func('lab-chroma').calledWithArgs('black'), 0);
    });
    it('red', function() {
      shared.similar(sassaby.func('lab-chroma').calledWithArgs('red'), 104.57421);
    });
    it('blue', function() {
      shared.similar(sassaby.func('lab-chroma').calledWithArgs('blue'), 133.80605);
    });
  });

  describe('lab-hue', function() {
    it('white', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('white'), 0);
    });
    it('black', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('black'), 0);
    });
    it('red', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('red'), 0, 1);
    });
    it('yellow', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('yellow'), Math.PI * 0.5, 1);
    });
    it('green', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('green'), Math.PI, 1);
    });
    it('blue', function() {
      shared.similar(sassaby.func('lab-hue').calledWithArgs('blue'), Math.PI * -0.5, 1);
    });
  });
});
