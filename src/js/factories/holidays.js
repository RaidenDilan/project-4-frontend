angular
  .module('holiday')
  .factory('Holiday', Holiday);

Holiday.$inject = ['$resource', 'API_URL'];
function Holiday($resource, API_URL) {
  return new $resource(`${API_URL}/holidays/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
