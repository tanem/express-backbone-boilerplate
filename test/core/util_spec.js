define(['core/util'], function (util) {

    describe('Util', function () {

        it('should correctly convert degrees to radians', function () {
            expect(util.getRadians(360)).toEqual(2 * Math.PI);
            expect(util.getRadians(180)).toEqual(Math.PI);
            expect(util.getRadians(90)).toEqual(Math.PI / 2);
            expect(util.getRadians(45)).toEqual(Math.PI / 4);
        });

        // it('should ')
        // // Generates a random RGBA string.
        // getRandomRGBA: function (alpha) {
            
        //     var rand = function () {
        //         return Math.floor(Math.random() * (255 + 1));
        //     };

        //     alpha = alpha || 1;

        //     return 'rgba(' + rand() + ', ' + rand() + ', ' + rand() + ', ' + alpha + ')';

        // },

        // Maps key names to key codes.
        // keyMap: {
        //     del: 8,
        //     enter: 13,
        //     rightArrow: 39,
        //     leftArrow: 37
        // }

    });

});