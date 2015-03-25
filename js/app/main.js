define(['jquery', 'app/rpn'], function ($, rpn) {
	$('#transfrom_infix_button').bind('click', function () {
		$('#rpn_input').val(rpn.getFromInfix($('#infix_input').val()));
	})

	$('#solve_rpn_button').bind('click', function () {
		$('#result_output').val(rpn.solve($('#rpn_input').val()));
	})
});