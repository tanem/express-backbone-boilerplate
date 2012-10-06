var Panel = require('../../models/panel');

describe('Models / Panel', function () {

    afterEach(function () {
        Panel.reset(function () {});
    });

    it('should correctly return an array of all panels in the DB', function () {
        new Panel().save(function () {});
        new Panel().save(function () {});
        Panel.all(function (err, arr) {
            expect(err).toBeNull();
            expect(arr.length).toEqual(2);
            expect(arr[0].id).toEqual(1);
            expect(arr[1].id).toEqual(2);
        });
    });

    it('should correctly create a panel in the DB', function () {
        
        var panel = new Panel();
        
        expect(panel.id).toEqual(1);
        expect(panel.createdAt).toEqual(jasmine.any(Date));

        panel.save(function () {
            Panel.all(function (err, arr) {
                expect(err).toBeNull();
                expect(arr.length).toEqual(1);
                expect(arr[0].id).toEqual(1);
            });
        });

    });

    it('should correctly delete a panel by ID from the DB', function () {
        new Panel().save(function () {});
        Panel.destroy(1, function (err) {
            expect(err).toBeUndefined();
            Panel.all(function (err, arr) {
                expect(err).toBeNull();
                expect(arr.length).toEqual(0);
            });
        });
    });

});