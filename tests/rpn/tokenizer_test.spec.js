define(['rpn/tokenizer'], function (tokenizer) {
    'use strict';

    describe('Tokenizer', function () {
        it("should ignore empty strings", function () {
            expect(tokenizer('')).toEqual([]);
            expect(tokenizer('    ')).toEqual([]);
        });

        it("should ignore whitespace", function () {
            expect(tokenizer('   1  2    ')).toEqual(['1', '2']);
        });

        it("should ignore non-operators", function () {
            expect(tokenizer('1noop 2 noop3|4')).toEqual(['1', '2', '3', '4']);
        });

        it("should detect operators", function () {
            expect(tokenizer('+-*/%pow_')).toEqual(['+', '-', '*', '/', '%', 'pow', '_']);
        });

        it("should detect mixed-case operators and return lowercase", function () {
            expect(tokenizer('PoW POW pOw')).toEqual(['pow', 'pow', 'pow']);
        });

        it("should detect parentheses", function () {
            expect(tokenizer('()')).toEqual(['(', ')']);
        });

        it("should detect floats", function () {
            expect(tokenizer('0.500000000')).toEqual(['0.500000000']);
        });

        it("should NOT detect negative", function () {
            expect(tokenizer('-3')).toEqual(['-', '3']);
            expect(tokenizer('-3.5')).toEqual(['-', '3.5']);
        });

        it("should detect mix of numbers operators and  parentheses", function () {
            expect(tokenizer('0.500000000+ -(-3/-2) * -1')).toEqual(['0.500000000', '+', '-', '(', '-', '3', '/', '-', '2', ')', '*', '-', '1']);
        });
    });
});