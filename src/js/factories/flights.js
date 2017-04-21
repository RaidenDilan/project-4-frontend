angular
  .module('holiday')
  .factory('Flight', Flight);

Flight.$inject = ['$resource', 'API_URL'];
function Flight($resource, API_URL) {
  return new $resource(`${API_URL}/flights/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
