define(['core/util'], function (util) {

    describe('Util', function () {

        it('should correctly convert degrees to radians', function () {
            expect(util.getRadians(360)).toEqual(2 * Math.PI);
            expect(util.getRadians(180)).toEqual(Math.PI);
            expect(util.getRadians(90)).toEqual(Math.PI / 2);
            expect(util.getRadians(45)).toEqual(Math.PI / 4);
        });

    });

});