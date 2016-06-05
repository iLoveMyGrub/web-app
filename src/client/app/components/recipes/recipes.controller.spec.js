'use strict';

describe('project.recipes module', function() {

  beforeEach(module('project'));

  describe('Recipes controller', function() {

    it('should be defined', inject(function($controller) {

      // Spec body
      var AboutController = $controller('RecipesController');

      expect(AboutController).toBeDefined();

    }));

  });
});