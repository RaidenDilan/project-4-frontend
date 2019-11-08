angular
  .module('holidayApp', [
    'ui.router',
    'ngResource',
    'ngMessages',
    'satellizer',
    'ngMap',
    // 'ui.bootstrap',
    'ngAnimate',
    'ngMaterial',
    'checklist-model',
    'angular-momentjs'
  ])
  .constant('API_URL', 'http://localhost:3000/api');
