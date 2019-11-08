angular
  .module('holidayApp')
  .directive('dateInput', dateInput);

dateInput.$inject = ['$moment'];
function dateInput($moment) {
  return {
    restrict: 'EA',
    scope: {
      'label': '=',
      'date': '='
    },
    replace: true,
    template: '' +
      '<div class="form-field date-field">' +
        '<label ng-bind="label"></label>' +
        '<input ng-model="date" type="text" placeholder="YYYY-MM-DD"></input>' +
      '</div>',
    link: (scope, element, attrs) => {
      var inputField = element.find('input');

      inputField.bind('blur', function() {
        var mDate = $moment(scope.date, ['YYYY-MM-DD']).add(1, 'months');
        // scope.date = mDate.format('L');
        scope.date = mDate.format('YYYY-MM-DD');
        scope.$apply();
      });
    }
  };
}
