define(['core/util'], function (util) {

    describe('Util', function () {

        it('should correctly convert degrees to radians', function () {
            expect(util.getRadians(360)).toEqual(2 * Math.PI);
            expect(util.getRadians(180)).toEqual(Math.PI);
            expect(util.getRadians(90)).toEqual(Math.PI / 2);
            expect(util.getRadians(45)).toEqual(Math.PI / 4);
        });

        it('should correctly generate a random RGBA string', function () {
            expect(util.getRandomRGBA()).toMatch(/^rgba\((?:([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]), ){3}1\)$/);
            expect(util.getRandomRGBA(0.5)).toMatch(/^rgba\((?:([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]), ){3}0.5\)$/);
        });

    });

});