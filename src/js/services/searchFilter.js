angular
  .module('holidayApp')
  .filter('search', search);

function search() {
  return function(input, filterString) {
    if(!filterString) return input;
    if(filterString) filterString = '.*' + filterString.toLowerCase().split(' ').join('.*');

    var regex = new RegExp(filterString, 'i');
    var filteredOutput = [];

    angular.forEach(input, (user) => (user.group === null) && (regex.test(user.username)) && (filteredOutput.push(user)));

    return filteredOutput;
  };
}
