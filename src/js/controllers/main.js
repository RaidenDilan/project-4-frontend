angular
  .module('holidayApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User', 'ToastAlertService']; // 'Flash'
function MainCtrl($rootScope, $state, $auth, User, ToastAlertService) { // Flash
  const vm = this;

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

  if ($auth.getPayload()) vm.loggedInUser = User.get({ id: $auth.getPayload().id });

  vm.isAuthenticated = $auth.isAuthenticated;
  vm.toastDelay      = 4000;
  // vm.flash = Flash;

  $rootScope.$on('error', stateErrors);
  $rootScope.$on('$stateChangeStart', secureState);
  $rootScope.$on('$stateChangeSuccess', authenticateState);

  function stateErrors(e, err) {
    vm.stateHasChanged = false;
    vm.message = err.data.errors;

    console.log('err.data.errors', err.data.errors);

    ToastAlertService.customToast(vm.message, 5000, 'error');
    // vm.message = err.data.errors.toString();
    // Flash.setMessage(vm.message);
    // vm.flash.setMessage(vm.message);
    if(err.status === 401) $state.go('login');
  }

  function authenticateState(event, toState, toParams, fromState, fromParams) {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if (vm.stateHasChanged) document.body.scrollTop = document.documentElement.scrollTop = 0; // BUG????

    if ($auth.getPayload()) {
      vm.currentUser = $auth.getPayload();

      return User
        .get({ id: vm.currentUser.id })
        .$promise
        .then((user) => {
          vm.user = user;
          console.log('authenticateState:: vm.user', vm.user);

          if ((toState.name === 'propertiesIndex' && vm.user.group === null) && protectedStates.includes(toState.name)) {
            event.preventDefault();
            $state.go('groupsNew');
          }
          return !vm.user.group ? vm.currentGroupId = null : vm.currentGroupId = vm.user.group.id;
        });
    }
  }

  function secureState(e, toState, toParams, fromState, fromParams) {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      // console.log('$auth.isAuthenticated()', $auth.isAuthenticated());

      // console.log('!$auth.isAuthenticated() && protectedStates.includes(toState.name)', !$auth.isAuthenticated() && protectedStates.includes(toState.name));
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
      ToastAlertService.customToast(vm.message, vm.toastDelay, 'warning');
    }
    vm.pageName = toState.name;
  }

  function logout() {
    $auth.logout().then(() => $state.go('home'));
  }
  vm.logout = logout;
}
