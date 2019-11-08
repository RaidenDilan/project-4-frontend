angular
  .module('holidayApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function MainCtrl($rootScope, $state, $auth, User) {
  const vm = this;
  const protectedStates = ['holidaysNew', 'holidaysEdit', 'holidaysShow', 'groupsNew', 'groupsEdit', 'groupsShow', 'groupsIndex', 'attendeesShow', 'usersShow', 'flightsShow'];

  if ($auth.getPayload()) vm.loggedInUser = User.get({ id: $auth.getPayload().id });

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', stateErrors);
  $rootScope.$on('$stateChangeStart', secureState);
  $rootScope.$on('$stateChangeSuccess', authenticateState);

  function stateErrors(event, err) {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  }

  function authenticateState(event, toState, toParams, fromState, fromParams) {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if ($auth.getPayload()) {
      vm.currentUser = $auth.getPayload();

      return User
        .get({ id: vm.currentUser.id })
        .$promise
        .then((user) => {
          vm.user = user;
          if ((toState.name === 'propertiesIndex' && vm.user.group === null) && protectedStates.includes(toState.name)) {
            event.preventDefault();
            $state.go('groupsNew');
          }
          return !vm.user.group ? vm.currentGroupId = null : vm.currentGroupId = vm.user.group.id;
        });
    }
  }

  function secureState(event, toState, toParams, fromState, fromParams) {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
    vm.pageName = toState.name;
  }

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
