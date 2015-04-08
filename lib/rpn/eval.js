define(['./operators', './tokenizer'], function (operators, tokenizer) {
    'use strict';

    return function evaluate(rpnString) {
        var stack = [];
        tokenizer(rpnString).forEach(function (token) {
            if (!isNaN(token)) {
                stack.push(parseFloat(token));
            } else if (operators.hasOwnProperty(token)) {
                var operator = operators[token];

                if (operator.argsCount > stack.length) {
                    throw new Error('Not enough operands in stack for: ' + token);
                }

                var operands = stack.splice(-1 * operator.argsCount, operator.argsCount);
                var result = operator.execFunc.apply(null, operands);

                stack.push(result);
            } else {
                throw new Error('Invalid token: ' + token);
            }
        });

        if (stack.length !== 1) {
            throw new Error('Invalid expression');
        }

        return stack.pop();
    };
});