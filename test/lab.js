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

  describe('lab-complement', function() {
    it('white', function() {
      sassaby.func('lab-complement').calledWithArgs('white').equals('white');
    });
    it('red', function() {
      sassaby.func('lab-complement').calledWithArgs('red').equals('#00a1f3');
    });
    it('yellow', function() {
      sassaby.func('lab-complement').calledWithArgs('yellow').equals('#76f4ff');
    });
  });

  describe('lab-distance', function() {
    it('d(white, white) = 0', function() {
      sassaby.func('lab-distance').calledWithArgs('white', 'white').equals(0);
    });
    it('d(red, red) = 0', function() {
      sassaby.func('lab-distance').calledWithArgs('red', 'red').equals(0);
    });
    it('d(white, black) ~= 100', function() {
      shared.similar(sassaby.func('lab-distance').calledWithArgs('white', 'black'), 100);
    });
    it('d(white, red)', function() {
      shared.similar(sassaby.func('lab-distance').calledWithArgs('white', 'red'), 114.55535);
    });
    it('d(red, blue)', function() {
      shared.similar(sassaby.func('lab-distance').calledWithArgs('red', 'blue'), 176.32554);
    });
    it('d(blue, red)', function() {
      shared.similar(sassaby.func('lab-distance').calledWithArgs('blue', 'red'), 176.32554);
    });
  });

  describe('lch-mix', function() {
    it('white, white', function() {
      sassaby.func('lch-mix').calledWithArgs('white', 'white').equals('white');
    });
    it('black, white', function() {
      sassaby.func('lch-mix').calledWithArgs('black', 'white').equals('#777');
    });
    it('black, white, 0', function() {
      sassaby.func('lch-mix').calledWithArgs('black', 'white', '0').equals('white');
    });
    it('black, white, 1', function() {
      sassaby.func('lch-mix').calledWithArgs('black', 'white', '1').equals('black');
    });
    it('black, white, 0.2', function() {
      sassaby.func('lch-mix').calledWithArgs('black', 'white', '0.2').equals('#c6c6c6');
    });
    it('blue, red', function() {
      sassaby.func('lch-mix').calledWithArgs('blue', 'red').equals('#fa0080');
    });
    it('blue, red, 0.2', function() {
      sassaby.func('lch-mix').calledWithArgs('blue', 'red', '0.2').equals('#ff003a');
    });
    it('green, red', function() {
      sassaby.func('lch-mix').calledWithArgs('green', 'red').equals('#957200');
    });
    it('yellow, blue', function() {
      sassaby.func('lch-mix').calledWithArgs('yellow', 'blue').equals('#ff0050');
    });
    it('green, blue', function() {
      sassaby.func('lch-mix').calledWithArgs('green', 'blue').equals('#007bcc');
    });
    it('white, blue', function() {
      sassaby.func('lch-mix').calledWithArgs('white', 'blue').equals('#b38bff');
    });
  });
});
