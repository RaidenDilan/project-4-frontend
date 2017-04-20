angular
  .module('holiday')
  // .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl);

// GroupsIndexCtrl.$inject = ['Group'];
// function GroupsIndexCtrl(Group) {
//   const vm = this;
//
//   vm.all = Group.query();
// }

GroupsNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state'];
function GroupsNewCtrl(Group, User, Holiday, $state) {
  const vm = this;

  vm.group = {};
  vm.users = User.query();

  function groupsCreate() {
    Group
      .save({ group: vm.group })
      .$promise
      .then((group) => $state.go('groupsShow', { id: group.id }));
  }
  vm.create = groupsCreate;
}

GroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state', '$auth'];
function GroupsShowCtrl(User, Group, Holiday, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.holiday = {};
  // vm.holiday = Holiday.query($stateParams);
  vm.holiday = Holiday.get($stateParams);
  console.log('Group Holidays',vm.holiday);
  // console.log('Group Holidays',$stateParams);

  Group.get($stateParams, (data) => {
    vm.group = data;
    console.log('This Group you are in', vm.group);
  });

  vm.group = Group.get($stateParams);
  console.log('This Group ID', $stateParams);

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('usersGroupsIndex'));
  }
  vm.delete = groupsDelete;

  function groupsUpdate() {
    Group
      .update({id: vm.group.id, group: vm.group });
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

GroupsEditCtrl.$inject = ['User', 'Group', '$stateParams', '$state'];
function GroupsEditCtrl(User, Group, $stateParams, $state) {
  const vm = this;

  vm.group = Group.get($stateParams);
  console.log('This group here', $stateParams);
  vm.users = User.query();

  function groupsUpdate() {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then(() => $state.go('groupsShow', $stateParams));
  }

  vm.update = groupsUpdate;
}
