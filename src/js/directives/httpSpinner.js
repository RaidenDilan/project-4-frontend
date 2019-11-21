angular
  .module('holidayApp')
  .directive('httpLoader', httpLoader);

  httpLoader.$inject = ['$http'];
  function httpLoader($http) {
    const directive = {
      restrict: 'EA',
      templateUrl: 'js/views/modals/httpLoader.html',
      link(scope, element, attrs) {
        scope.isLoading = () => $http.pendingRequests.length > 0;
        scope.$watch(scope.isLoading, (oldValue, newValue, scope) => oldValue = oldValue ? element.css('display', 'block') : element.css('display', 'none'), true);
      }
  };

  return directive;
}
