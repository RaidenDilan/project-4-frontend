angular
  .module('holiday')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsIndexCtrl.$inject = ['Group'];
function GroupsIndexCtrl(Group) {
  const vm = this;

  vm.all = Group.query();
}

GroupsNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state'];
function GroupsNewCtrl(Group, User, Holiday, $state) {
  const vm = this;

  vm.group = {};
  vm.user = {};
  vm.allUsers = User.query();

  function groupsCreate() {
    Group
      .save({ group: vm.group })
      .$promise
      .then((group) => $state.go('groupsShow', { id: group.id }));
  }

  vm.create = groupsCreate;
}

GroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state'];
function GroupsShowCtrl(User, Group, Holiday, $stateParams, $state) {
  const vm = this;

  // vm.user = {};

  // vm.holiday = Holiday.get($stateParams);

  vm.group = Group.get($stateParams); // --------------- SHIIIIIIIIT!!!🖕🏻
  console.log('Group', $stateParams);

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('groupsIndex'));
  }
  vm.delete = groupsDelete;
}

GroupsEditCtrl.$inject = ['Group', '$stateParams', '$state'];
function GroupsEditCtrl(Group, $stateParams, $state) {
  const vm = this;

  vm.group = Group.get($stateParams);

  function groupsUpdate() {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then(() => $state.go('groupsShow', $stateParams));
  }

  vm.update = groupsUpdate;
}
