describe('log in interface', function () {
  var dialog = element(by.tagName('md-dialog'));
  var buttons = element(by.tagName('md-dialog-actions')).all(by.tagName('button'));

  it('should allow you to log in', function () {
    var logIn = buttons.first();

    //Fail for invalid email
    element(by.model('ctrl.email')).sendKeys('example');
    element(by.model('ctrl.password')).sendKeys('examplepassword');
    logIn.click();
    expect(dialog.isPresent()).toBe(true);

    //Fail for non-existant account
    element(by.model('ctrl.email')).sendKeys('@example.com');
    logIn.click();
    expect(dialog.isPresent()).toBe(true);
    
    //Success
    element(by.model('ctrl.email')).sendKeys('a@a.com');
    element(by.model('ctrl.password')).sendKeys('a');
    logIn.click();
    expect(dialog.isPresent()).toBe(false);
  });
});