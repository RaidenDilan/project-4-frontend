angular
  .module('holidayApp')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', 'Group', '$stateParams', '$location', 'Skyscanner', '$moment', 'resolvedHoliday', 'resolvedGroup', 'AnchorSmoothScroll'];
function FlightsShowCtrl(Holiday, Group, $stateParams, $location, Skyscanner, $moment, resolvedHoliday, resolvedGroup, AnchorSmoothScroll) {
  const vm = this;

  vm.group      = resolvedGroup;
  vm.holiday    = resolvedHoliday;
  vm.flights    = [];
  vm.dateFormat = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
  vm.isLoading  = false;

  function toggle() {
    vm.isLoading = !vm.isLoading;
	}
  vm.toggle = toggle;

  function toggleLoading() {
    vm.isLoading = vm.isLoading === false ? true : false;
  }
  vm.toggleLoading = toggleLoading;

  function gotoElement(eID) {
    // set the location.hash to the id of
    // the element you wish to scroll to.
    // $location.hash('flightsBoard');

    // call $anchorScroll()
    AnchorSmoothScroll.scrollTo(eID);
  }
  vm.gotoElement = gotoElement;

  function searchFlights() {
    if (vm.flightsShowForm.$valid) {
      vm.isLoading = true;
      queryFlights();
    }
  }
  vm.searchFlights = searchFlights;

  function queryFlights() {
    Skyscanner
      .getFlights(vm.holiday.departureAirport, vm.holiday.arrivalAirport, vm.holiday.departureDate, vm.holiday.returnDate)
      .then((quotes) => {
        vm.flights   = quotes;
        vm.isLoading = false;

        gotoElement('flightsResults');

        return quotes;
      });
  }
}

FlightsShowCtrl.resolve = {
  resolvedHoliday: ($stateParams, Holiday) => Holiday.get($stateParams),
  resolvedGroup: ($stateParams, Group) => Group.get($stateParams)
};
