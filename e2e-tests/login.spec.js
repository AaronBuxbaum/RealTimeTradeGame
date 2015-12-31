describe('log in interface', function () {
    it('should allow you to log in', function () {
        browser.get('localhost:8080');

        var dialog = element(by.tagName('md-dialog'));
        var buttons = element.all(by.tagName('md-button'));

        //Fail for invalid email
        element(by.model('ctrl.email')).sendKeys('example');
        element(by.model('ctrl.password')).sendKeys('examplepassword');
        buttons[0].click();
        expect(dialog.isPresent()).toBe(true);
        
        //Fail for invalid password
        element(by.model('ctrl.email')).sendKeys('example@example.com');
        element(by.model('ctrl.password')).sendKeys('');
        buttons[0].click();
        expect(dialog.isPresent()).toBe(true);
        
        //Success
        element(by.model('ctrl.email')).sendKeys('example@example.com');
        element(by.model('ctrl.password')).sendKeys('examplepassword');
        buttons[0].click();
        expect(dialog.isPresent()).to.become(false);
    });
});