angular
  .module('holidayApp')
	.directive('backButton', backButton);

backButton.$inject = ['$window'];
function backButton($window) {
	const directive = {
		restrict: 'E',
		transclude: true,
    template: '<button class="button backButton">back</button>',
    link: (scope, element, attrs) => {
      element.on('click', () => $window.history.back());
    }
	};

  return directive;
}
