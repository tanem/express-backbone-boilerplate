define(function () {

    var degreesPerRadian = 360 / (2 * Math.PI);

    return {
        
        getRadians: function (degrees) {
            return degrees / degreesPerRadian;
        },

        // These are defined in the _colours.scss partial.
        colours: [
            'violet',
            'indigo',
            'blue',
            'green',
            'red',
            'orange'
        ],

        keyMap: {
            del: 8,
            enter: 13,
            rightArrow: 39,
            leftArrow: 37
        }

    };

});