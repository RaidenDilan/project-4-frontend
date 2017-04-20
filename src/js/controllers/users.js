angular
  .module('holiday')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersGroupsIndexCtrl', UsersGroupsIndexCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersShowCtrl(User, $stateParams, $state, $auth) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });
  // console.log('Logged in user',vm.user);

  function usersDelete() {
    $auth.logout();
    vm.user
      .$remove()
      .then(() => $state.go('login'));
  }
  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);
  // console.log($stateParams);
  // console.log(vm.user);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }
  vm.update = usersUpdate;
}

UsersGroupsIndexCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersGroupsIndexCtrl(User, $stateParams, $state, $auth) {
  const vm = this;

  vm.groups = User.get({ id: $auth.getPayload().id });

}
