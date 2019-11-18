angular
  .module('holidayApp')
	.directive('smartConfirm', smartConfirm);

smartConfirm.$inject = []; // $compile
function smartConfirm() {
	const directive = {
		restrict: 'EA',
		scope: { confirm: '&' },
		transclude: true,
    templateUrl: 'js/views/modals/smartConfirmModal.html'
	};

  return directive;
}
