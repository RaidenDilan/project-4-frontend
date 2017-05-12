angular.module('holiday')
  .controller('AttendeeShowCtrl', AttendeeShowCtrl);

AttendeeShowCtrl.$inject = ['User', '$state', 'Group'];
function AttendeeShowCtrl(User, $state, Group) {
  const vm = this;

  vm.user = User.get($state.params, (attendee)=> {
    // find all the locations with user id
    vm.groups = Group.query({ attendee: attendee.id });
  });

}
