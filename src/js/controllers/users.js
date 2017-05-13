angular
  .module('holiday')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['User', '$auth', '$stateParams'];
function UsersIndexCtrl(User, $auth, $stateParams) {
  const vm = this;

  vm.all = User.query();

  const payload = $auth.getPayload();
  const currentUser = payload;

  vm.user = User.get($stateParams);

  function checkUser() {
    if (vm.user.id === currentUser.id) {
      return true;
    } else {
      return false;
    }
  }
  checkUser();
}

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersShowCtrl(User, $stateParams, $state, $auth) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });

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

  function usersUpdate() {
    if(vm.usersEditForm) {
      vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
    }
  }
  vm.update = usersUpdate;
}
