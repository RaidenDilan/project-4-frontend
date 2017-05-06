angular
  .module('holiday')
  .controller('HolidaysNewCtrl', HolidaysNewCtrl)
  .controller('HolidaysShowCtrl', HolidaysShowCtrl)
  .controller('HolidaysEditCtrl', HolidaysEditCtrl);

HolidaysNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state', '$stateParams'];
function HolidaysNewCtrl(Group, User, Holiday, $state, $stateParams) {
  const vm = this;

  vm.holiday = {};

  function holidaysCreate() {
    vm.holiday.group_id = $stateParams.id; // we are passing in the group id here when creating a new holiday
    Holiday
      .save({ holiday: vm.holiday })
      .$promise
      .then((holiday) => $state.go('holidaysShow', { id: holiday.id }));
  }
  vm.create = holidaysCreate;
}

HolidaysShowCtrl.$inject = ['Holiday', '$stateParams', '$state', 'Comment'];
function HolidaysShowCtrl(Holiday, $stateParams, $state, Comment) {
  const vm = this;

  vm.holiday = Holiday.get($stateParams);

  function holidaysDelete() {
    vm.holiday
      .$remove()
      .then(() => $state.go('usersGroupsIndex'));
  }

  vm.delete = holidaysDelete;

  function addComment() {
    vm.comment.holiday_id = vm.holiday.id; // attaching the comment to the group id.

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.holiday.comments.push(comment);
        vm.comment = {}; // this clears the form out when the comment has been submitted
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id }) // pass in the comment_id we are delete and splice it out.
      .$promise
      .then(() => {
        const index = vm.holiday.comments.indexOf(comment);
        vm.holiday.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
}

HolidaysEditCtrl.$inject = ['Holiday', '$stateParams', '$state'];
function HolidaysEditCtrl(Holiday, $stateParams, $state) {
  const vm = this;

  Holiday.get($stateParams).$promise.then((holiday) => {
    console.log($stateParams);
    holiday.departureDate = new Date(holiday.departureDate); // run this logic first before vm.holiday runs underneath this line.
    holiday.returnDate = new Date(holiday.returnDate); // run this logic first before vm.holiday runs underneath this line.
    vm.holiday = holiday;
  });

  function holidaysUpdate() {
    Holiday
      .update({ id: vm.holiday.id, holiday: vm.holiday })
      .$promise
      .then(() => $state.go('holidaysShow', $stateParams));
  }
  vm.update = holidaysUpdate;
}
