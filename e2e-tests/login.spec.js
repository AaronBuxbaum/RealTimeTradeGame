describe('authentication interface', function () {
    var dialog = element(by.tagName('md-dialog'));
    var buttons = element(by.tagName('md-dialog-actions')).all(by.tagName('button'));

    beforeEach(inject(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

        browser.get('http://localhost:8000');
    }));

    it('should allow you to authenticate in and out', function () {
        var logIn = buttons.first();

        //Fail for invalid email
        element(by.model('ctrl.email')).sendKeys('example');
        element(by.model('ctrl.password')).sendKeys('examplepassword');
        logIn.click();
        expect(dialog.isPresent()).toBe(true);

        //Fail for non-existant account
        element(by.model('ctrl.email')).sendKeys('@EXAMMMPLE.com');
        logIn.click();
        expect(dialog.isPresent()).toBe(true);
    
        //Success
        element(by.model('ctrl.email')).sendKeys('a@a.com');
        element(by.model('ctrl.password')).sendKeys('a');
        logIn.click();
        expect(dialog.isPresent()).toBe(false);
        
        //Wait for loading -- should never be longer than 10 seconds
        browser.driver.sleep(10000);

        //Log Out
        var logOutTab = element.all(by.tagName('md-tab-item')).last();
        expect(logOutTab.getText()).toEqual('LOG OUT');
        logOutTab.click();
        var logOutButton = element(by.buttonText('Log Out'));
        expect(logOutButton.isPresent()).toBeTruthy();
        logOutButton.click();
    });
});