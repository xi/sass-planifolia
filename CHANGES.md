0.1.2 (2016-03-10)
------------------

- Improved test coverage for math module.
- Fix `pow(0, $exp)` if `$exp` is a float.
- Fix `sin($x)` for negativ `$x`.
- Fix `cos()`.
- Fix syntax error in `tan()`.

0.1.1 (2016-03-06)
------------------

- Fix an undefined variable in `contrast-check()`
- `contrast-check()` could not be called because it did not return a value. It
  now always returns `null`.

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
