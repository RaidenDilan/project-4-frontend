angular
  .module('holidayApp')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;

  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth
        .signup(vm.user)
        .then((user) => $state.go('login'));

      vm.registerForm.$setUntouched();
      vm.registerForm.$setPristine();
    }
  }
  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;

  function authenticate(provider) {
    $auth
      .authenticate(provider)
      .then((res) => $state.go('usersShow'));
  }
  vm.authenticate = authenticate;

  function submit() {
    if(vm.loginForm.$valid) {
      $auth
        .login(vm.credentials)
        .then(() => $state.go('usersShow'));
        // .catch((res, err) => {
        //   // Handle errors here, such as displaying a notification
        //   // for invalid email and/or password.
        // });
        // vm.loginForm.$setPristine();
        // vm.loginForm.$setUntouched();
    }
  }
  vm.submit = submit;
}
