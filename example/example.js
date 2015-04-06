requirejs.config({
    "baseUrl": "../lib",
    "paths": {
        "jquery": "../vendor/jquery/dist/jquery.min"
    }
});

requirejs(['jquery', 'rpn/main'], function ($, rpn) {
    $('#transfrom_infix_button').bind('click', function () {
        var result = '';
        try {
            result = rpn.getFromInfix($('#infix_input').val());
        } catch (err) {
            alert(err);
        }

        $('#rpn_input').val(result);
    });

    $('#evaluate_rpn_button').bind('click', function () {
        var result = '';
        try {
            result = rpn.evaluate($('#rpn_input').val());
        } catch (err) {
            alert(err);
        }

        $('#result_output').val(result);
    });
});