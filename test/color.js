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
        shared.similar(sassaby.func('pf-hue').calledWithArgs('red'), 0, 1);
      });
      it('yellow', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('yellow'), Math.PI * 0.5, 1);
      });
      it('green', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('green'), Math.PI, 1);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('blue'), Math.PI * -0.5, 1);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        sassaby.func('pf-complement').calledWithArgs('white').equals('white');
      });
      it('red', function() {
        sassaby.func('pf-complement').calledWithArgs('red').equals('#00a1f3');
      });
      it('yellow', function() {
        sassaby.func('pf-complement').calledWithArgs('yellow').equals('#76f4ff');
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
        sassaby.func('pf-mix').calledWithArgs('blue', 'red').equals('#f40093');
      });
      it('blue, red, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '20%').equals('#ff0045');
      });
      it('green, red', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'red').equals('#a76900');
      });
      it('yellow, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('yellow', 'blue').equals('#ff0079');
      });
      it('green, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'blue').equals('#0077fb');
      });
      it('white, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'blue').equals('#b38bff');
      });
    });
  });

  describe('luv', function() {
    describe('lch', function() {
      it('white', function() {
        sassaby.func('lch').calledWithArgs('100', '0', '0', 'luv').equals('white');
      });
      it('black', function() {
        sassaby.func('lch').calledWithArgs('0', '0', '0', 'luv').equals('black');
      });
      it('red', function() {
        sassaby.func('lch').calledWithArgs('53.23288', '179.07872', '0.21245', 'luv').equals('red');
      });
      it('blue', function() {
        sassaby.func('lch').calledWithArgs('32.30259', '130.69138', '-1.64278', 'luv').equals('blue');
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
        shared.similar(sassaby.func('pf-hue').calledWithArgs('red', 'luv'), 0, 1);
      });
      it('yellow', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('yellow', 'luv'), Math.PI * 0.5, 1);
      });
      it('green', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('green', 'luv'), Math.PI, 1);
      });
      it('blue', function() {
        shared.similar(sassaby.func('pf-hue').calledWithArgs('blue', 'luv'), Math.PI * -0.5, 1);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        sassaby.func('pf-complement').calledWithArgs('white', 'luv').equals('white');
      });
      it('red', function() {
        sassaby.func('pf-complement').calledWithArgs('red', 'luv').equals('#00b8b8');
      });
      it('yellow', function() {
        sassaby.func('pf-complement').calledWithArgs('yellow', 'luv').equals('#eaeaff');
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
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '50%', 'luv').equals('#f000b6');
      });
      it('blue, red, 20%', function() {
        sassaby.func('pf-mix').calledWithArgs('blue', 'red', '20%', 'luv').equals('#fc006e');
      });
      it('green, red', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'red', '50%', 'luv').equals('#bb6100');
      });
      it('yellow, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('yellow', 'blue', '50%', 'luv').equals('#ff53af');
      });
      it('green, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('green', 'blue', '50%', 'luv').equals('#0079a6');
      });
      it('white, blue', function() {
        sassaby.func('pf-mix').calledWithArgs('white', 'blue', '50%', 'luv').equals('#9999e8');
      });
    });
  });
});
