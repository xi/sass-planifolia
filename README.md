Sass-Planifolia - Vanilla Sass helper functions

This is a collection of vanilla Sass helper functions, mostly centered around
colors. It currently consists of only two modules:

-   **contrast** for WCAG compatible [color
    contrast](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) functions
-   **color** for color functions with supper for different color spaces, e.g.
    CIELAB, CIELUV, or [HSLuv](http://www.hsluv.org/)

These modules can be imported individually. The only define mixins and
variables. They will not output any CSS. This means that importing them does
not add a single byte to your CSS.

See the [full documentation](https://xi.github.io/sass-planifolia/) for more
details.

# Quick start

    npm install sass-planifolia

Import it in your Sass files:

```scss
@use "node_modules/sass-planifolia/sass/contrast";
@use "node_modules/sass-planifolia/sass/color";

.test {
    background-color: red;

    // pick between two colors (default: black and white) to get good contrast
    color: contrast.color(red);

    // mix orange with black or white to get good contrast to red
    border-color: contrast.stretch(red, orange);

    // mix red with black in a perceptually uniform color space
    box-shadow: 0 0 1em color.shade(red, 0.5, 'lab');
}
```

# What is not included?

-   Vendor prefixes, polyfills or browser hacks. There are plenty of librariers
    for that.
-   pt/px/em/rem conversion. That is (a) not possible and (b) not helpful. Each
    unit has its specific use case. Learn to use the right units directly!

# Similar libraries

-   [CSS Color Moudle Level 4](https://www.w3.org/TR/css-color-4/) and [CSS
    Color Module Level 5](https://www.w3.org/TR/css-color-5/) are W3C Working
    Drafts (as of 2022-04-28) that would add similar features to CSS itself.
-   [PostCSS](https://postcss.org/) and [Parcel](https://github.com/parcel-bundler/parcel-css) both
    implement some of the functionality of CSS Color Module Level 4/5.
-   [oddbird/blend](https://github.com/oddbird/blend) is yet another Sass
    library that implements similar features. The main difference is that the
    contrast function do not take transparency into account.
