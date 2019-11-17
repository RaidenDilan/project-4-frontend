angular
  .module('holidayApp')
  .service('ToastAlertService', ToastAlertService);

  ToastAlertService.$inject = ['$mdToast', '$document', '$log'];
  function ToastAlertService($mdToast, $document, $log) {
    var dialogs = {
      isDlgOpen: null,
      hideKey: 'z',
      dialogKey: 'd',
      actionResolve: 'hide',
      keyListConfig: false,
      position: 'top right',
      customToast(content, delay, toastClass) {
        $mdToast.show({
          hideDelay: delay,
          position: this.position,
          controller: ToastCtrl,
          controllerAs: 'toast',
          bindToController: true,
          locals: {
            toastMessage: content
          },
          templateUrl: 'js/views/modals/toast-alert.html',
          toastClass: toastClass
        });
      }
    };

    return dialogs;
  }
