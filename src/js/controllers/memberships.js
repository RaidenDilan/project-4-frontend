angular
  .module('holidayApp')
  .controller('MembershipsCtrl', MembershipsCtrl);

MembershipsCtrl.$inject = ['Group', 'User', 'Membership', '$stateParams', '$auth', '$state', '$uibModalInstance'];
function MembershipsCtrl(Group, User, Membership, $stateParams, $auth, $state, $uibModalInstance) {
  const vm = this;

  vm.membership    = {};
  vm.group         = Group.get($stateParams);
  vm.currentUserId = $auth.getPayload().id;

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function membershipDelete() {
    const membership = vm.group.memberships.find((membership) => {
      return membership.user.id === vm.currentUserId;
    });

    Membership
      .remove({ id: membership.id })
      .$promise
      .then(() => $state.go('groupsShow', { id: vm.group.id }, { reload: true }));

    closeModal();
  }
  vm.delete = membershipDelete;
}
