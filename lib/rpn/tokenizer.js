define(['./operators'], function (operators) {
    'use strict';

    return function (string) {
        var opRegExps = [];
        for (var op in operators) {
            opRegExps.push(operators[op].regExp);
        }
        return string
                .toLowerCase()
                .match(new RegExp("(\\d+(\\.\\d+)?)|\\(|\\)|" + opRegExps.join('|'), 'g')) || [];
    };
});