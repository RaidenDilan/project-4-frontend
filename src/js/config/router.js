angular
  .module('holiday')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'js/views/index.html'
  })
//-------------------------------ATTENDEES------------------------------------//
.state('attendeesShow', {
  url: '/attendees/:id',
  templateUrl: '/js/views/attendees/show.html',
  controller: 'AttendeeShowCtrl as attendeeShow'
})
//---------------------------------HOLIDAY------------------------------------//
  .state('holidaysNew', {
    url: '/groups/:id/holidays/new',
    templateUrl: 'js/views/holidays/new.html',
    controller: 'HolidaysNewCtrl as holidaysNew'
  })
  .state('holidaysShow', {
    url: '/holidays/:id',
    templateUrl: 'js/views/holidays/show.html',
    controller: 'HolidaysShowCtrl as holidaysShow'
  })
  .state('holidaysEdit', {
    url: '/holidays/:id/edit',
    templateUrl: 'js/views/holidays/edit.html',
    controller: 'HolidaysEditCtrl as holidaysEdit'
  })
//---------------------------------GROUP--------------------------------------//
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
//----------------------------------USERS-------------------------------------//
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
//----------------------------------BUDGET------------------------------------//
  .state('flightsShow', {
    url: '/holidays/:id/flights',
    templateUrl: 'js/views/flights/flight.html',
    controller: 'FlightsShowCtrl as flightsShow'
  })
//-----------------------------LOGIN & REGISTER-------------------------------//
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
