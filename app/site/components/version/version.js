'use strict';

angular.module('project.version', [
  'project.version.interpolate-filter',
  'project.version.version-directive'
])

.value('version', '0.1');
