'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /welcome-card when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/welcome-card");
  });


  describe('welcome-card', function() {

    beforeEach(function() {
      browser.get('index.html#!/welcome-card');
    });


    it('should render welcome-card when user navigates to /welcome-card', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('home-page', function() {

    beforeEach(function() {
      browser.get('index.html#!/home-page');
    });


    it('should render home-page when user navigates to /home-page', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
