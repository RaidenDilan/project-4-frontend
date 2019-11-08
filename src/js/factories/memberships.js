angular
  .module('holidayApp')
  .factory('Membership', Membership);

Membership.$inject = ['$resource', 'API_URL'];
function Membership($resource, API_URL){
  return new $resource(`${API_URL}/memberships/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
