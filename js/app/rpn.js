define(function () {
    'use strict';

    var operatorsConfig = {
        '+': {
            regExp: '\\+',
            precedence: 2,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a + b;
            }
        },
        '-': {
            regExp: '\\-',
            precedence: 2,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a - b;
            }
        },
        '*': {
            regExp: '\\*',
            precedence: 3,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a * b;
            }
        },
        'x': {
            regExp: 'x',
            precedence: 3,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a * b;
            }
        },
        '/': {
            regExp: '\\/',
            precedence: 3,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a / b;
            }
        },
        'pow': {
            regExp: 'pow',
            precedence: 4,
            assoc: 'right',
            argsCount: 2,
            execFunc: function (a, b) {
                return Math.pow(a, b);
            }
        }
    };

    function tokenize(string) {
        var opRegExps = [];
        for (var op in operatorsConfig) {
            opRegExps.push(operatorsConfig[op].regExp);
        }
        return string
                .match(new RegExp("(\\d+(\\.\\d+)?)|\\(|\\)|" + opRegExps.join('|'), 'ig'))
                .map(function (token) {
                    return token.toLowerCase();
                });
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