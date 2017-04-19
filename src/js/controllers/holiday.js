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

  vm.group = Group.query($stateParams);
  // vm.group = Group.get($stateParams);
  // console.log('1 Group', vm.group.id);
  console.log('2 Group', vm.group);
  // console.log('3 Group', vm.group.ids);
  // console.log('4 Group', vm.group.id);
  console.log('Current Group', vm.group.id);
  console.log('Groups', vm.group);
  console.log('Group id', $stateParams);

  function holidaysCreate() {
    Holiday
      .save({ holiday: vm.holiday, group: vm.group })
      .$promise
      .then((holiday) => $state.go('holidaysShow', { id: holiday.id }));
  }
  vm.create = holidaysCreate;
  console.log('Current Group', vm.group);
}

HolidaysShowCtrl.$inject = ['Holiday', '$stateParams', '$state'];
function HolidaysShowCtrl(Holiday, $stateParams, $state) {
  const vm = this;

  vm.holiday = Holiday.get($stateParams);
  console.log('Holiday Show', $stateParams);

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

  function holidaysUpdate() {
    Holiday
      .update({ id: vm.holiday.id, holiday: vm.holiday })
      .$promise
      .then(() => $state.go('holidaysShow', $stateParams));
  }
  vm.update = holidaysUpdate;
}
