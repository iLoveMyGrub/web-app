describe('FrontpageController', function() {

  var $controller;

  // load main app module
  beforeEach(module('project'));

  beforeEach(inject(function(_$controller_, _$injector_) {
    $controller = _$controller_;
    $injector = _$injector_;
  }));

  describe('instance', function() {
    it('should be defined', function() {
      var controller = $controller('FrontpageController', {$scope: {}});
      expect(controller).toBeDefined();
    });
  });

});
