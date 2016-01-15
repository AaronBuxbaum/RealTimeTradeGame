describe('portfolio interface', function () {
    beforeEach(function () {
        browser.get('http://localhost:8000/#/tabs/portfolio');
        //element.all(by.tagName('md-tab-item')).get(1).click();
    });

    it('runs through the basic stock functions', function () {
        //navigate to the portfolio page
        var nothingHereText = element(by.cssContainingText('.md-title', "Looks like there's nothing here yet!"));
        var percentage = element(by.binding('ctrl.getMax(0)'));
        browser.driver.wait(nothingHereText.isPresent(), 5000);
        expect(percentage.isPresent()).toBeTruthy();
        expect(percentage.getText()).toEqual('100%');
        
        //add a stock
        element(by.buttonText('Add Stock')).click();
        element(by.tagName('md-autocomplete')).element(by.tagName('input')).sendKeys('Apple');
        browser.driver.wait(element(by.cssContainingText('.highlight', 'Apple')).isPresent(), 3000);
        element(by.tagName('md-autocomplete')).element(by.tagName('input')).sendKeys(protractor.Key.ENTER);
        element(by.buttonText('Confirm')).click();
        var stockSlider = element(by.tagName('stock-slider'));
        expect(stockSlider.getAttribute('name')).toEqual('Apple Inc.');
        
        //update stock percentage
        expect(percentage.getText()).toEqual('100%');

        var slider = element(by.model('ctrl.percentage'));
        browser.actions().dragAndDrop(slider, { x: 100, y: 0 }).perform();

        expect(percentage.getText()).not.toEqual('100%');
        
        //delete stock
        element(by.css('.delete-icon')).click();

        var dialogButton = element(by.tagName('md-dialog-actions')).all(by.tagName('button')).last();
        dialogButton.click();

        expect(element(by.tagName('stock-slider')).isPresent()).toBeFalsy();
    });
});