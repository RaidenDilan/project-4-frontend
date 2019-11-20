angular
  .module('holidayApp')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersDeleteCtrl', UsersDeleteCtrl);

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

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth', '$mdDialog'];
function UsersShowCtrl(User, $stateParams, $state, $auth, $mdDialog) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });

  function userDeleteModal() {
    $mdDialog.show({
      controller: UsersDeleteCtrl,
      controllerAs: 'usersDelete',
      templateUrl: 'js/views/modals/userDeleteModal.html',
      parent: angular.element(document.body),
      targetEvent: vm.user,
      clickOutsideToClose: true,
      escapeToClose: true,
      fullscreen: false,
      resolve: {
        selectedUser: () => {
          return vm.user;
        }
      }
    });
  }
  vm.delete = userDeleteModal;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    if(vm.usersEditForm.$valid) {
      User
        .update({ id: vm.user.id, user: vm.user })
        .$promise
        .then(() => $state.go('usersShow', $stateParams));
    }
  }
  vm.update = usersUpdate;
}

UsersDeleteCtrl.$inject = ['selectedUser', '$state', '$auth', '$mdDialog'];
function UsersDeleteCtrl(selectedUser, $state, $auth, $mdDialog) {
  const vm = this;
  vm.user = selectedUser;

  function closeModal() {
    $mdDialog.hide();
  }
  vm.close = closeModal;

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go('login');
        closeModal();
      });
  }
  vm.delete = usersDelete;
}
