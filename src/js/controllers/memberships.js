angular
  .module('holidayApp')
  .controller('MembershipCtrl', MembershipCtrl);

MembershipCtrl.$inject = ['Group', 'Membership', '$stateParams', '$auth', '$state', '$mdDialog'];
function MembershipCtrl(Group, Membership, $stateParams, $auth, $state, $mdDialog) {
  const vm = this;

  vm.membership    = {};
  vm.group         = Group.get($stateParams);
  vm.currentUserId = $auth.getPayload().id;

  // vm.selected   = selectedMember;
  // vm.hide       = () => $mdDialog.hide();
  // vm.cancel     = () => $mdDialog.cancel();
  // vm.showUserId = (userId) => $mdDialog.hide(userId);

  function membershipCreate() {
    vm.membership.group_id = vm.group.id;

    Membership
      .save({ membership: vm.membership })
      .$promise
      .then(() => $state.go('groupsShow', { id: vm.group.id }, { reload: true }));

      closeModal();
  }
  vm.create = membershipCreate;

  function membershipDelete() {
    const membership = vm.group.memberships.find((membership) => membership.user.id === vm.currentUserId);

    Membership
      .remove({ id: membership.id })
      .$promise
      .then(() => $state.go('groupsIndex'));
      // .then(() => $state.go('groupsIndex', { id: vm.group.id }, { reload: true }));

    closeModal();
  }
  vm.delete = membershipDelete;

  function closeModal() {
    $mdDialog.cancel();
  }
  vm.close = closeModal;
}
