define(['rpn/from_infix'], function (rpn_from_infix) {
    'use strict';

    describe('Infix to RPN', function () {
        it("should ignore empty expressions", function () {
            expect(rpn_from_infix('')).toEqual('');
        });

        it("should NOT transform single-number non-negative expressions", function () {
            expect(rpn_from_infix('2')).toEqual('2');
        });

        it("should transform simple use of unary operators", function () {
            expect(rpn_from_infix('_ 2')).toEqual('2 _');
        });

        it("should treat minus as unary when in the beginning", function () {
            expect(rpn_from_infix('-2')).toEqual('2 _');
        });

        it("should treat minus as unary when used after another operator", function () {
            expect(rpn_from_infix('2 - -3')).toEqual('2 3 _ -');
        });

        it("should treat minus as unary when used after left parentheses", function () {
            expect(rpn_from_infix('2 - (-3)')).toEqual('2 3 _ -');
        });

        it("should NOT treat minus as unary when used after right parentheses", function () {
            expect(rpn_from_infix('2 - (-3) - 4')).toEqual('2 3 _ - 4 -');
        });

        it("should transform simple use of binary operators", function () {
            expect(rpn_from_infix('2 + 3')).toEqual('2 3 +');
            expect(rpn_from_infix('2 - 3')).toEqual('2 3 -');
            expect(rpn_from_infix('2 * 3')).toEqual('2 3 *');
            expect(rpn_from_infix('2 % 3')).toEqual('2 3 %');
            expect(rpn_from_infix('2 pow 3')).toEqual('2 3 pow');
        });

        it("should respect precedence operators with right associativity", function () {
            expect(rpn_from_infix('2 pow -2 pow -2')).toEqual('2 2 _ 2 _ pow pow');
        });

        it("should respect precedence/associativity of binary operators", function () {
            expect(rpn_from_infix('0 + 1 - 2 + 3 * 4 / 6 % 7')).toEqual('0 1 + 2 - 3 4 * 6 / 7 % +');
            expect(rpn_from_infix('2 - 3 - 4')).toEqual('2 3 - 4 -');
            expect(rpn_from_infix('2 + 3 + 4')).toEqual('2 3 + 4 +');
            expect(rpn_from_infix('2 / 3 / 4')).toEqual('2 3 / 4 /');
            expect(rpn_from_infix('2 % 3 % 4')).toEqual('2 3 % 4 %');
            expect(rpn_from_infix('1 / 2 pow 3 pow -4')).toEqual('1 2 3 4 _ pow pow /');
        });

        it("should respect precedence/associativity of binary and unary operators", function () {
            expect(rpn_from_infix('-2 - -3 * -(-4)')).toEqual('2 _ 3 _ 4 _ _ * -');
        });

        it("should forece precedence depending on parentheses", function () {
            expect(rpn_from_infix('(2 + 3) * 4')).toEqual('2 3 + 4 *');
            expect(rpn_from_infix('(2 / 3) pow 4')).toEqual('2 3 / 4 pow');
            expect(rpn_from_infix('-(2 + 3) * -(4 - -5) + 1')).toEqual('2 3 + _ 4 5 _ - _ * 1 +');
        });

        it("should throw on mismatched parentheses - missing right", function () {
            function testThrow() {
                return rpn_from_infix('((2 + 3) * 1');
            }

            expect(testThrow).toThrowError(/Mismatched parentheses/);
        });

        it("should throw on mismatched parentheses - missing left", function () {
            function testThrow() {
                return rpn_from_infix('(2 + 3) * 1)');
            }

            expect(testThrow).toThrowError(/Mismatched parentheses/);
        });
    });
});