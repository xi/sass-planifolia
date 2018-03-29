var path = require('path');
var Sassaby = require('sassaby');
var shared = require('./shared');

describe('color', function() {
  var file = path.resolve(__dirname, '../sass/color.scss');
  var sassaby = new Sassaby(file, {
    dependencies: [
      path.resolve(__dirname, '../sass/math.scss')
    ]
  });

  describe('lab', function() {
    describe('lch', function() {
      it('white', function() {
        sassaby.func('lch').calledWithArgs('100', '0', '0rad').equals('white');
      });
      it('black', function() {
        sassaby.func('lch').calledWithArgs('0', '0', '0rad').equals('black');
      });
      it('red (rad)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '104.57421', '0.69818rad').equals('red');
      });
      it('red (deg)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '104.57421', '40deg').equals('red');
      });
      it('red (unitless)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '104.57421', '40').equals('red');
      });
      it('blue', function() {
        sassaby.func('lch').calledWithArgs('32.30259', '133.80605', '-0.93744rad').equals('blue');
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('white'), 100);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('black'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('red'), 53.23288);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('blue'), 32.30259);
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('white'), 0, 0.0001);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('black'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('red'), 104.57421);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('blue'), 133.80605);
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('white'), 0);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('black'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('red'), 40.0027);
      });
      it('yellow', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('yellow'), 102.85403);
      });
      it('green', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('green'), 136.0155);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('blue'), -53.71132);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        sassaby.func('pf-complement').calledWithArgs('white').equals('white');
      });
      it('red', function() {
        sassaby.func('pf-complement').calledWithArgs('red').equals('#008ca1');
      });
      it('yellow', function() {
        sassaby.func('pf-complement').calledWithArgs('yellow').equals('#f5f6ff');
      });
    });

    describe('pf-color-distance', function() {
      it('d(white, white) = 0', function() {
        sassaby.func('pf-color-distance').calledWithArgs('white', 'white').equals(0);
      });
      it('d(red, red) = 0', function() {
        sassaby.func('pf-color-distance').calledWithArgs('red', 'red').equals(0);
      });
      it('d(white, black) ~= 100', function() {
        shared.similar(sassaby.func('pf-color-distance').calledWithArgs('white', 'black'), 100);
      });
      it('d(white, red)', function() {
        shared.similar(sassaby.func('pf-color-distance').calledWithArgs('white', 'red'), 114.55535);
      });
      it('d(red, blue)', function() {
        shared.similar(sassaby.func('pf-color-distance').calledWithArgs('red', 'blue'), 176.32554);
      });
      it('d(blue, red)', function() {
        shared.similar(sassaby.func('pf-color-distance').calledWithArgs('blue', 'red'), 176.32554);
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'white').equals('white');
      });
      it('black, white', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white').equals('#777');
      });
      it('black, white, 0%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '0%').equals('white');
      });
      it('black, white, 100%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '100%').equals('black');
      });
      it('black, white, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '20%').equals('#c6c6c6');
      });
      it('black, white, .2', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '.2').equals('#c6c6c6');
      });
      it('blue, red', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red').equals('#c20081');
      });
      it('blue, red, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '20%').equals('#e70051');
      });
      it('green, red', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'red').equals('#9d6e00');
      });
      it('yellow, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('yellow', 'blue').equals('#ff6b89');
      });
      it('green, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'blue').equals('#006487');
      });
      it('white, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'blue').equals('#b38cff');
      });
    });
  });

  describe('luv', function() {
    describe('lch', function() {
      it('white', function() {
        sassaby.func('lch').calledWithArgs('100', '0', '0rad', 'luv').equals('white');
      });
      it('black', function() {
        sassaby.func('lch').calledWithArgs('0', '0', '0rad', 'luv').equals('black');
      });
      it('red (rad)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '179.07872', '0.21245rad', 'luv').equals('red');
      });
      it('red (deg)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '179.07872', '12.1725deg', 'luv').equals('red');
      });
      it('red (unitless)', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '179.07872', '12.1725', 'luv').equals('red');
      });
      it('blue', function() {
        sassaby.func('lch').calledWithArgs('32.30259', '130.69138', '-1.64278rad', 'luv').equals('blue');
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('white', 'luv'), 100);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('black', 'luv'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('red', 'luv'), 53.23288);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-lightness').calledWithArgs('blue', 'luv'), 32.30259);
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('white', 'luv'), 0, 0.0001);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('black', 'luv'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('red', 'luv'), 179.07872);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-chroma').calledWithArgs('blue', 'luv'), 130.69138);
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('white', 'luv'), 0);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('black', 'luv'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('red', 'luv'), 12.17245);
      });
      it('yellow', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('yellow', 'luv'), 85.87536);
      });
      it('green', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('green', 'luv'), 127.71994);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('blue', 'luv'), -94.12464);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        sassaby.func('pf-complement').calledWithArgs('white', 'luv').equals('white');
      });
      it('red', function() {
        sassaby.func('pf-complement').calledWithArgs('red', 'luv').equals('#008e8e');
      });
      it('yellow', function() {
        sassaby.func('pf-complement').calledWithArgs('yellow', 'luv').equals('#f6f6ff');
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'white', '50%', 'luv').equals('white');
      });
      it('black, white', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '50%', 'luv').equals('#777');
      });
      it('black, white, 0%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '0%', 'luv').equals('white');
      });
      it('black, white, 100%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '100%', 'luv').equals('black');
      });
      it('black, white, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '20%', 'luv').equals('#c6c6c6');
      });
      it('black, white, .2', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '.2', 'luv').equals('#c6c6c6');
      });
      it('blue, red', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '50%', 'luv').equals('#bd0095');
      });
      it('blue, red, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '20%', 'luv').equals('#e40070');
      });
      it('green, red', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'red', '50%', 'luv').equals('#a56a00');
      });
      it('yellow, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('yellow', 'blue', '50%', 'luv').equals('#ff66ab');
      });
      it('green, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'blue', '50%', 'luv').equals('#006678');
      });
      it('white, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'blue', '50%', 'luv').equals('#9999e8');
      });
    });
  });

  describe('hsl', function() {
    describe('lch', function() {
      it('white', function() {
        sassaby.func('lch').calledWithArgs('100', '0', '0rad', 'hsl').equals('white');
      });
      it('black', function() {
        sassaby.func('lch').calledWithArgs('0', '0', '0rad', 'hsl').equals('black');
      });
      it('red', function() {
        sassaby.func('lch').calledWithArgs('50', '100', '0rad', 'hsl').equals('red');
      });
      it('blue (rad)', function() {
        sassaby.func('lch').calledWithArgs('50', '100', '4.18879rad', 'hsl').equals('blue');
      });
      it('blue (deg)', function() {
        sassaby.func('lch').calledWithArgs('50', '100', '240deg', 'hsl').equals('blue');
      });
      it('blue (unitless)', function() {
        sassaby.func('lch').calledWithArgs('50', '100', '240', 'hsl').equals('blue');
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        sassaby.func('pf-lightness').calledWithArgs('white', 'hsl').equals(100);
      });
      it('black', function() {
        sassaby.func('pf-lightness').calledWithArgs('black', 'hsl').equals(0);
      });
      it('red', function() {
        sassaby.func('pf-lightness').calledWithArgs('red', 'hsl').equals(50);
      });
      it('blue', function() {
        sassaby.func('pf-lightness').calledWithArgs('blue', 'hsl').equals(50);
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        sassaby.func('pf-chroma').calledWithArgs('white', 'hsl').equals(0);
      });
      it('black', function() {
        sassaby.func('pf-chroma').calledWithArgs('black', 'hsl').equals(0);
      });
      it('red', function() {
        sassaby.func('pf-chroma').calledWithArgs('red', 'hsl').equals(100);
      });
      it('blue', function() {
        sassaby.func('pf-chroma').calledWithArgs('blue', 'hsl').equals(100);
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('white', 'hsl'), 0);
      });
      it('black', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('black', 'hsl'), 0);
      });
      it('red', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('red', 'hsl'), 0);
      });
      it('yellow', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('yellow', 'hsl'), 60);
      });
      it('green', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('green', 'hsl'), 120);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('blue', 'hsl'), 240);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        sassaby.func('pf-complement').calledWithArgs('white', 'hsl').equals('white');
      });
      it('red', function() {
        sassaby.func('pf-complement').calledWithArgs('red', 'hsl').equals('cyan');
      });
      it('yellow', function() {
        sassaby.func('pf-complement').calledWithArgs('yellow', 'hsl').equals('blue');
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'white', '50%', 'hsl').equals('white');
      });
      it('black, white', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '50%', 'hsl').equals('gray');
      });
      it('black, white, 0%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '0%', 'hsl').equals('white');
      });
      it('black, white, 100%', function() {
        sassaby.func('pf-mix').calledWithArgs('black', 'white', '100%', 'hsl').equals('black');
      });
      it('blue, red', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '50%', 'hsl').equals('magenta');
      });
      it('yellow, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('yellow', 'blue', '50%', 'hsl').equals('#00ff80');
      });
      it('white, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'blue', '50%', 'hsl').equals('#9f9fdf');
      });
    });
  });
});
