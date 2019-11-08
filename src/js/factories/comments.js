angular
  .module('holidayApp')
  .factory('Comment', Comment);

Comment.$inject = ['$resource', 'API_URL'];
function Comment($resource, API_URL) {
  return new $resource(`${API_URL}/groups/:id/holidays/:holidayId/comments/:commentId`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
