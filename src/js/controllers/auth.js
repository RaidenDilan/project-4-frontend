angular
  .module('holiday')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(user => console.log('USER', user));
  }
  vm.authenticate = authenticate;

  function register() {
    if(vm.registerForm.$valid) {
      console.log(vm.registerForm$valid);
      $auth.signup(vm.user)
      // .then(user => console.log(user));
      .then(() => $state.go('login'));
      vm.registerForm.$setPristine();
      vm.registerForm.$setUntouched();
    }
  }
  vm.register = register;

  function login() {
    if(vm.loginForm.$valid) {
      $auth.login(vm.credentials)
      // .then(user => console.log(user));
      .then(() => $state.go('usersGroupsIndex'));
      vm.loginForm.$setPristine();
      vm.loginForm.$setUntouched();
    }
  }
  vm.login = login;
}
