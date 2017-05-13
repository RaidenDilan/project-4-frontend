angular
  .module('holiday')
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl)
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl);

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

GroupsIndexCtrl.$inject = ['User', 'Group', '$stateParams', '$state', '$auth'];
function GroupsIndexCtrl(User, Group, $stateParams, $state, $auth) {
  const vm = this;

  vm.groups = User.get({ id: $auth.getPayload().id });
}

GroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state', '$auth'];
function GroupsShowCtrl(User, Group, Holiday, $stateParams, $state, $auth) {
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
