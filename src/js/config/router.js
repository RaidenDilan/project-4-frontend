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
//-------------------------------ADVENTURER-----------------------------------//
.state('attendeeShow', {
  url: '/attendee/:id',
  templateUrl: '/js/views/attendees/attendee.html',
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
.state('groupsNew', {
  url: '/groups/new',
  templateUrl: 'js/views/groups/new.html',
  controller: 'GroupsNewCtrl as groupsNew'
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
//-----------------------------USER'S GROUPS----------------------------------//
  .state('usersGroupsIndex', {
    url: '/groups',
    templateUrl: 'js/views/users/groups/index.html',
    controller: 'UsersGroupsIndexCtrl as usersGroupsIndex'
  })
  .state('usersGroupsShow', {
    url: '/groups/:id',
    templateUrl: '/js/views/groups/show.html',
    controller: 'UsersGroupsShowCtrl as usersGroupsShow'
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
