requirejs.config({
    "baseUrl": "../lib",
    "paths": {
        "jquery": "../vendor/jquery/dist/jquery.min"
    }
});

requirejs(['jquery', 'rpn/tokenizer', 'rpn/eval', 'rpn/from_infix'], function ($, tokenizer, rpn_eval, rpn_from_infix) {
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
            if (btnClickedElem.attr('data-method') === 'rpn_eval') {
                result = rpn_eval(inputString);
            } else if (btnClickedElem.attr('data-method') === 'rpn_from_infix') {
                result = rpn_from_infix(inputString);
            }
        } catch (err) {
            writeToConsole('Error: ' + err);
        }

        writeToConsole('Result: ' + result);
        $(btnClickedElem.attr('data-dest')).val(result);
    });
});