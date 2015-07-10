// spec.js
describe('Protractor Demo App', function() {
  var rootURL = "http://localhost:4000/#/";
  var navItems = ["", "station", "pic", "feeds", "gb", "shopping"];

  beforeEach(function() {
    browser.get(rootURL);

  });

  it('navigation test', function() {
    element.all(By.tagName('a')).click();
  });
 /*
  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Super Calculator');
  });

  it('should add one and two', function() {
    firstNumber.sendKeys(1);
    secondNumber.sendKeys(2);

    goButton.click();

    expect(latestResult.getText()).toEqual('3');
  });

  it('should add four and six', function() {
    // Fill this in.
    expect(latestResult.getText()).toEqual('10');
  });
  */
});
