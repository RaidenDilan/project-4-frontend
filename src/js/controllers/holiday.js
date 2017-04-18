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

  // vm.user = User.get($stateParams);
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
  // getBudget(); ////////////////////

  function holidaysDelete() {
    vm.holiday
      .$remove()
      .then(() => $state.go('holidaysIndex'));
  }
  vm.delete = holidaysDelete;

  // function getBudget() {
  //   Holiday.get($stateParams).$promise.then((holiday) => {
  //     vm.holiday = holiday;
  //     getFlights();
  //   });
  //
  //   vm.flights = [];
  //
  //   function getFlights() {
  //     skyscanner.getFlights(vm.holiday.nearest_airport)
  //       .then((quotes) => {
  //         vm.flights = quotes;
  //       });
  //   }
  // }
}

HolidaysEditCtrl.$inject = ['Holiday', '$stateParams', '$state'];
function HolidaysEditCtrl(Holiday, $stateParams, $state) {
  const vm = this;

  vm.holiday = Holiday.get($stateParams);

  function holidaysUpdate() {
    Holiday
      .update({ id: vm.holiday.id, holiday: vm.holiday })
      .$promise
      .then(() => $state.go('holidaysShow', $stateParams));
  }

  vm.update = holidaysUpdate;
}
