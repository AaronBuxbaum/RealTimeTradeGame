xdescribe('log in interface', function () {
    it('should allow you to log in', function () {
        browser.get('localhost:8080');

        //Fail for invalid email
        element(by.model('ctrl.email')).sendKeys('example');
        element(by.model('ctrl.password')).sendKeys('examplepassword');
        element('md-button')[0].click();
        
        //Fail for invalid password
        element(by.model('ctrl.email')).sendKeys('example@example.com');
        element(by.model('ctrl.password')).sendKeys('');
        element('md-button')[0].click();
        
        //Success
        element(by.model('ctrl.email')).sendKeys('example@example.com');
        element(by.model('ctrl.password')).sendKeys('examplepassword');
        element('md-button')[0].click();
    });
});