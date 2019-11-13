angular
  .module('holidayApp')
  .config(Material);

  Material.$inject = ['$mdThemingProvider'];
  function Material($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('yellow')
      .accentPalette('green')
      .warnPalette('red')
      .backgroundPalette('grey');
  }
