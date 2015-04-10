[![Code Climate](https://codeclimate.com/github/nbekirov/rpn.js/badges/gpa.svg)](https://codeclimate.com/github/nbekirov/rpn.js)

# Reverse Polish notation utils
This library provides the following functionality:
  * Converting from [infix](http://en.wikipedia.org/wiki/Infix_notation) to [reverse Polish](http://en.wikipedia.org/wiki/Reverse_Polish_notation) notation (Implementation of the [Shunting-yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail))
  * Evaluating Reverse Polish notation expression

## Usage
### Converting from infix notation
```javascript
requirejs(['rpn/from_infix'], function (rpn_from_infix) {
    rpn_from_infix('5 + ((1 + 2) * 4) - 3'); // 5 1 2 + 4 * + 3 -
    rpn_from_infix('1.5 * -(120.0 / -5)'); // 1.5 120 5 _ / _ *
});
```
### Evaluating reverse Polish notation expression
```javascript
requirejs(['rpn/eval'], function (rpn_eval) {
    rpn_eval('5 1 2 + 4 * + 3 -'); // 14
    rpn_eval('1.5 120 5 _ / _ *'); // 36
});
```

## Operators list
Parentheses may be used to force precedence

Operator | Name | Infix | RPN 
------------ | ------------- | ------------- | ------------- 
`+` | Addition | `1 + 2` | `1 2 +`
`-` | Subtraction | `1 - 2` | `1 2 -`
`*` | Multiplication | `1 * 2` | `1 2 *`
`/` | Division | `1 / 2` | `1 2 /`
`%` | Modulus | `1 % 2` | `1 2 %`
`pow` | Exponentiation | `1 pow 2` | `1 2 pow`
`_` | Unary negation  | `_ 1` OR `-1` | `1 _`

## Example page
```bash
bower install && xdg-open example/index.html
```

## Tests
```bash
bower install && xdg-open tests/SpecRunner.html
```

## Build (AMD clean)
```bash
r.js -o build_amdclean.js
```
