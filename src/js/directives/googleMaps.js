// angular
//   .module('holiday')
//   .directive('googleMap', googleMap);
//
// googleMap.$inject = ['$window']; // attaching the google map from the window to the angular window because angular does not like.
//
// function googleMap($window) {
//   const directive = {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
//     scope: {
//       center: '='
//     },
//     link($scope, element) {
//       console.log(element);
//       const map = new $window.google.maps.Map(element[0], {
//         zoom: 14,
//         center: $scope.center
//       });
//
//       const marker = new $window.google.maps.Marker({
//         position: $scope.center,
//         map: map,
//         animation: $window.google.maps.Animation.BOUNCE
//       });
//
//       $window.setTimeout(() => {
//         marker.setAnimation(null);
//       }, 5000);
//     }
//   };
//
//   return directive;
// }
