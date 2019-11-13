angular
  .module('holidayApp', [
    'ui.router',
    'ngResource',
    'ngMessages',
    'satellizer',
    'ngAnimate',
    'ngMaterial',
    'angular-momentjs'
  ])
  .constant('API_URL', 'http://localhost:3000/api');
