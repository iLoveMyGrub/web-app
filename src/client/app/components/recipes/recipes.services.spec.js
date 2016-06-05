describe('project.recipes service', function() {

  var RecipesDataService;
  var httpBackend;

  beforeEach(module('project'));

  beforeEach(inject(function(_RecipesDataService_, $httpBackend) {
    RecipesDataService = _RecipesDataService_;
    httpBackend = $httpBackend;
  }));

  describe('Recipes Service', function() {

    it('should be defined', inject(function($controller) {

      // Spec body
      expect(RecipesDataService).toBeDefined();

    }));

  });
});