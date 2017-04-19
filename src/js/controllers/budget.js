angular
  .module('holiday')
  .controller('BudgetShowCtrl', BudgetShowCtrl);

BudgetShowCtrl.$inject = ['Holiday', '$stateParams', 'skyscanner', '$state'];
function BudgetShowCtrl(Holiday, $stateParams, skyscanner, $state) {
  const vm = this;

  vm.all = Holiday.get($stateParams);
  console.log('Budget Show', $stateParams);

  Holiday.get($stateParams).$promise.then((holiday) => {
    console.log('Holiday Budget', $stateParams);
    vm.holiday = holiday;
    getFlights();
  });

  vm.flights = [];

  function getFlights() {
    skyscanner.getFlights(vm.holiday.nearest_airport)
      .then((quotes) => {
        console.log(quotes);
        vm.flights = quotes;
      });
  }
}
