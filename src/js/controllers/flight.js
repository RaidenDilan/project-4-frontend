angular
  .module('holiday')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', '$stateParams', 'skyscanner'];
function FlightsShowCtrl(Holiday, $stateParams, skyscanner) {
  const vm = this;

  vm.flights = [];

  Holiday.get($stateParams).$promise.then((holiday) => {
    holiday.departureDate = new Date(holiday.departureDate);
    holiday.returnDate = new Date(holiday.returnDate);
    vm.holiday = holiday;
  });

  function searchFlights() {
    getFlights();
  }

  vm.searchFlights = searchFlights;

  function getFlights() {
    skyscanner.getFlights(vm.holiday.departureAirport, vm.holiday.arrivalAirport, vm.holiday.departureDate, vm.holiday.returnDate) // put the departure and arrival date, this is also how it is called in the flights form
      .then((quotes) => {
        vm.flights = quotes;
      });
  }
}
