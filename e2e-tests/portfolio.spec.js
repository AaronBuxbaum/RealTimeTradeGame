describe('portfolio interface', function () {
    beforeEach(function () {
        browser.get('http://localhost:8000');
        element.all(by.tagName('md-tab-item')).get(1).click();
    });

    it('should navigate to an empty portfolio page', function () {
        var nothingHereText = element(by.cssContainingText('.md-title', "Looks like there's nothing here yet!"));
        expect(nothingHereText.isPresent()).toBeTruthy();
        var hundredPercent = element(by.binding('ctrl.getMax(0)'));
        expect(hundredPercent.isPresent()).toBeTruthy();
        expect(hundredPercent.getText()).toEqual('100%');
    });

    it('adds a stock', function () {
        element(by.buttonText('Add Stock')).click();
        element(by.tagName('md-autocomplete')).sendKeys('Apple');
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        element(by.buttonText('Confirm')).click();

        var addedStock = element(by.repeater('stock in ctrl.portfolio').row(0));
        expect(addedStock.column('stock.name').getText()).toEqual('Apple Inc.');
        expect(addedStock.column('stock.percentage').getText()).toEqual('0');
    });

    it('updates the percentage', function () {

    });

    it('removes a stock', function () {

    });
});