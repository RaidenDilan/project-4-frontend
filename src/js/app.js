angular
  .module('holiday', ['ui.router', 'ngResource', 'satellizer', 'ngMap', 'ui.bootstrap', 'ngAnimate', 'checklist-model'])
  .constant('API_URL', 'http://localhost:3000/api');
