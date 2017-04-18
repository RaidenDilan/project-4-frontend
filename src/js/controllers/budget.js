angular
  .module('holiday')
  .controller('BudgetShowCtrl', BudgetShowCtrl);

BudgetShowCtrl.$inject = ['Holiday', '$stateParams', 'skyscanner'];
function BudgetShowCtrl(Holiday, $stateParams, skyscanner) {
  const vm = this;

  vm.all = Holiday.get($stateParams);

  Holiday.get($stateParams).$promise.then((holiday) => {
    vm.holiday = holiday;
    getFlights();
  });

  vm.flights = [];

  function getFlights() {
    skyscanner.getFlights(vm.holiday.nearest_airport)
      .then((quotes) => {
        vm.flights = quotes;
      });
  }
}
