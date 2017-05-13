angular
  .module('holiday')
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsNewCtrl.$inject = ['Group', 'User', '$state', '$auth'];
function GroupsNewCtrl(Group, User, $state, $auth) {
  const vm = this;

  vm.group = {};
  vm.user = User.get({ id: $auth.getPayload().id });
  vm.users = User.query();

  function groupsCreate() {
    if(vm.groupsNewForm.$valid) {
      Group
      .save({ group: vm.group })
      .$promise
      .then((group) => $state.go('usersGroupsIndex', { id: group.id }));
      vm.groupsNewForm.$setPristine();
      vm.groupsNewForm.$setUntouched();
    }
  }
  vm.create = groupsCreate;
}

GroupsEditCtrl.$inject = ['User', 'Group', '$stateParams', '$state'];
function GroupsEditCtrl(User, Group, $stateParams, $state) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.users = User.query();

  function groupsUpdate() {
    if(vm.groupsEditForm.$valid) {
      Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then(() => $state.go('usersGroupsShow', $stateParams));
      vm.groupsEditForm.$setPristine();
      vm.groupsEditForm.$setUntouched();
    }
  }
  vm.update = groupsUpdate;
}
