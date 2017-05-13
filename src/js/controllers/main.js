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

    // vm.currentUser = User.get($auth.getPayload());
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload() && !vm.currentUser) vm.currentUser = User.get($auth.getPayload());
    // console.log('1', vm.currentUser);
    // console.log('2', !vm.currentUser);
    // console.log('3', !!vm.currentUser);
    // console.log('4', $auth.getPayload());
  });

  const protectedStates = ['holidaysNew', 'holidaysEdit', 'groupsNew', 'groupsEdit', 'groupsShow', 'attendeesShow', 'usersShow'];

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
