angular
  .module('holidayApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function authenticate(provider) {
    $auth
      .authenticate(provider)
      .then(user => console.log('USER', user));
  }
  vm.authenticate = authenticate;

  function register() {
    vm.group = null;

    if(vm.registerForm.$valid) {
      $auth
        .signup(vm.user)
        .then(() => $state.go('login'));

        vm.registerForm.$setPristine();
        vm.registerForm.$setUntouched();
    }
  }
  vm.register = register;

  function login() {
    if(vm.loginForm.$valid) {
      $auth
        .login(vm.credentials)
        .then(() => $state.go('groupsIndex'));

        vm.loginForm.$setPristine();
        vm.loginForm.$setUntouched();
    }
  }
  vm.login = login;
}
