angular
  .module('holiday')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function MainCtrl($rootScope, $state, $auth, User) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload() && !vm.currentUser) vm.currentUser = User.get($auth.getPayload());
  });

  const protectedStates = ['holidaysNew', 'holidaysEdit', 'groupsNew', 'usersGroupsEdit']; // ANY PAGES YOU DON'T WANT ANYONE TO HAVE ACCESS, PROTECT IT. IT WILL REDIRECT THE CLIENT TO THE LOGIN PAGE AND DISPPLAY A MESSAGE 'You must be logged in'.

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
    vm.pageName = toState.name;
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
