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
        element(by.tagName('md-autocomplete')).element(by.tagName('input')).sendKeys('Apple');

        browser.driver.wait(function () {
            return element(by.cssContainingText('.highlight', 'Apple')).isPresent();
        }, 3000);

        element(by.tagName('md-autocomplete')).element(by.tagName('input')).sendKeys(protractor.Key.ENTER);
        element(by.buttonText('Confirm')).click();

        var stockSlider = element(by.tagName('stock-slider'));
        expect(stockSlider.getAttribute('name')).toEqual('Apple Inc.');
    });

    it('updates the stock\'s percentage', function () {
        var slider = element(by.model('ctrl.percentage'));
        expect(slider.getAttribute('ng-model')).toEqual(0);
        browser.actions().dragAndDrop(slider, { x: 100, y: 0 }).perform();
        expect(slider.getAttribute('ng-model')).not.toEqual(0);
    });

    it('removes that stock', function () {
        element(by.css('.delete-icon')).click();
        expect(element(by.tagName('stock-slider')).isPresent()).toBeFalsy();
    });
});