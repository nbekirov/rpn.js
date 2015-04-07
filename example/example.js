requirejs.config({
    "baseUrl": "../lib",
    "paths": {
        "jquery": "../vendor/jquery/dist/jquery.min"
    }
});

requirejs(['jquery', 'rpn/tokenizer', 'rpn/main'], function ($, tokenizer, rpn) {
    'use strict';

    function writeToConsole(text) {
        var cElem = $('#console');
        cElem.val((cElem.val() ? cElem.val() + '\n' : '') + text);
        cElem.scrollTop(cElem[0].scrollHeight - cElem.height());
    }

    $('#transfrom_infix_button, #evaluate_rpn_button').bind('click', function () {
        var result = '';
        var btnClickedElem = $(this);
        var inputString = $(btnClickedElem.attr('data-source')).val();

        writeToConsole('\nInput: ' + inputString);
        writeToConsole('Tokenizer: ' + tokenizer(inputString));

        try {
            result = rpn[btnClickedElem.attr('data-method')](inputString);
        } catch (err) {
            writeToConsole('Error: ' + err);
        }

        writeToConsole('Result: ' + result);
        $(btnClickedElem.attr('data-dest')).val(result);
    });
});