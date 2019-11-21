angular
  .module('holidayApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User', 'ToastAlertService'];
function MainCtrl($rootScope, $state, $auth, User, ToastAlertService) {
  const vm = this;

  if ($auth.getPayload()) vm.loggedInUser = User.get({ id: $auth.getPayload().id });

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', stateErrors);
  $rootScope.$on('$stateChangeStart', secureState);
  $rootScope.$on('$stateChangeSuccess', authenticateState);

  function stateErrors(e, err) {
    vm.stateHasChanged = false;
    vm.message = err.data.errors;

    if(err.status === 401) {
      $state.go('login');
      // vm.message = 'Something went wrong!';
      // ToastAlertService.customToast(vm.message, 5000, 'error');
    }
  }

  function authenticateState(event, toState, toParams, fromState, fromParams) {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    // window.scrollTo(0, 0); // workaround to scroll back to top of page on page change
    if (vm.stateHasChanged) document.body.scrollTop = document.documentElement.scrollTop = 0; // BUG????

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

  const protectedStates = [
    'holidaysNew',
    'holidaysEdit',
    'holidaysShow',
    'groupsNew',
    'groupsEdit',
    'groupsShow',
    'groupsIndex',
    'usersShow',
    'usersEdit',
    'flightsShow'
  ];

  function secureState(event, toState, toParams, fromState, fromParams) {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      event.preventDefault();
      $state.go('login');
      ToastAlertService.customToast('You must be logged in to access this page.', 4000, 'warning');
    }
    vm.pageName = toState.name;
  }

  function logout() {
    $auth
      .logout()
      .then(() => $state.go('home'));
  }
  vm.logout = logout;
}
