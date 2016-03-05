0.1.0 (2016-03-05)
------------------

The algorithm for calculating contrasts of transparent colors has been
overhauled completely:

- The old algorithm ignored the fact that gamma correction is non-linear.
- In order to simplify the API, `contrast()` now uses an approximation that
  does not care about the order of inputs. The exact algorithm is available as
  `contrast-min()`. Another effect of this change is that the `$bg` parameter
  of `contrast-color()` has been removed.

0.0.0 (2016-03-03)
------------------

initial release
