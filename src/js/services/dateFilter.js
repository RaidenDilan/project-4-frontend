/* depends on MomentJS being available as a global */
angular
  .module('holidayApp')
  .filter('dateFormatter', dateFormatter);

  dateFormatter.$inject = [];
  function dateFormatter() {
    return function(date, format) {
      if(!moment) {
        // console.log('Error: momentJS is not loaded as a global');
        return '!momentJS';
      }
      // needed if you want to change the locale globally

      moment.locale('uk');
      if(!format) return moment(date).fromNow();
      // in absence of format parameter, return the relative time from the given date
      else return moment(date).format(format);
    };
  }
