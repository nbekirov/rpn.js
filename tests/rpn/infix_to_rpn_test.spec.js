define(['rpn/main'], function (rpn) {
    'use strict';

    describe('Infix to RPN', function () {
        it("should ignore empty expressions", function () {
            expect(rpn.getFromInfix('')).toEqual('');
        });

        it("should NOT transform single-number non-negative expressions", function () {
            expect(rpn.getFromInfix('2')).toEqual('2');
        });

        it("should transform simple use of unary operators", function () {
            expect(rpn.getFromInfix('_ 2')).toEqual('2 _');
        });

        it("should treat minus as unary when in the beginning", function () {
            expect(rpn.getFromInfix('-2')).toEqual('2 _');
        });

        it("should treat minus as unary when used after another operator", function () {
            expect(rpn.getFromInfix('2 - -3')).toEqual('2 3 _ -');
        });

        it("should treat minus as unary when used after left parentheses", function () {
            expect(rpn.getFromInfix('2 - (-3)')).toEqual('2 3 _ -');
        });

        it("should NOT treat minus as unary when used after right parentheses", function () {
            expect(rpn.getFromInfix('2 - (-3) - 4')).toEqual('2 3 _ - 4 -');
        });

        it("should transform simple use of binary operators", function () {
            expect(rpn.getFromInfix('2 + 3')).toEqual('2 3 +');
            expect(rpn.getFromInfix('2 - 3')).toEqual('2 3 -');
            expect(rpn.getFromInfix('2 * 3')).toEqual('2 3 *');
            expect(rpn.getFromInfix('2 x 3')).toEqual('2 3 x');
            expect(rpn.getFromInfix('2 % 3')).toEqual('2 3 %');
            expect(rpn.getFromInfix('2 pow 3')).toEqual('2 3 pow');
        });

        it("should respect precedence/associativity of binary operators", function () {
            expect(rpn.getFromInfix('2 + 3 * 4')).toEqual('2 3 4 * +');
            expect(rpn.getFromInfix('2 / 3 pow 4')).toEqual('2 3 4 pow /');
        });

        it("should respect precedence/associativity of binary and unary operators", function () {
            expect(rpn.getFromInfix('-2 - -3 * -(-4)')).toEqual('2 _ 3 _ 4 _ _ * -');
        });

        it("should forece precedence depending on parentheses", function () {
            expect(rpn.getFromInfix('(2 + 3) * 4')).toEqual('2 3 + 4 *');
            expect(rpn.getFromInfix('(2 / 3) pow 4')).toEqual('2 3 / 4 pow');
            expect(rpn.getFromInfix('-(2 + 3) * -(4 - -5)')).toEqual('2 3 + _ 4 5 _ - _ *');
        });

        it("should throw on mismatched parentheses - missing right", function () {
            function testThrow() {
                return rpn.getFromInfix('((2 + 3) * 1');
            }

            expect(testThrow).toThrowError(/Mismatched parentheses/);
        });

        it("should throw on mismatched parentheses - missing left", function () {
            function testThrow() {
                return rpn.getFromInfix('(2 + 3) * 1)');
            }

            expect(testThrow).toThrowError(/Mismatched parentheses/);
        });
    });
});