var assert = require('assert');
var shared = require('./shared');

describe('contrast', function() {
  var renderer = new shared.Renderer('@import "contrast";');

  describe('alpha-blend', function() {
    it('fully opaque', function() {
      assert.equal(renderer.value('alpha-blend(white)'), 'white')
      assert.equal(renderer.value('alpha-blend(black)'), 'black')
      assert.equal(renderer.value('alpha-blend(red)'), 'red')
    });
    it('fully transparent', function() {
      assert.equal(renderer.value('alpha-blend(rgba(white, 0), blue)'), 'blue')
      assert.equal(renderer.value('alpha-blend(rgba(black, 0), blue)'), 'blue')
      assert.equal(renderer.value('alpha-blend(rgba(red, 0), blue)'), 'blue')
      assert.equal(renderer.value('alpha-blend(rgba(blue, 0))'), 'white')
    });
    it('50%', function() {
      assert.equal(renderer.value('alpha-blend(rgba(white, 0.5), blue)'), '#8080ff')
      assert.equal(renderer.value('alpha-blend(rgba(black, 0.5), blue)'), 'navy')
      assert.equal(renderer.value('alpha-blend(rgba(red, 0.5), blue)'), 'purple')
      assert.equal(renderer.value('alpha-blend(rgba(blue, 0.5))'), '#8080ff')
    });
    it('13%', function() {
      assert.equal(renderer.value('alpha-blend(rgba(white, 0.13), blue)'), '#2121ff')
      assert.equal(renderer.value('alpha-blend(rgba(black, 0.13), blue)'), '#0000de')
      assert.equal(renderer.value('alpha-blend(rgba(red, 0.13), blue)'), '#2100de')
      assert.equal(renderer.value('alpha-blend(rgba(blue, 0.13))'), '#dedeff')
    });
    it('transparent background', function() {
      assert.equal(renderer.value('alpha-blend(rgba(white, 0.5), rgba(blue, 0.5))'), 'rgba(170, 170, 255, 0.75)')
    });
    it('both fully transparent', function() {
      assert.equal(renderer.value('alpha-blend(rgba(white, 0), rgba(black, 0))'), 'rgba(255, 255, 255, 0)')
    });
  });

  describe('luma', function() {
    it('white', function() {
      assert.equal(renderer.value('luma(white)'), '1')
    });
    it('black', function() {
      assert.equal(renderer.value('luma(black)'), '0')
    });
    it('red', function() {
      assert.equal(renderer.value('luma(#f00)'), '0.2126')
    });
    it('green', function() {
      assert.equal(renderer.value('luma(#0f0)'), '0.7152')
    });
    it('blue', function() {
      assert.equal(renderer.value('luma(#00f)'), '0.0722')
    });
    it('yellow', function() {
      assert.equal(renderer.value('luma(yellow)'), '0.9278')
    });
    it('cyan', function() {
      assert.equal(renderer.value('luma(cyan)'), '0.7874')
    });
    it('random', function() {
      shared.similar(renderer.value('luma(rgb(12, 180, 92))'), 0.3349, 0.02);
    });
    it('white with alpha', function() {
      assert.equal(renderer.value('luma(rgba(255,255,255,0.5))'), '1')
    });
    it('black with alpha', function() {
      assert.equal(renderer.value('luma(rgba(0,0,0,0.5))'), '0')
    });
  });

  describe('contrast', function() {
    it('white-black', function() {
      assert.equal(renderer.value('contrast(white, black)'), '21')
    });
    it('white-white', function() {
      assert.equal(renderer.value('contrast(white, white)'), '1')
    });
    it('black-black', function() {
      assert.equal(renderer.value('contrast(black, black)'), '1')
    });
    it('red-red', function() {
      assert.equal(renderer.value('contrast(red, red)'), '1')
    });
    it('red-lightblue', function() {
      shared.similar(renderer.value('contrast(red, #676eff)'), 1, 0.02);
    });
  });

  describe('contrast-color', function() {
    it('white', function() {
      assert.equal(renderer.value('contrast-color(white)'), 'black')
    });
    it('black', function() {
      assert.equal(renderer.value('contrast-color(black)'), 'white')
    });
    it('red', function() {
      assert.equal(renderer.value('contrast-color(#f00)'), 'black')
    });
    it('green', function() {
      assert.equal(renderer.value('contrast-color(#0f0)'), 'black')
    });
    it('blue', function() {
      assert.equal(renderer.value('contrast-color(#00f)'), 'white')
    });
    it('yellow', function() {
      assert.equal(renderer.value('contrast-color(yellow)'), 'black')
    });
    it('cyan', function() {
      assert.equal(renderer.value('contrast-color(cyan)'), 'black')
    });
    it('light', function() {
      assert.equal(renderer.value('contrast-color(white, #111, #eee)'), '#111')
    });
    it('dark', function() {
      assert.equal(renderer.value('contrast-color(black, #111, #eee)'), '#eee')
    });
    it('middle', function() {
      assert.equal(renderer.value('contrast-color(#555, #111, #eee)'), '#eee')
    });
    it('swapped', function() {
      assert.equal(renderer.value('contrast-color(white, #eee, #111)'), '#111')
    });
  });

  describe('contrast-stretch', function() {
    it('white-black', function() {
      assert.equal(renderer.value('contrast-stretch(white, black)'), 'black')
    });
    it('white-#333', function() {
      assert.equal(renderer.value('contrast-stretch(white, #333)'), '#333')
    });
    it('white-#333-21', function() {
      assert.equal(renderer.value('contrast-stretch(white, #333, 21)'), 'black')
    });
    it('#333-blue-7', function() {
      assert.equal(renderer.value('contrast-stretch(#333, blue, 7)'), '#bdbbff')
    });
    it('#333-blue-AAA', function() {
      assert.equal(renderer.value('contrast-stretch(#333, blue, "AAA")'), '#bdbbff')
    });
  });
});
