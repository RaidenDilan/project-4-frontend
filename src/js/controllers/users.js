angular
  .module('holidayApp')
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

  // User.get($stateParams).$promise.then((user) => {
  //   vm.user = user;
  // });

  function usersUpdate() {
    // wrap the data in a `user` object and pass the user's id
    // to the model so it can generate the correct URL
    if(vm.usersEditForm.$valid) {
      User
        .update({ id: vm.user.id, user: vm.user })
        .$promise
        .then(() => $state.go('usersShow', $stateParams));
    }
  }
  vm.update = usersUpdate;
}
