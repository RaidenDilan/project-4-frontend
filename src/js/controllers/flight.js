angular
  .module('holiday')
  .controller('FlightsShowCtrl', FlightsShowCtrl)
  .controller('FlightsNewCtrl', FlightsNewCtrl)
  .controller('FlightsIndexCtrl', FlightsIndexCtrl);

FlightsIndexCtrl.$inject = ['Holiday', 'skyscanner'];
function FlightsIndexCtrl(Holiday, skyscanner) {
  const vm = this;

  vm.all = Holiday.query();
  vm.flights = [];

  function getFlights() {
    skyscanner.getFlights('anywhere')
      .then((quotes) => {
        vm.flights = quotes;
      });
  }
  getFlights();
}

FlightsNewCtrl.$inject = ['Holiday', '$state'];
function FlightsNewCtrl(Holiday, $state) {
  const vm = this;

  vm.holiday = {};

  function holidaysCreate() {
    Holiday
      .save(vm.holiday)
      .$promise
      .then(() => $state.go('holidaysIndex'));
  }
  vm.create = holidaysCreate;
}

FlightsShowCtrl.$inject = ['Holiday', '$stateParams', 'skyscanner'];
function FlightsShowCtrl(Holiday, $stateParams, skyscanner) {
  const vm = this;

  vm.flights = [];
  console.log('Controller 2', vm.flights);
  // vm.all = Holiday.get($stateParams);
  // console.log('vm.all', vm.all);
  // console.log('Flights Show stateParams', $stateParams);

  Holiday.get($stateParams).$promise.then((holiday) => {
    // console.log('Holiday Flights stateParams', $stateParams);
    vm.holiday = holiday;
    // console.log('VM.HOLIDAY', vm.holiday);
    vm.holiday.date = new Date(holiday.date);
    console.log('Controller 1', vm.holiday.date);

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
