angular
  .module('holiday')
  .controller('HolidaysIndexCtrl', HolidaysIndexCtrl)
  .controller('HolidaysNewCtrl', HolidaysNewCtrl)
  .controller('HolidaysShowCtrl', HolidaysShowCtrl)
  .controller('HolidaysEditCtrl', HolidaysEditCtrl);

HolidaysIndexCtrl.$inject = ['Holiday'];
function HolidaysIndexCtrl(Holiday) {
  const vm = this;

  vm.all = Holiday.query();
}

HolidaysNewCtrl.$inject = ['Group', 'User', 'Holiday', '$state', '$stateParams'];
function HolidaysNewCtrl(Group, User, Holiday, $state, $stateParams) {
  const vm = this;

  vm.holiday = {};

  vm.group = Group.get($stateParams);
  console.log('My Groups', vm.group);
  console.log('Group ID', $stateParams);
  // console.log('Group ID', $state.params);

  function holidaysCreate() {
    vm.holiday.group_id = vm.group.id; // we are passing in the group id here when creating a new holiday
    Holiday
      .save({ holiday: vm.holiday, group: vm.group })
      .$promise
      .then((holiday) => $state.go('holidaysShow', { id: holiday.id }));
  }
  vm.create = holidaysCreate;
}

HolidaysShowCtrl.$inject = ['Holiday', '$stateParams', '$state'];
function HolidaysShowCtrl(Holiday, $stateParams, $state) {
  const vm = this;

  vm.holiday = Holiday.get($stateParams);
  console.log('Holiday Show ID', $stateParams);
  console.log('Holiday Show', vm.holiday);

  function holidaysDelete() {
    vm.holiday
      .$remove()
      .then(() => $state.go('holidaysIndex'));
  }
  vm.delete = holidaysDelete;
}

HolidaysEditCtrl.$inject = ['Holiday', '$stateParams', '$state'];
function HolidaysEditCtrl(Holiday, $stateParams, $state) {
  const vm = this;

  vm.holiday = Holiday.get($stateParams);
  console.log('Holiday Edit', $stateParams);

  Holiday.get($stateParams).$promise.then((holiday) => {
    vm.holiday = holiday;
    vm.holiday.date = new Date(holiday.date);
    console.log('vm.holiday.date', vm.holiday.date);
  });

  function holidaysUpdate() {
    Holiday
      .update({ id: vm.holiday.id, holiday: vm.holiday })
      .$promise
      .then(() => $state.go('holidaysShow', $stateParams));
  }
  vm.update = holidaysUpdate;
}
