angular
  .module('holiday')
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersGroupsIndexCtrl', UsersGroupsIndexCtrl)
  .controller('UsersGroupsShowCtrl', UsersGroupsShowCtrl);

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

  vm.user = User.get({ id: $auth.getPayload().id});
  // console.log({ id: $auth.getPayload().id});

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

UsersGroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state', '$auth'];
function UsersGroupsShowCtrl(User, Group, Holiday, $stateParams, $state, $auth) {
  const vm = this;

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  Group.get($stateParams, (data) => {
    vm.group = data;
  });

  vm.group = Group.get($stateParams);

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('usersGroupsIndex'));
  }
  vm.delete = groupsDelete;

  function groupsUpdate() {
    Group
      .update({ id: vm.group.id, group: vm.group });
  }

  function toggleAttending() {
    const index = vm.group.attendee_ids.indexOf(vm.currentUser.id);
    if(index > -1) {
      vm.group.attendee_ids.splice(index, 1);
      vm.group.attendees.splice(index, 1);
    } else {
      vm.group.attendee_ids.push(vm.currentUser.id);
      vm.group.attendees.push(vm.currentUser);
    }
    groupsUpdate();
  }

  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() && vm.group.$resolved && vm.group.attendee_ids.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}
