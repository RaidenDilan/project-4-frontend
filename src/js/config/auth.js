angular
  .module('holidayApp')
  .config(Auth);

Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  $authProvider.facebook({
    clientId: '2610010495724389',
    url: `${API_URL}/oauth/facebook`
  });

  $authProvider.github({
    clientId: 'b10515521c112c0a77e0',
    url: `${API_URL}/oauth/github`
  });
}
