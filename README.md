Sass-Planifolia - Vanilla Sass helper functions

[Compass](http://compass-style.org/) was great, but it has been unmaintained
for a while now. In addition, the rise of
[libSass](http://sass-lang.com/libsass) means that ruby extensions are no
longer a good way forward.

Planifolia is a collection of commonly used helper functions.  It does not
depend on a specific implementation of the Sass compiler.

The following modules are included:

-   **math** for high performance math functions
-   **contrast** for WCAG compatible [color
    contrast](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) functions
-   **color** for CIELAB/CIELUV based color functions (with support for
    [HSLuv](http://www.hsluv.org/))
-   **clearfix** for compass compatible clearfix mixins
-   **grid** for simple grid mixins

These modules can be imported individually (color depends on math though).
Also note that these modules will only define mixins and variables. They will
not output any CSS. This means that importing them does not add a single byte
to your CSS.

See the [full documentation](https://xi.github.io/sass-planifolia/) for more
details.

# Quick start

    npm install sass-planifolia

Import it in your Sass files:

```sass
@import "node_modules/sass-planifolia/sass/math";
@import "node_modules/sass-planifolia/sass/contrast";
@import "node_modules/sass-planifolia/sass/color";

.test {
    background-color: red;

    // pick between two colors (default: black and white) to get good contrast
    color: contrast-color(red);

    // mix orange with black or white to get good contrast to red
    border-color: contrast-stretch(red, orange);

    // mix red with black in a perceptually uniform color space
    box-shadow: 0 0 1em pf-shade(red, 0.5, 'lab');

    // calculate modular scale dynamically
    font-size: 16px * pow(1.5, 2);
}
```

# What is not included?

-   Vendor prefixes, polyfills or browser hacks. There are plenty of librariers
    for that.
-   pt/px/em/rem conversion. That is (a) not possible and (b) not helpful. Each
    unit has its specific use case. Learn to use the right units directly!

# Similar libraries

-   [mathsass](https://github.com/terkel/mathsass) is another very good
    pure-sass math implementation.
-   [accoutrement-color](https://github.com/oddbird/accoutrement-color) and
    [bourbon](https://github.com/thoughtbot/bourbon) also contain
    WCAG-appropriate color-contrast functions, but they ignore
    alpha-transparency.
-   [eyeglass-math](https://github.com/sass-eyeglass/eyeglass-math) and
    [chromatic-sass](https://github.com/bugsnag/chromatic-sass) also do
    advanced math/color manipulation, but they can only be used with node-sass.
