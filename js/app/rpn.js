define(function () {
    'use strict';

    var operatorsConfig = {
        'pow': {
            regExp: 'pow',
            precedence: 50,
            assoc: 'right',
            argsCount: 2,
            execFunc: function (a, b) {
                return Math.pow(a, b);
            }
        },
        '*': {
            regExp: '\\*',
            precedence: 40,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a * b;
            }
        },
        'x': {
            regExp: 'x',
            precedence: 40,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a * b;
            }
        },
        '/': {
            regExp: '\\/',
            precedence: 40,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a / b;
            }
        },
        '%': {
            regExp: '\\%',
            precedence: 40,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a % b;
            }
        },
        '+': {
            regExp: '\\+',
            precedence: 30,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a + b;
            }
        },
        '-': {
            regExp: '\\-',
            precedence: 30,
            assoc: 'left',
            argsCount: 2,
            execFunc: function (a, b) {
                return a - b;
            }
        }
    };

    function tokenize(string) {
        var opRegExps = [];
        for (var op in operatorsConfig) {
            opRegExps.push(operatorsConfig[op].regExp);
        }
        return string
                .toLowerCase()
                .match(new RegExp("(\\d+(\\.\\d+)?)|\\(|\\)|" + opRegExps.join('|'), 'g'));
    }

    function getFromInfix(infixString) {
        //  Shunting-yard algorithm implementation
        var output = [], stack = [];

        tokenize(infixString).forEach(function (token) {
            if (!isNaN(token)) {
                output.push(parseFloat(token));
            } else if (operatorsConfig.hasOwnProperty(token)) {
                var o1 = operatorsConfig[token];

                for (var i = stack.length - 1; i >= 0; i--) {
                    if (!operatorsConfig.hasOwnProperty(stack[i])) {
                        break;
                    }

                    var o2 = operatorsConfig[stack[i]];

                    if (
                            (o1.assoc === 'left' && o1.precedence <= o2.precedence)
                            || (o1.assoc === 'right' && o1.precedence < o2.precedence)
                            ) {
                        output.push(stack.pop());
                    }
                }

                stack.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                var foundMatching = false;
                for (var i = stack.length - 1; i >= 0; i--) {
                    if (stack[i] !== '(') {
                        output.push(stack.pop());
                    } else {
                        stack.pop();
                        foundMatching = true;
                        break;
                    }
                }

                if (!foundMatching) {
                    throw 'Mismatched parentheses';
                }
            } else {
                throw 'Invalid token: ' + token;
            }
        });

        for (var i = stack.length - 1; i >= 0; i--) {
            var token = stack[i];
            if (token === '(' || token === ')') {
                throw 'Mismatched parentheses';
            }

            output.push(token);
        }

        return output.join(' ');
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