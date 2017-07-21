var path = require('path');
var Sassaby = require('sassaby');
var shared = require('./shared');

describe('contrast', function() {
  var file = path.resolve(__dirname, '../sass/contrast.scss');
  var sassaby = new Sassaby(file, {
    dependencies: [
      path.resolve(__dirname, '../sass/math.scss')
    ]
  });

  describe('alpha-blend', function() {
    it('fully opaque', function() {
      sassaby.func('alpha-blend').calledWithArgs('white').equals('white');
      sassaby.func('alpha-blend').calledWithArgs('black').equals('black');
      sassaby.func('alpha-blend').calledWithArgs('red').equals('red');
    });
    it('fully transparent', function() {
      sassaby.func('alpha-blend').calledWithArgs('rgba(white, 0)', 'blue').equals('blue');
      sassaby.func('alpha-blend').calledWithArgs('rgba(black, 0)', 'blue').equals('blue');
      sassaby.func('alpha-blend').calledWithArgs('rgba(red, 0)', 'blue').equals('blue');
      sassaby.func('alpha-blend').calledWithArgs('rgba(blue, 0)').equals('white');
    });
    it('50%', function() {
      sassaby.func('alpha-blend').calledWithArgs('rgba(white, 0.5)', 'blue').equals('#8080ff');
      sassaby.func('alpha-blend').calledWithArgs('rgba(black, 0.5)', 'blue').equals('navy');
      sassaby.func('alpha-blend').calledWithArgs('rgba(red, 0.5)', 'blue').equals('purple');
      sassaby.func('alpha-blend').calledWithArgs('rgba(blue, 0.5)').equals('#8080ff');
    });
    it('13%', function() {
      sassaby.func('alpha-blend').calledWithArgs('rgba(white, 0.13)', 'blue').equals('#2121ff');
      sassaby.func('alpha-blend').calledWithArgs('rgba(black, 0.13)', 'blue').equals('#0000de');
      sassaby.func('alpha-blend').calledWithArgs('rgba(red, 0.13)', 'blue').equals('#2100de');
      sassaby.func('alpha-blend').calledWithArgs('rgba(blue, 0.13)').equals('#dedeff');
    });
    it('transparent background', function() {
      sassaby.func('alpha-blend').calledWithArgs('rgba(white, 0.5)', 'rgba(blue, 0.5)').equals('rgba(170,170,255,0.75)');
    });
    it('both fully transparent', function() {
      sassaby.func('alpha-blend').calledWithArgs('rgba(white, 0)', 'rgba(black, 0)').equals('rgba(255,255,255,0)');
    });
  });

  describe('luma', function() {
    it('white', function() {
      sassaby.func('luma').calledWithArgs('white').equals('1');
    });
    it('black', function() {
      sassaby.func('luma').calledWithArgs('black').equals('0');
    });
    it('red', function() {
      sassaby.func('luma').calledWithArgs('#f00').equals('.2126');
    });
    it('green', function() {
      sassaby.func('luma').calledWithArgs('#0f0').equals('.7152');
    });
    it('blue', function() {
      sassaby.func('luma').calledWithArgs('#00f').equals('.0722');
    });
    it('yellow', function() {
      sassaby.func('luma').calledWithArgs('yellow').equals('.9278');
    });
    it('cyan', function() {
      sassaby.func('luma').calledWithArgs('cyan').equals('.7874');
    });
    it('random', function() {
      shared.similar(sassaby.func('luma').calledWithArgs('rgb(12, 180, 92)'), 0.3349, 0.02);
    });
    it('white with alpha', function() {
      sassaby.func('luma').calledWithArgs('rgba(255,255,255,0.5)').equals('1');
    });
    it('black with alpha', function() {
      sassaby.func('luma').calledWithArgs('rgba(0,0,0,0.5)').equals('0');
    });
  });

  describe('contrast', function() {
    it('white-black', function() {
      sassaby.func('contrast').calledWithArgs('white', 'black').equals('21');
    });
    it('white-white', function() {
      sassaby.func('contrast').calledWithArgs('white', 'white').equals('1');
    });
    it('black-black', function() {
      sassaby.func('contrast').calledWithArgs('black', 'black').equals('1');
    });
    it('red-red', function() {
      sassaby.func('contrast').calledWithArgs('red', 'red').equals('1');
    });
    it('red-lightblue', function() {
      shared.similar(sassaby.func('contrast').calledWithArgs('red', '#676eff'), 1, 0.02);
    });
  });

  describe('contrast-color', function() {
    it('white', function() {
      sassaby.func('contrast-color').calledWithArgs('white').equals('black');
    });
    it('black', function() {
      sassaby.func('contrast-color').calledWithArgs('black').equals('white');
    });
    it('red', function() {
      sassaby.func('contrast-color').calledWithArgs('#f00').equals('black');
    });
    it('green', function() {
      sassaby.func('contrast-color').calledWithArgs('#0f0').equals('black');
    });
    it('blue', function() {
      sassaby.func('contrast-color').calledWithArgs('#00f').equals('white');
    });
    it('yellow', function() {
      sassaby.func('contrast-color').calledWithArgs('yellow').equals('black');
    });
    it('cyan', function() {
      sassaby.func('contrast-color').calledWithArgs('cyan').equals('black');
    });
    it('light', function() {
      sassaby.func('contrast-color').calledWithArgs('white', '#111', '#eee').equals('#111');
    });
    it('dark', function() {
      sassaby.func('contrast-color').calledWithArgs('black', '#111', '#eee').equals('#eee');
    });
    it('middle', function() {
      sassaby.func('contrast-color').calledWithArgs('#555', '#111', '#eee').equals('#eee');
    });
    it('swapped', function() {
      sassaby.func('contrast-color').calledWithArgs('white', '#eee', '#111').equals('#111');
    });
  });

  describe('contrast-stretch', function() {
    it('white-black', function() {
      sassaby.func('contrast-stretch').calledWithArgs('white', 'black').equals('black');
    });
    it('white-#333', function() {
      sassaby.func('contrast-stretch').calledWithArgs('white', '#333').equals('#333');
    });
    it('white-#333-21', function() {
      sassaby.func('contrast-stretch').calledWithArgs('white', '#333', '21').equals('black');
    });
    it('#333-blue-7', function() {
      sassaby.func('contrast-stretch').calledWithArgs('#333', 'blue', '7').equals('#bbf');
    });
    it('#333-blue-AAA', function() {
      sassaby.func('contrast-stretch').calledWithArgs('#333', 'blue', 'AAA').equals('#bbf');
    });
  });
});
