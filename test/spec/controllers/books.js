'use strict';

describe('Controller: BooksctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('crudAppApp'));

  var BooksctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BooksctrlCtrl = $controller('BooksctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BooksctrlCtrl.awesomeThings.length).toBe(3);
  });
});
