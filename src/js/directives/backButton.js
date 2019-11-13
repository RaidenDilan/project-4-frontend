angular
  .module('holidayApp')
	.directive('backButton', backButton);

backButton.$inject = ['$window'];
function backButton($window) {
	const directive = {
		restrict: 'E',
		transclude: true,
    template: '<md-button class="md-raised md-primary md-button md-ink-ripple backButton">back</md-button>',
    link: (scope, element, attrs) => {
      element.on('click', () => $window.history.back());
    }
	};

  return directive;
}
