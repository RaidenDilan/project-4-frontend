angular
  .module('holidayApp')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', 'Group', '$stateParams', '$location', 'Skyscanner', '$moment', 'AnchorSmoothScroll'];
function FlightsShowCtrl(Holiday, Group, $stateParams, $location, Skyscanner, $moment, AnchorSmoothScroll) {
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

  function gotoElement(eID) {
    // set the location.hash to the id of
    // the element you wish to scroll to.
    // $location.hash('flightsBoard');

    // console.log('eID', eID);
    // if (vm.flights.length !== 0) {
      // console.log('eIDeID', eID);
      // call $anchorScroll()
      AnchorSmoothScroll.scrollTo(eID);
    // }
  }
  vm.gotoElement = gotoElement;

  function searchFlights() {
    if (vm.flightsShowForm.$valid) {
      queryFlights();
      // if (vm.flights.length !== 0) gotoElement('flightsBoard');
    }
  }
  vm.searchFlights = searchFlights;

  function queryFlights() {
    Skyscanner
      .getFlights(vm.holiday.departureAirport, vm.holiday.arrivalAirport, vm.holiday.departureDate, vm.holiday.returnDate)
      .then((quotes) => vm.flights = quotes);
  }
}

// FlightsShowCtrl.resolve = {
//   resolvedFlights: (Skyscanner) => {
//     return Skyscanner
//       .getFlights(vm.holiday.departureAirport, vm.holiday.arrivalAirport, vm.holiday.departureDate, vm.holiday.returnDate)
//       .then((quotes) => {
//         vm.flights = quotes;
//         return vm.flights;
//       });
//   }
// };
