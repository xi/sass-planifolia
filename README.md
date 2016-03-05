Sass-Planifolia - Vanilla Sass helper functions

[Sass](http://sass-lang.com/) is great, but some of its libraries not so much.
[Compass](http://compass-style.org/), the most popular of them all, seems to be
unmaintained. In addition, the rise of [libSass](http://sass-lang.com/libsass)
means that ruby extensions are no longer a good way forward.

Planifolia is a collection of high-quality implementations of common framework
functionality. It does not depend on a specific implementation of the Sass
compiler.

# Quick start

    bower install xi/sass-planifolia

Import it in your Sass files:

    @import "bower_components/sass-planifolia/sass/math";
    @import "bower_components/sass-planifolia/sass/contrast";

    .test {
        background: red;
        color: contrast-color(red);
    }

# Features

-   Does not depend on a specific Sass implementation
-   Leightweight
-   Unit tests
-   [Fully documented](https://xi.github.io/sass-planifolia/)
-   High performance math algorithms
-   WCAG compatible [color
    contrast](https://www.w3.org/TR/WCAG20/#contrast-ratiodef) functions
-   More functionality may be added on demand.
-   Can be installed with bower. Npm (eyeglass) or rubygem support may be added
    on demand.

# What is not included?

-   Vendor prefixes, polyfills or browser hacks. There are plenty of librariers
    for that.
-   pt/px/em/rem conversion. That is (a) not possible and (b) not helpful. Each
    unit has its specific use case. Learn to use the right units directly!
