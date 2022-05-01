var assert = require('assert');
var shared = require('./shared');

describe('color', function() {
  var renderer = new shared.Renderer('@import "math"; @import "color";');

  describe('lab', function() {
    describe('lch', function() {
      it('white', function() {
        assert.equal(renderer.value('lch(100, 0, 0rad)'), '#fff')
      });
      it('black', function() {
        assert.equal(renderer.value('lch(0, 0, 0rad)'), '#000')
      });
      it('red (rad)', function() {
        assert.equal(renderer.value('lch(53.23288, 104.57421, .69818rad)'), 'red')
      });
      it('red (deg)', function() {
        assert.equal(renderer.value('lch(53.23288, 104.57421, 40deg)'), 'red')
      });
      it('red (unitless)', function() {
        assert.equal(renderer.value('lch(53.23288, 104.57421, 40)'), 'red')
      });
      it('blue', function() {
        assert.equal(renderer.value('lch(32.30259, 133.80605, -0.93744rad)'), 'blue')
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-lightness(white)'), 100);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-lightness(black)'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-lightness(red)'), 53.23288);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-lightness(blue)'), 32.30259);
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-chroma(white)'), 0, .0001);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-chroma(black)'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-chroma(red)'), 104.57421);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-chroma(blue)'), 133.80605);
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-hue(white)'), 0);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-hue(black)'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-hue(red)'), 40.0027);
      });
      it('yellow', function() {
        shared.similar(renderer.value('pf-hue(yellow)'), 102.85403);
      });
      it('green', function() {
        shared.similar(renderer.value('pf-hue(green)'), 136.0155);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-hue(blue)'), -53.71132);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        assert.equal(renderer.value('pf-complement(white)'), '#fff')
      });
      it('red', function() {
        assert.equal(renderer.value('pf-complement(red)'), '#008ca1')
      });
      it('yellow', function() {
        assert.equal(renderer.value('pf-complement(yellow)'), '#f5f6ff')
      });
    });

    describe('pf-color-distance', function() {
      it('d(white, white) = 0', function() {
        assert.equal(renderer.value('pf-color-distance(white, white)'), 0)
      });
      it('d(red, red) = 0', function() {
        assert.equal(renderer.value('pf-color-distance(red, red)'), 0)
      });
      it('d(white, black) ~= 100', function() {
        shared.similar(renderer.value('pf-color-distance(white, black)'), 100);
      });
      it('d(white, red)', function() {
        shared.similar(renderer.value('pf-color-distance(white, red)'), 114.55535);
      });
      it('d(red, blue)', function() {
        shared.similar(renderer.value('pf-color-distance(red, blue)'), 176.32554);
      });
      it('d(blue, red)', function() {
        shared.similar(renderer.value('pf-color-distance(blue, red)'), 176.32554);
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        assert.equal(renderer.value('pf-mix(white, white)'), '#fff')
      });
      it('black, white', function() {
        assert.equal(renderer.value('pf-mix(black, white)'), '#777')
      });
      it('black, white, 0%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 0%)'), '#fff')
      });
      it('black, white, 100%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 100%)'), '#000')
      });
      it('black, white, 20%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 20%)'), '#c6c6c6')
      });
      it('black, white, .2', function() {
        assert.equal(renderer.value('pf-mix(black, white, .2)'), '#c6c6c6')
      });
      it('blue, red', function() {
        assert.equal(renderer.value('pf-mix(blue, red)'), '#c20081')
      });
      it('blue, red, 20%', function() {
        assert.equal(renderer.value('pf-mix(blue, red, 20%)'), '#e70051')
      });
      it('green, red', function() {
        assert.equal(renderer.value('pf-mix(green, red)'), '#9d6e00')
      });
      it('yellow, blue', function() {
        assert.equal(renderer.value('pf-mix(yellow, blue)'), '#ff6b89')
      });
      it('green, blue', function() {
        assert.equal(renderer.value('pf-mix(green, blue)'), '#006487')
      });
      it('white, blue', function() {
        assert.equal(renderer.value('pf-mix(white, blue)'), '#b38cff')
      });
    });
  });

  describe('luv', function() {
    describe('lch', function() {
      it('white', function() {
        assert.equal(renderer.value('lch(100, 0, 0rad, "luv")'), '#fff')
      });
      it('black', function() {
        assert.equal(renderer.value('lch(0, 0, 0rad, "luv")'), '#000')
      });
      it('red (rad)', function() {
        assert.equal(renderer.value('lch(53.23288, 179.07872, .21245rad, "luv")'), 'red')
      });
      it('red (deg)', function() {
        assert.equal(renderer.value('lch(53.23288, 179.07872, 12.1725deg, "luv")'), 'red')
      });
      it('red (unitless)', function() {
        assert.equal(renderer.value('lch(53.23288, 179.07872, 12.1725, "luv")'), 'red')
      });
      it('blue', function() {
        assert.equal(renderer.value('lch(32.30259, 130.69138, -1.64278rad, "luv")'), 'blue')
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-lightness(white, "luv")'), 100);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-lightness(black, "luv")'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-lightness(red, "luv")'), 53.23288);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-lightness(blue, "luv")'), 32.30259);
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-chroma(white, "luv")'), 0, .0001);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-chroma(black, "luv")'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-chroma(red, "luv")'), 179.07872);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-chroma(blue, "luv")'), 130.69138);
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-hue(white, "luv")'), 0);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-hue(black, "luv")'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-hue(red, "luv")'), 12.17245);
      });
      it('yellow', function() {
        shared.similar(renderer.value('pf-hue(yellow, "luv")'), 85.87536);
      });
      it('green', function() {
        shared.similar(renderer.value('pf-hue(green, "luv")'), 127.71994);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-hue(blue, "luv")'), -94.12464);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        assert.equal(renderer.value('pf-complement(white, "luv")'), '#fff')
      });
      it('red', function() {
        assert.equal(renderer.value('pf-complement(red, "luv")'), '#008e8e')
      });
      it('yellow', function() {
        assert.equal(renderer.value('pf-complement(yellow, "luv")'), '#f6f6ff')
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        assert.equal(renderer.value('pf-mix(white, white, 50%, "luv")'), '#fff')
      });
      it('black, white', function() {
        assert.equal(renderer.value('pf-mix(black, white, 50%, "luv")'), '#777')
      });
      it('black, white, 0%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 0%, "luv")'), '#fff')
      });
      it('black, white, 100%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 100%, "luv")'), '#000')
      });
      it('black, white, 20%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 20%, "luv")'), '#c6c6c6')
      });
      it('black, white, .2', function() {
        assert.equal(renderer.value('pf-mix(black, white, .2, "luv")'), '#c6c6c6')
      });
      it('blue, red', function() {
        assert.equal(renderer.value('pf-mix(blue, red, 50%, "luv")'), '#bd0095')
      });
      it('blue, red, 20%', function() {
        assert.equal(renderer.value('pf-mix(blue, red, 20%, "luv")'), '#e40070')
      });
      it('green, red', function() {
        assert.equal(renderer.value('pf-mix(green, red, 50%, "luv")'), '#a56a00')
      });
      it('yellow, blue', function() {
        assert.equal(renderer.value('pf-mix(yellow, blue, 50%, "luv")'), '#ff66ab')
      });
      it('green, blue', function() {
        assert.equal(renderer.value('pf-mix(green, blue, 50%, "luv")'), '#006678')
      });
      it('white, blue', function() {
        assert.equal(renderer.value('pf-mix(white, blue, 50%, "luv")'), '#9999e8')
      });
    });
  });

  describe('hsl', function() {
    describe('lch', function() {
      it('white', function() {
        assert.equal(renderer.value('lch(100, 0, 0rad, "hsl")'), '#fff')
      });
      it('black', function() {
        assert.equal(renderer.value('lch(0, 0, 0rad, "hsl")'), '#000')
      });
      it('red', function() {
        assert.equal(renderer.value('lch(50, 100, 0rad, "hsl")'), 'red')
      });
      it('blue (rad)', function() {
        assert.equal(renderer.value('lch(50, 100, 4.18879rad, "hsl")'), 'blue')
      });
      it('blue (deg)', function() {
        assert.equal(renderer.value('lch(50, 100, 240deg, "hsl")'), 'blue')
      });
      it('blue (unitless)', function() {
        assert.equal(renderer.value('lch(50, 100, 240, "hsl")'), 'blue')
      });
    });

    describe('pf-lightness', function() {
      it('white', function() {
        assert.equal(renderer.value('pf-lightness(white, "hsl")'), 100)
      });
      it('black', function() {
        assert.equal(renderer.value('pf-lightness(black, "hsl")'), 0)
      });
      it('red', function() {
        assert.equal(renderer.value('pf-lightness(red, "hsl")'), 50)
      });
      it('blue', function() {
        assert.equal(renderer.value('pf-lightness(blue, "hsl")'), 50)
      });
    });

    describe('pf-chroma', function() {
      it('white', function() {
        assert.equal(renderer.value('pf-chroma(white, "hsl")'), 0)
      });
      it('black', function() {
        assert.equal(renderer.value('pf-chroma(black, "hsl")'), 0)
      });
      it('red', function() {
        assert.equal(renderer.value('pf-chroma(red, "hsl")'), 100)
      });
      it('blue', function() {
        assert.equal(renderer.value('pf-chroma(blue, "hsl")'), 100)
      });
    });

    describe('pf-hue', function() {
      it('white', function() {
        shared.similar(renderer.value('pf-hue(white, "hsl")'), 0);
      });
      it('black', function() {
        shared.similar(renderer.value('pf-hue(black, "hsl")'), 0);
      });
      it('red', function() {
        shared.similar(renderer.value('pf-hue(red, "hsl")'), 0);
      });
      it('yellow', function() {
        shared.similar(renderer.value('pf-hue(yellow, "hsl")'), 60);
      });
      it('green', function() {
        shared.similar(renderer.value('pf-hue(green, "hsl")'), 120);
      });
      it('blue', function() {
        shared.similar(renderer.value('pf-hue(blue, "hsl")'), 240);
      });
    });

    describe('pf-complement', function() {
      it('white', function() {
        assert.equal(renderer.value('pf-complement(white, "hsl")'), '#fff')
      });
      it('red', function() {
        assert.equal(renderer.value('pf-complement(red, "hsl")'), 'aqua')
      });
      it('yellow', function() {
        assert.equal(renderer.value('pf-complement(yellow, "hsl")'), 'blue')
      });
    });

    describe('pf-mix', function() {
      it('white, white', function() {
        assert.equal(renderer.value('pf-mix(white, white, 50%, "hsl")'), '#fff')
      });
      it('black, white', function() {
        assert.equal(renderer.value('pf-mix(black, white, 50%, "hsl")'), 'gray')
      });
      it('black, white, 0%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 0%, "hsl")'), '#fff')
      });
      it('black, white, 100%', function() {
        assert.equal(renderer.value('pf-mix(black, white, 100%, "hsl")'), '#000')
      });
      it('blue, red', function() {
        assert.equal(renderer.value('pf-mix(blue, red, 50%, "hsl")'), '#f0f')
      });
      it('yellow, blue', function() {
        assert.equal(renderer.value('pf-mix(yellow, blue, 50%, "hsl")'), '#00ff80')
      });
      it('white, blue', function() {
        assert.equal(renderer.value('pf-mix(white, blue, 50%, "hsl")'), '#9f9fdf')
      });
    });
  });
});
