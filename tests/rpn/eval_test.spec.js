define(['rpn/eval'], function (rpn_eval) {
    'use strict';

    describe('RPN eval', function () {
        it("should throw on empty expressions", function () {
            function testThrow() {
                return rpn_eval('');
            }

            expect(testThrow).toThrowError(/Invalid expression/);
        });

        it("should NOT transform single-number non-negative expressions", function () {
            expect(rpn_eval('2')).toEqual(2);
            expect(rpn_eval('2.5')).toEqual(2.5);
        });

        it("should throw on insufficient operands for binary operators", function () {
            function testThrow(arg) {
                rpn_eval(arg);
            }

            expect(testThrow.bind(null, '2 +')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 -')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 *')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 x')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 /')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 %')).toThrowError(/Not enough operands in stack/);
            expect(testThrow.bind(null, '3 pow')).toThrowError(/Not enough operands in stack/);
        });

        it("should throw on insufficient operands for unary operators", function () {
            function testThrow() {
                rpn_eval('_');
            }

            expect(testThrow).toThrowError(/Not enough operands in stack/);
        });

        it("should throw on too many operands for given operators", function () {
            function testThrow(arg) {
                rpn_eval(arg);
            }

            expect(testThrow.bind(null, '3 4 5 +')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 -')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 *')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 x')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 /')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 %')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 5 pow')).toThrowError(/Invalid expression/);
            expect(testThrow.bind(null, '3 4 _')).toThrowError(/Invalid expression/);
        });

        it("should get the right answer for binary operators", function () {
            expect(rpn_eval('2 3 +')).toEqual(5);
            expect(rpn_eval('2 3 -')).toEqual(-1);
            expect(rpn_eval('2 3 *')).toEqual(6);
            expect(rpn_eval('2 3 x')).toEqual(6);
            expect(rpn_eval('2 3 /')).toBeCloseTo(0.6666);
            expect(rpn_eval('2 3 %')).toEqual(2);
            expect(rpn_eval('2 3 pow')).toEqual(8);
        });

        it("should get the right answer for unary operators", function () {
            expect(rpn_eval('2 _')).toEqual(-2);
        });
    });
});