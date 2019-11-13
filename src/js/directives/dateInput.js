angular
  .module('holidayApp')
  .directive('dateInput', dateInput);

dateInput.$inject = ['$moment'];
function dateInput($moment) {
  return {
    restrict: 'EA',
    // require: 'ngModel',
    scope: {
      label: '=',
      date: '='
      // holiday: '=',
      // departureDate: '=',
      // arrivalDate: '='
    },
    // replace: true,
    // transclude: true,
    template:
      '<div class="form-field date-field">' +
        '<label ng-bind="label"></label>' +
        '<input ng-model="date" type="text" placeholder="YYYY-MM-DD"></input>' +
      '</div>',
    link: (scope, element, attrs) => {
      var inputField = element.find('input');
      console.log('scope', scope);

      inputField.bind('blur', () => {
        var chosenDate = $moment(scope.date, ['YYYY-MM-DD']);
        // var chosenDate = $moment(scope.date, ['YYYY-MM-DD']).add(1, 'months');
        // scope.date = chosenDate.format('L');
        // if (scope.date === undefined) scope.date = $moment(scope.date, ['YYYY-MM-DD']);
        scope.date = chosenDate.format('YYYY-MM-DD');
        scope.$apply();
      });
    }
  };
}
