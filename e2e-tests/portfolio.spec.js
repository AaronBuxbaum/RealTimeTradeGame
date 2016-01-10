describe('portfolio interface', function () {
    beforeEach(function () {
        element.all(by.tagName('md-tab-item')).get(1).click();
    });

    describe('initalization', function () {
        it('should navigate to an empty portfolio page', function () {
            var nothingHereText = element(by.cssContainingText('.md-title', "Looks like there's nothing here yet!"));
            expect(nothingHereText.isPresent()).toBeTruthy();
            var hundredPercent = element(by.linkText('100%'));
            expect(hundredPercent.isPresent()).toBeTruthy();
        });

        it('should have an add stock button', function () {
            var addStock = element(by.buttonText('Add Stock'));
            expect(addStock.isPresent()).toBeTruthy();
        });
    });
});