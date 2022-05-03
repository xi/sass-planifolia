var assert = require('assert');
var shared = require('./shared');

describe('contrast', function() {
  var renderer = new shared.Renderer('@use "contrast";');

  describe('alpha-blend', function() {
    it('fully opaque', function() {
      assert.equal(renderer.value('contrast.alpha-blend(white)'), '#fff')
      assert.equal(renderer.value('contrast.alpha-blend(black)'), '#000')
      assert.equal(renderer.value('contrast.alpha-blend(red)'), 'red')
    });
    it('fully transparent', function() {
      assert.equal(renderer.value('contrast.alpha-blend(rgba(white, 0), blue)'), 'blue')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(black, 0), blue)'), 'blue')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(red, 0), blue)'), 'blue')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(blue, 0))'), '#fff')
    });
    it('50%', function() {
      assert.equal(renderer.value('contrast.alpha-blend(rgba(white, .5), blue)'), '#8080ff')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(black, .5), blue)'), 'navy')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(red, .5), blue)'), 'purple')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(blue, .5))'), '#8080ff')
    });
    it('13%', function() {
      assert.equal(renderer.value('contrast.alpha-blend(rgba(white, .13), blue)'), '#2121ff')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(black, .13), blue)'), '#0000de')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(red, .13), blue)'), '#2100de')
      assert.equal(renderer.value('contrast.alpha-blend(rgba(blue, .13))'), '#dedeff')
    });
    it('transparent background', function() {
      assert.equal(renderer.value('contrast.alpha-blend(rgba(white, .5), rgba(blue, .5))'), 'rgba(170,170,255,.75)')
    });
    it('both fully transparent', function() {
      assert.equal(renderer.value('contrast.alpha-blend(rgba(white, 0), rgba(black, 0))'), 'rgba(255,255,255,0)')
    });
  });

  describe('luma', function() {
    it('white', function() {
      assert.equal(renderer.value('contrast.luma(white)'), '1')
    });
    it('black', function() {
      assert.equal(renderer.value('contrast.luma(black)'), '0')
    });
    it('red', function() {
      assert.equal(renderer.value('contrast.luma(#f00)'), '.2126')
    });
    it('green', function() {
      assert.equal(renderer.value('contrast.luma(#0f0)'), '.7152')
    });
    it('blue', function() {
      assert.equal(renderer.value('contrast.luma(#00f)'), '.0722')
    });
    it('yellow', function() {
      assert.equal(renderer.value('contrast.luma(yellow)'), '.9278')
    });
    it('cyan', function() {
      assert.equal(renderer.value('contrast.luma(cyan)'), '.7874')
    });
    it('random', function() {
      shared.similar(renderer.value('contrast.luma(rgb(12, 180, 92))'), .3349, .02);
    });
    it('white with alpha', function() {
      assert.equal(renderer.value('contrast.luma(rgba(255,255,255,.5))'), '1')
    });
    it('black with alpha', function() {
      assert.equal(renderer.value('contrast.luma(rgba(0,0,0,.5))'), '0')
    });
  });

  describe('contrast', function() {
    it('white-black', function() {
      assert.equal(renderer.value('contrast.contrast(white, black)'), '21')
    });
    it('white-white', function() {
      assert.equal(renderer.value('contrast.contrast(white, white)'), '1')
    });
    it('black-black', function() {
      assert.equal(renderer.value('contrast.contrast(black, black)'), '1')
    });
    it('red-red', function() {
      assert.equal(renderer.value('contrast.contrast(red, red)'), '1')
    });
    it('red-lightblue', function() {
      shared.similar(renderer.value('contrast.contrast(red, #676eff)'), 1, .02);
    });
  });

  describe('contrast-color', function() {
    it('white', function() {
      assert.equal(renderer.value('contrast.contrast-color(white)'), '#000')
    });
    it('black', function() {
      assert.equal(renderer.value('contrast.contrast-color(black)'), '#fff')
    });
    it('red', function() {
      assert.equal(renderer.value('contrast.contrast-color(#f00)'), '#000')
    });
    it('green', function() {
      assert.equal(renderer.value('contrast.contrast-color(#0f0)'), '#000')
    });
    it('blue', function() {
      assert.equal(renderer.value('contrast.contrast-color(#00f)'), '#fff')
    });
    it('yellow', function() {
      assert.equal(renderer.value('contrast.contrast-color(yellow)'), '#000')
    });
    it('cyan', function() {
      assert.equal(renderer.value('contrast.contrast-color(cyan)'), '#000')
    });
    it('light', function() {
      assert.equal(renderer.value('contrast.contrast-color(white, #111, #eee)'), '#111')
    });
    it('dark', function() {
      assert.equal(renderer.value('contrast.contrast-color(black, #111, #eee)'), '#eee')
    });
    it('middle', function() {
      assert.equal(renderer.value('contrast.contrast-color(#555, #111, #eee)'), '#eee')
    });
    it('swapped', function() {
      assert.equal(renderer.value('contrast.contrast-color(white, #eee, #111)'), '#111')
    });
  });

  describe('contrast-stretch', function() {
    it('white-black', function() {
      assert.equal(renderer.value('contrast.contrast-stretch(white, black)'), '#000')
    });
    it('white-#333', function() {
      assert.equal(renderer.value('contrast.contrast-stretch(white, #333)'), '#333')
    });
    it('white-#333-21', function() {
      assert.equal(renderer.value('contrast.contrast-stretch(white, #333, 21)'), '#000')
    });
    it('#333-blue-7', function() {
      assert.equal(renderer.value('contrast.contrast-stretch(#333, blue, 7)'), '#bbf')
    });
    it('#333-blue-AAA', function() {
      assert.equal(renderer.value('contrast.contrast-stretch(#333, blue, "AAA")'), '#bbf')
    });
  });
});
