angular
  .module('holidayApp')
  .controller('FlightsShowCtrl', FlightsShowCtrl);

FlightsShowCtrl.$inject = ['Holiday', 'Group', '$stateParams', 'skyscanner', '$moment'];
function FlightsShowCtrl(Holiday, Group, $stateParams, skyscanner, $moment) {
  const vm = this;

  vm.flights = [];
  // vm.departureDate = '';
  // vm.returnDate = '';
  // vm.modalOpen = true;
  // vm.toggleModal = toggleModal;
  //
  // function toggleModal() {
  //   vm.modalOpen = !vm.modalOpen;
  // }

  vm.group = Group.get($stateParams);

  Holiday
    .get($stateParams)
    .$promise
    .then((holiday) => {
      vm.holiday = holiday;
      console.log('FlightsShowCtrl ::', holiday);

      holiday.departureDate = $moment(holiday.departureDate).add(1, 'month').format("YYYY-MM-DD");
      holiday.returnDate = $moment(holiday.returnDate).add(1, 'month').add(7, 'days').format("YYYY-MM-DD");

      return vm.holiday;
  });

  function searchFlights() {
    getFlights();
  }
  vm.searchFlights = searchFlights;

  function getFlights() {
    skyscanner
      .getFlights(
        vm.holiday.departureAirport,
        vm.holiday.arrivalAirport,
        vm.holiday.departureDate,
        vm.holiday.returnDate
      )
      .then((quotes) => vm.flights = quotes);
  }
}
