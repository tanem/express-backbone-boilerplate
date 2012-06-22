define(function () {

    var degreesPerRadian = 360 / (2 * Math.PI),
        
        // These are defined in the _colours.scss partial.
        colours = [
            'violet',
            'indigo',
            'blue',
            'green',
            'red',
            'orange'
        ];

    return {
        
        getRadians: function (degrees) {
            return degrees / degreesPerRadian;
        },

        getColours: function () {
            return colours;
        }

    };

});