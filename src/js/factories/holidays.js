angular
  .module('holidayApp')
  .factory('Holiday', Holiday);

Holiday.$inject = ['$resource', 'API_URL'];
function Holiday($resource, API_URL) {
  return new $resource(`${API_URL}/groups/:id/holidays/:holidayId`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
