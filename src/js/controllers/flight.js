angular
  .module('holiday')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', '$stateParams', 'skyscanner'];
function FlightsShowCtrl(Holiday, $stateParams, skyscanner) {
  const vm = this;

  vm.all = Holiday.get($stateParams);
  // console.log('vm.all', vm.all);
  // console.log('Flights Show stateParams', $stateParams);

  Holiday.get($stateParams).$promise.then((holiday) => {
    // console.log('Holiday Flights stateParams', $stateParams);
    vm.holiday = holiday;
    vm.holiday.date = new Date(holiday.date);
    // console.log('vm.holiday.date', vm.holiday.date);
    getFlights();
  });

  vm.flights = [];

  function getFlights() {
    skyscanner.getFlights(vm.holiday.departureAirport, vm.holiday.arrivalAriport) // put the departure and arrival date, this is also how it is called in the flights form
      .then((quotes) => {
        // console.log('Flights Controller nearest_airport', vm.holiday.nearest_airport);
        // console.log('Flights Controller quotes', quotes);
        vm.flights = quotes;
      });
  }
  // CREATE A NERW TRIP FUNCTION with departureDate, duration, destination, flightCost and origin.
}
