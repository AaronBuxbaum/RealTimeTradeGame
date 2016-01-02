xdescribe('portfolio interface', function () {
    var tabs = element(by.tagName('md-tab'));

    beforeEach(function () {
        browser.get('http://localhost:8000');
    });

    it('should navigate to the portfolio page', function () {
        tabs.get(1).click();
        expect(element(by.cssContainingText('.md-title', 'Looks like there\'s nothing here yet!')).isPresent()).toBe(true);
    });
});