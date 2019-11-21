angular
  .module('holidayApp')
  .directive('ngEnter', ngEnter);

  ngEnter.$inject = [];
  function ngEnter() {
    return function(scope, element, attrs) {
    element.bind('keydown keypress', (event) => {
      if (event.which === 13) {
        scope.$apply(() => scope.$eval(attrs.ngEnter));
        event.preventDefault();
      }
    });
  };
}
