var path = require('path');
var Sassaby = require('sassaby');

describe('contrast', function() {
  var file = path.resolve(__dirname, '../sass/contrast.scss');
  var sassaby = new Sassaby(file, {
    dependencies: [
      path.resolve(__dirname, '../sass/math.scss')
    ]
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
    it('red-red', function() {
      sassaby.func('contrast').calledWithArgs('red', '#676eff').equals('1.00017');
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
});
