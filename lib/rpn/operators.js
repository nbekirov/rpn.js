define({
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
        regExp: '/',
        precedence: 40,
        assoc: 'left',
        argsCount: 2,
        execFunc: function (a, b) {
            return a / b;
        }
    },
    '%': {
        regExp: '%',
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
});