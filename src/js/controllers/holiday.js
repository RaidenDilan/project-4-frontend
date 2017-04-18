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

HolidaysNewCtrl.$inject = ['User', 'Holiday', '$state'];
function HolidaysNewCtrl(User, Holiday, $state) {
  const vm = this;

  vm.holiday = {};

  function holidaysCreate() {
    Holiday
      .save({ holiday: vm.holiday })
      .$promise
      .then(() => $state.go('holidaysIndex'));
  }

  vm.create = holidaysCreate;
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
