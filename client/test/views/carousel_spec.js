define([
    'collections/panels',
    'views/carousel'
], function (
    PanelsCollection,
    CarouselView
) {

    describe('CarouselView', function () {

        beforeEach(function () {

            var panelsCollection = new PanelsCollection();

            this.carouselView = new CarouselView({
                collection: panelsCollection
            }).render();

            panelsCollection.reset([
                { label: '1' },
                { label: '2' },
                { label: '3' },
                { label: '4' }
            ]);

        });

        it('should remove the most recently added panel when the delete key is pressed', function () {
            this.carouselView._deleteHandler();
            expect(this.carouselView.collection.pluck('label')).toEqual([
                '1',
                '2',
                '3'
            ]);
        });

        it('should rotate the carousel to the correct position when a panel is removed', function () {
            this.carouselView._deleteHandler();
            expect(this.carouselView.carouselRotation).toEqual(120);
        });

        it('should add a panel to the end of the carousel when the enter key is pressed', function () {
            this.carouselView._enterHandler();
            expect(this.carouselView.collection.pluck('label')).toEqual([
                '1',
                '2',
                '3',
                '4',
                '5'
            ]);
        });

        it('should rotate the carousel to the correct position when a panel is added', function () {
            this.carouselView._enterHandler();
            expect(this.carouselView.carouselRotation).toEqual(72);
        });

        it('should rotate the carousel to the correct position when the right arrow key is pressed', function () {
            this.carouselView._rightArrowHandler();
            expect(this.carouselView.carouselRotation).toEqual(180);
        });

        it('should rotate the carousel to the correct position when the left arrow key is pressed', function () {
            this.carouselView._leftArrowHandler();
            expect(this.carouselView.carouselRotation).toEqual(0);
        });

    });

});