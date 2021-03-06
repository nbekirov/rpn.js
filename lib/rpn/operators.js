define({
    '_': {
        regExp: '_',
        precedence: 60,
        assoc: 'right',
        argsCount: 1,
        execFunc: function (a) {
            return -1 * a;
        }
    },
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