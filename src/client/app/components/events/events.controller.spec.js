describe('EventsController', function() {

  var $controller;

  // load main app module
  beforeEach(module('project'));

  beforeEach(inject(function(_$controller_, _$injector_) {
    $controller = _$controller_;
    $injector = _$injector_;
  }));

  describe('instance', function() {
    it('should be defined', function() {
      var controller = $controller('EventsController', {$scope: {}});
      expect(controller).toBeDefined();
    });
  });

});
