angular
  .module('holidayApp')
  .controller('HolidaysNewCtrl', HolidaysNewCtrl)
  .controller('HolidaysShowCtrl', HolidaysShowCtrl)
  .controller('HolidaysEditCtrl', HolidaysEditCtrl);

HolidaysNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state', '$stateParams', '$moment'];
function HolidaysNewCtrl(Group, User, Holiday, $state, $stateParams, $moment) {
  const vm = this;

  vm.holiday = {};

  // vm.holiday.departureDate = $moment(vm.holiday.departureDate).add(1, 'month').format("YYYY-MM-DD");
  // vm.holiday.returnDate = $moment(vm.holiday.returnDate).add(1, 'month').add(7, 'days').format("YYYY-MM-DD");

  function holidaysCreate() {
    if(vm.holidaysNewForm.$valid) {
      vm.holiday.group_id = $stateParams.id; // we are passing in the group id here when creating a new holiday

      Holiday
        .save({ holiday: vm.holiday })
        .$promise
        .then((holiday) => $state.go('holidaysShow', { id: holiday.id }));
    }
  }
  vm.create = holidaysCreate;
}

HolidaysShowCtrl.$inject = ['Holiday', 'Group', 'User', '$stateParams', '$state', '$auth', 'Comment'];
function HolidaysShowCtrl(Holiday, Group, User, $stateParams, $state, $auth, Comment) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });
  vm.group = Group.get($stateParams);
  vm.holiday = Holiday.get($stateParams);

  console.log('vm.holiday', vm.holiday);

  function holidaysDelete() {
    vm.holiday
      .$remove()
      .then(() => $state.go('usersGroupsIndex'));
  }
  vm.delete = holidaysDelete;

  function addComment() {
    vm.newComment.holiday_id = vm.holiday.id; // attaching the comment to the group id.

    Comment
      .save({ id: vm.group.id, holidayId: vm.holiday.id }, vm.newComment)
      .$promise
      .then((comment) => {
        console.log('comment created :::', comment);
        vm.holiday.comments.push(comment);
        vm.newComment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: vm.group.id, holidayId: vm.holiday.id, commentId: comment.id })
      .$promise
      .then(() => {
        const index = vm.holiday.comments.indexOf(comment);
        vm.holiday.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;

  // Holiday.get($state.params, (holiday) => {
  //   vm.holiday = holiday;
  //   vm.center = {};
  //
  // // Google Map
  //   MapService
  //   .getCoords(vm.holiday.location)
  //   .then(res => {
  //     vm.center = res;
  //   }, err => {
  //     console.log(err);
  //   });
  // });
}

HolidaysEditCtrl.$inject = ['Holiday', '$stateParams', '$state', '$moment'];
function HolidaysEditCtrl(Holiday, $stateParams, $state, $moment) {
  const vm = this;

  Holiday
    .get($stateParams)
    .$promise.then((holiday) => {
      vm.holiday = holiday;

      console.log(vm.holiday);

      // holiday.departureDate = new Date(holiday.departureDate); // run this logic first before vm.holiday runs underneath this line.
      // holiday.returnDate = new Date(holiday.returnDate); // run this logic first before vm.holiday runs underneath this line.

      holiday.departureDate = $moment(holiday.departureDate).add(1, 'month').format("YYYY-MM-DD");
      holiday.returnDate = $moment(holiday.returnDate).add(1, 'month').add(7, 'days').format("YYYY-MM-DD");

      // holiday.departureDate = $moment(holiday.departureDate).format("YYYY-MM-DD");
      // holiday.returnDate = $moment(holiday.returnDate).format("YYYY-MM-DD");

      return vm.holiday;
  });

  function holidaysUpdate() {
    if(vm.holidaysEditForm.$valid) {
      Holiday
        .update({ id: vm.holiday.id, holiday: vm.holiday })
        .$promise
        .then(() => $state.go('holidaysShow', $stateParams));
    }
  }
  vm.update = holidaysUpdate;
}
