angular
  .module('holidayApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/index.html'
    })
    .state('holidaysNew', {
      url: '/groups/:id/holidays/new',
      templateUrl: 'js/views/holidays/new.html',
      controller: 'HolidaysNewCtrl as holidaysNew'
    })
    .state('holidaysShow', {
      url: '/groups/:id/holidays/:holidayId',
      templateUrl: 'js/views/holidays/show.html',
      controller: 'HolidaysShowCtrl as holidaysShow'
    })
    .state('holidaysEdit', {
      url: '/groups/:id/holidays/:holidayId/edit',
      templateUrl: 'js/views/holidays/edit.html',
      controller: 'HolidaysEditCtrl as holidaysEdit'
    })
    .state('groupsIndex', {
      url: '/groups',
      templateUrl: 'js/views/groups/index.html',
      controller: 'GroupsIndexCtrl as groupsIndex'
    })
    .state('groupsNew', {
      url: '/groups/new',
      templateUrl: 'js/views/groups/new.html',
      controller: 'GroupsNewCtrl as groupsNew'
    })
    .state('groupsShow', {
      url: '/groups/:id',
      templateUrl: '/js/views/groups/show.html',
      controller: 'GroupsShowCtrl as groupsShow'
    })
    .state('groupsEdit', {
      url: '/groups/:id/edit',
      templateUrl: 'js/views/groups/edit.html',
      controller: 'GroupsEditCtrl as groupsEdit'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit',{
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })
    .state('flightsShow', {
      url: '/groups/:id/holidays/:holidayId/flights',
      templateUrl: 'js/views/flights/flight.html',
      controller: 'FlightsShowCtrl as flightsShow'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'LoginCtrl as login'
    });

    $urlRouterProvider.otherwise('/');
}
