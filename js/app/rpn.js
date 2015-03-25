define(function () {
	'use strict';

	var operatorsConfig = {
		'+': {
			precedence: 2,
			assoc: 'left',
			argsCount: 2,
			execFunc: function (a, b) {
				return a + b;
			}
		},
		'-': {
			precedence: 2,
			assoc: 'left',
			argsCount: 2,
			execFunc: function (a, b) {
				return a - b;
			}
		},
		'*': {
			precedence: 3,
			assoc: 'left',
			argsCount: 2,
			execFunc: function (a, b) {
				return a * b;
			}
		},
		'x': {
			precedence: 3,
			assoc: 'left',
			argsCount: 2,
			execFunc: function (a, b) {
				return a * b;
			}
		},
		'/': {
			precedence: 3,
			assoc: 'left',
			argsCount: 2,
			execFunc: function (a, b) {
				return a / b;
			}
		},
		'^': {
			precedence: 4,
			assoc: 'right',
			argsCount: 2,
			execFunc: function (a, b) {
				return Math.pow(a, b);
			}
		}
	};

	function tokenize(string) {
		return string.replace(/ +/g, ' ').trim().split(' ');
	}

	function getFromInfix(infixString) {
		return '';
	}

	function solve(rpnString) {
		var stack = [];
		tokenize(rpnString).forEach(function (token) {
			if (!isNaN(token)) {
				stack.push(parseFloat(token));
			} else if (operatorsConfig.hasOwnProperty(token)) {
				var operator = operatorsConfig[token];

				if (operator.argsCount > stack.length) {
					throw 'Not enough operands in stack for: ' + token;
				}

				var operands = stack.splice(-1 * operator.argsCount, operator.argsCount);
				var result = operator.execFunc.apply(null, operands);

				stack.push(result);
			} else {
				throw 'Invalid token: ' + token;
			}
		});

		if (stack.length !== 1) {
			throw 'Invalid expression';
		}

		return stack.pop();
	}

	return {
		getFromInfix: getFromInfix,
		solve: solve
	};
});