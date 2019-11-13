angular
  .module('holidayApp')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', 'Group', '$stateParams', 'Skyscanner', '$moment'];
function FlightsShowCtrl(Holiday, Group, $stateParams, Skyscanner, $moment) {
  const vm = this;

  vm.flights    = [];
  vm.group      = Group.get($stateParams);
  vm.dateFormat = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

  Holiday
    .get($stateParams)
    .$promise
    .then((holiday) => {
      vm.holiday = holiday;

      vm.holiday.departureDate = $moment().add('7', 'd').format("YYYY-MM-DD");
      vm.holiday.returnDate    = $moment().add('14', 'd').format("YYYY-MM-DD");

      return vm.holiday;
  });

  function searchFlights() {
    if (vm.flightsShowForm.$valid) getFlights();
  }
  vm.searchFlights = searchFlights;

  function getFlights() {
    Skyscanner
      .getFlights(
        vm.holiday.departureAirport,
        vm.holiday.arrivalAirport,
        vm.holiday.departureDate,
        vm.holiday.returnDate
      )
      .then((quotes) => vm.flights = quotes);
  }
}
