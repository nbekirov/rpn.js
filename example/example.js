requirejs.config({
    "baseUrl": "../lib",
    "paths": {
        "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min"
    }
});

requirejs(['jquery', 'rpn/main'], function ($, rpn) {
    $('#transfrom_infix_button').bind('click', function () {
        $('#rpn_input').val(rpn.getFromInfix($('#infix_input').val()));
    });

    $('#solve_rpn_button').bind('click', function () {
        $('#result_output').val(rpn.solve($('#rpn_input').val()));
    });
});