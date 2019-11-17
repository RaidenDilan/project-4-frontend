angular
  .module('holidayApp')
  .factory('ErrorHandler', ErrorHandler);

ErrorHandler.$inject = ['$rootScope'];
function ErrorHandler($rootScope) {
  return {
    responseError(err) {
      console.log('responseError :: err', err);
      $rootScope.$broadcast('error', err);
    }
  };
}
