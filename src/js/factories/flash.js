// angular
//   .module('holidayApp')
//   .factory('Flash', Flash);
//
//   Flash.$inject = ['$rootScope'];
//   function Flash($rootScope) {
//     var queue = [];
//     var currentMessage = '';
//
//     $rootScope.$on('$routeChangeSuccess', function() {
//       currentMessage = queue.shift() || '';
//     });
//
//     return {
//       setMessage: function(message) {
//         queue.push(message);
//       },
//       getMessage: function() {
//         return currentMessage;
//       }
//     };
//   }
