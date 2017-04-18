angular
  .module('holiday')
  .factory('Group', Group);

Group.$inject = ['$resource', 'API_URL'];
function Group($resource, API_URL) {
  return new $resource(`${API_URL}/groups/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
