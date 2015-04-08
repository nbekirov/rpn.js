define(['./operators', './tokenizer'], function (operators, tokenizer) {
    'use strict';

    return function getFromInfix(infixString) {
        //  Shunting-yard algorithm implementation
        var output = [], stack = [];
        var lastOperator = 'START'; // Used to distinguish between unary and binary operators

        tokenizer(infixString).forEach(function (token) {
            if (!isNaN(token)) {
                output.push(parseFloat(token));
            } else if (operators.hasOwnProperty(token)) {
                if (token === '-' && (lastOperator && lastOperator !== ')')) {
                    token = '_';
                }

                var o1 = operators[token];

                for (var i = stack.length - 1; i >= 0; i--) {
                    if (!operators.hasOwnProperty(stack[i])) {
                        break;
                    }

                    var o2 = operators[stack[i]];

                    if ((o1.assoc === 'left' && o1.precedence <= o2.precedence) || (o1.assoc === 'right' && o1.precedence < o2.precedence)) {
                        output.push(stack.pop());
                    }
                }

                stack.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                var foundMatching = false;
                for (var j = stack.length - 1; j >= 0; j--) {
                    if (stack[j] !== '(') {
                        output.push(stack.pop());
                    } else {
                        stack.pop();
                        foundMatching = true;
                        break;
                    }
                }

                if (!foundMatching) {
                    throw new Error('Mismatched parentheses');
                }
            } else {
                throw new Error('Invalid token: ' + token);
            }

            lastOperator = !isNaN(token) ? false : token;
        });

        for (var i = stack.length - 1; i >= 0; i--) {
            var token = stack[i];
            if (token === '(' || token === ')') {
                throw new Error('Mismatched parentheses');
            }

            output.push(token);
        }

        return output.join(' ');
    };
});