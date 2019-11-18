angular
  .module('holidayApp')
  .controller('HolidaysNewCtrl', HolidaysNewCtrl)
  .controller('HolidaysShowCtrl', HolidaysShowCtrl)
  .controller('HolidaysEditCtrl', HolidaysEditCtrl)
  .controller('HolidaysDeleteCtrl', HolidaysDeleteCtrl);

HolidaysNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state', '$stateParams', '$moment', '$auth', '$log'];
function HolidaysNewCtrl(Group, User, Holiday, $state, $stateParams, $moment, $auth, $log) {
  const vm = this;

  vm.holiday = {};
  vm.user    = User.get({ id: $auth.getPayload().id });
  vm.group   = Group.get($stateParams);

  // console.log('$stateParams', $stateParams);
  // console.log('vm.group', vm.group);

  vm.holiday.departureDate = new Date();
  vm.holiday.returnDate    = new Date();

  vm.min = $moment().format("YYYY-MM-DD");
  console.log('vm.min', vm.min);

  // vm.holiday.departureDate = $moment(vm.holiday.departureDate).add(1, 'month').format("YYYY-MM-DD");
  // vm.holiday.returnDate = $moment(vm.holiday.returnDate).add(1, 'month').add(7, 'days').format("YYYY-MM-DD");

  vm.onDateChanged = () => {
    $log.log('Updated departureDate: ', vm.departureDate);
    $log.log('Updated returnDate: ', vm.returnDate);
  };

  function holidaysCreate() {
    if(vm.holidaysNewForm.$valid) {
      // vm.holiday.group_id = $stateParams.id; // we are passing in the group id here when creating a new holiday
      // vm.holiday.user_id = vm.user.id; // we are passing in the group id here when creating a new holiday

      Holiday
        .save({ id: $stateParams.id, holiday: vm.holiday })
        .$promise
        // .then((holiday) => $state.go('holidaysShow', { id: holiday.id }));
        .then((holiday) => {
          console.log('holiday ==?', holiday);
          return $state.go('holidaysShow', { id: vm.group.id, holidayId: holiday.id });
        });
    }
  }
  vm.create = holidaysCreate;
}

HolidaysShowCtrl.$inject = ['Holiday', 'Group', 'User', 'Comment', '$stateParams', '$state', '$auth', '$moment', '$mdDialog'];
function HolidaysShowCtrl(Holiday, Group, User, Comment, $stateParams, $state, $auth, $moment, $mdDialog) {
  const vm = this;

  vm.user = User.get({ id: $auth.getPayload().id });

  Group
    .get($stateParams)
    .$promise
    .then((group) => vm.group = group);

  Holiday
    .get($stateParams)
    .$promise
    .then((holiday) => {
      vm.holiday = holiday;
      vm.holiday.comments.forEach((comment) => comment.created_at = $moment(comment.created_at).fromNow());

      return vm.holiday;
    });

  // Opens modal asking for confirmation to delete group
  function holidayDeleteModal() {
    $mdDialog.show({
      controller: HolidaysDeleteCtrl,
      controllerAs: 'holidaysDelete',
      templateUrl: 'js/views/modals/holidayDeleteModal.html',
      parent: angular.element(document.body),
      targetEvent: vm.holiday,
      clickOutsideToClose: true,
      escapeToClose: true,
      fullscreen: false,
      resolve: {
        selectedHoliday: () => {
          return vm.holiday;
        }
      }
    });
  }
  vm.delete = holidayDeleteModal;

  function addComment() {
    vm.newComment.holiday_id = vm.holiday.id; // attaching the comment to the group id.

    Comment
      .save({ comment: vm.newComment })
      .$promise
      .then((comment) => {
        comment.created_at = $moment(comment.created_at).fromNow();
        vm.holiday.comments.push(comment);
        vm.newComment = {};
      });
  }
  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.holiday.comments.indexOf(comment);
        vm.holiday.comments.splice(index, 1);
      });
  }
  vm.deleteComment = deleteComment;
}

HolidaysEditCtrl.$inject = ['Holiday', 'Group', '$stateParams', '$state', '$moment'];
function HolidaysEditCtrl(Holiday, Group, $stateParams, $state, $moment) {
  const vm = this;

  vm.group = Group.get($stateParams);

  Holiday
    .get($stateParams)
    .$promise
    .then((holiday) => {
      vm.holiday = holiday;

      vm.holiday.departureDate = $moment().add('7', 'd').format("YYYY/MM/DD");
      vm.holiday.returnDate    = $moment().add('14', 'd').format("YYYY/MM/DD");

      return vm.holiday;
    });

  function holidaysUpdate() {
    if(vm.holidaysEditForm.$valid) {
      Holiday
        .update({ id: vm.group.id, holidayId: vm.holiday.id, holiday: vm.holiday })
        .$promise
        .then(() => $state.go('holidaysShow', $stateParams));

      console.log('vm.holiday', vm.holiday);
      console.log('vm.group', vm.group);
    }
  }
  vm.update = holidaysUpdate;
}

HolidaysDeleteCtrl.$inject = ['selectedHoliday', '$state', '$stateParams', '$mdDialog'];
function HolidaysDeleteCtrl(selectedHoliday, $state, $stateParams, $mdDialog) {
  const vm = this;
  vm.holiday = selectedHoliday;

  function closeModal() {
    $mdDialog.hide();
  }
  vm.close = closeModal;

  function holidaysDelete() {
    vm.holiday
      .$remove({ id: $stateParams.id, holidayId: vm.holiday.id })
      .then(() => {
        $state.go('groupsShow', $stateParams);
        $mdDialog.hide();
      });
  }
  vm.delete = holidaysDelete;
}
