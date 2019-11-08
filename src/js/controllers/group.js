angular
  .module('holidayApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsIndexCtrl.$inject = ['User', 'Group', '$stateParams', '$auth'];
function GroupsIndexCtrl(User, Group, $stateParams, $auth) {
  const vm       = this;
  const authUser = $auth.getPayload();

  vm.groups = [];

  if ($auth.getPayload()) fetchUserGroups();

  function fetchUserGroups() {
    User
      .get({ id: $auth.getPayload().id })
      .$promise
      .then((user) => {
        user.groups.forEach((group) => vm.groups.push(group));
      });
  }
}

GroupsNewCtrl.$inject = ['Group', 'User', 'Membership', '$stateParams', '$state', '$auth', '$scope', '$filter'];
function GroupsNewCtrl(Group, User, Membership, $stateParams, $state, $auth, $scope, $filter) {
  const vm       = this;
  const authUser = $auth.getPayload();

  vm.group                = {};
  vm.group.users          = [];
  vm.chosenUsers          = [];
  vm.query                = null;
  vm.filteredLength       = 0;
  vm.availableUsersLength = 0;

  if(vm.group) fetchUsers();

  $scope.$watch(() => vm.query, filterUsers);
  $scope.$watch(watchSearchBar, handleSearchBarChanges);

  function fetchUsers() {
    User
      .query()
      .$promise
      .then((users) => {
        vm.availableUsers = [];
        users.forEach((user) => (user.groups.length === 0) && (vm.availableUsers.push(user)));
        if (vm.availableUsers.length > 0) vm.availableUsersLength = vm.availableUsers.length;
      });
  }

  function filterUsers() {
    const params = { username: vm.query };

    vm.filtered = $filter('filter')(vm.availableUsers, params);
    if (vm.filtered && vm.filtered.length > 0) vm.filteredLength = vm.filtered.length;
  }

  function clearFilter() {
    vm.query = null; // reset input value after query
    vm.filtered = {}; // reset filtered so users input list disappear after selecting a add

    if (vm.filtered && vm.filtered.length > 0) vm.filteredLength = vm.filtered.length;
    if (vm.availableUsers && vm.availableUsers.length > 0) vm.availableUsersLength = vm.availableUsers.length;
  }

  function watchSearchBar() {
    return document.querySelector('#search-bar:not(.ng-hide)');
  }

  function handleSearchBarChanges() {
    return document.getElementById('search-input').focus();
  }

  vm.addUser = (user) => {
    if(!vm.group.users.includes(user.id) && user.id !== authUser.id) vm.group.users.push(user);
    if(!vm.chosenUsers.includes(user.id) && user.id !== authUser.id) vm.chosenUsers.push(user);

    clearFilter();
  };

  vm.removeUser = (user) => {
    const index     = vm.group.users.indexOf(user);
    const userIdx   = vm.chosenUsers.indexOf(user);

    vm.group.users.splice(index, 1);
    vm.chosenUsers.splice(userIdx, 1);

    clearFilter();
  };

  function create() {
    if(vm.groupsNewForm.$valid) {
      if(!vm.group.users.includes(authUser.id)) vm.group.users.push(authUser);

      Group
        .save({ group: vm.group })
        .$promise
        .then((group) => {
          vm.group.users.forEach((user) => Membership.save({ membership: { user_id: user.id, group_id: group.id } }));
          return $state.go('groupsShow', { id: group.id });
        });
    }
  }
  vm.create = create;

  function showPreSearchBar () {
    return vm.query === null;
  }
  vm.showPreSearchBar = showPreSearchBar;

  function initiateSearch () {
    vm.query = '';
  }
  vm.initiateSearch = initiateSearch;

  function showSearchBar () {
    return vm.query !== null;
  }
  vm.showSearchBar = showSearchBar;

  function endSearch () {
    vm.query = null;
  }
  vm.endSearch = endSearch;

  function submitSearch () {
    // console.log('Search function : Has been disabled');
  }
  vm.submitSearch = submitSearch;
}

GroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state', '$auth'];
function GroupsShowCtrl(User, Group, Holiday, $stateParams, $state, $auth) {
  const vm = this;

  vm.group = Group.get($stateParams);

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => $state.go('groupsIndex'));
  }
  vm.delete = groupsDelete;

  function groupsUpdate() {
    Group.update({ id: vm.group.id, group: vm.group });

    // vm.group
    //   .$update()
    //   .then((group) => $state.go('groupsHome', $stateParams));
  }
  vm.groupsUpdate = groupsUpdate;

  function toggleAttending() {
    const index = vm.group.users.indexOf(vm.currentUser.id);

    if(index > -1) {
      // vm.group.attendee_ids.splice(index, 1);
      vm.group.users.splice(index, 1);
    } else {
      // vm.group.attendee_ids.push(vm.currentUser.id);
      vm.group.users.push(vm.currentUser);
    }
    groupsUpdate();
  }
  vm.toggleAttending = toggleAttending;

  function isAttending() {
    // return $auth.getPayload() && vm.group.$resolved && vm.group.users.includes(vm.currentUser.id);
    // console.log('vm.group.$resolved', vm.group.$resolved);
    return $auth.getPayload() && vm.group.$resolved && vm.group.users.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}

GroupsEditCtrl.$inject = ['Group', 'GroupUser', 'Membership', 'User', '$stateParams', '$state', '$auth', '$scope', 'searchFilter', '$uibModal'];
function GroupsEditCtrl(Group, GroupUser, Membership, User, $stateParams, $state, $auth, $scope, searchFilter, $uibModal) {
  const vm         = this;
  const authUserId = $auth.getPayload();

  vm.group                = Group.get($stateParams);
  vm.groupUsers           = [];
  vm.query                = null;
  vm.filteredLength       = 0;
  vm.availableUsersLength = 0;

  if (vm.group) fetchGroup();
  // if(vm.group) fetchUsers();

  $scope.$watch(() => vm.query, filterUsers);
  $scope.$watch(watchSearchBar, handleSearchBarChanges);

  function fetchGroup() {
    Group
      .get($stateParams)
      .$promise
      .then((group) => {
        vm.group = group;
        vm.groupUsers = [];

        group.users.forEach((user) => (user.id !== authUserId.id) && (vm.groupUsers.push(user)));

        fetchUsers(); // REMOVE THIS LINE IF YOU DECIDE TO CALL fetchUsers FUNCTION ABOVE !
      });
  }

  function fetchUsers() {
    User
      .query()
      .$promise
      .then((users) => {
        vm.availableUsers = [];
        users.forEach((user) => (user.groups.length === 0) && (vm.availableUsers.push(user)));
        if (vm.availableUsers.length > 0) vm.availableUsersLength = vm.availableUsers.length;
        // console.log('vm.availableUsers', vm.availableUsers);
      });
  }

  function filterUsers(query) {
    const params = { username: vm.query };

    vm.filtered = searchFilter(vm.availableUsers, query);
    if (vm.filtered && vm.filtered.length > 0) vm.filteredLength = vm.filtered.length;
  }

  function clearFilter() {
    vm.query = null; // reset input value after query
    vm.filtered = {}; // reset filtered so users input list disappear after selecting a add

    if (vm.filtered && vm.filtered.length > 0) vm.filteredLength = vm.filtered.length;
    if (vm.availableUsers && vm.availableUsers.length > 0) vm.availableUsersLength = vm.availableUsers.length;
  }

  function watchSearchBar() {
    return document.querySelector('#search-bar:not(.ng-hide)');
  }

  function handleSearchBarChanges() {
    return document.getElementById('search-input').focus();
  }

  vm.addUser = (user) => {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then((group) => {
        Membership.save({ membership: { user_id: user.id, group_id: group.id } });
        vm.groupUsers.push(user);
        clearFilter();
      });
  };

  vm.removeUser = (user) => {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then((group) => {
        const index = vm.groupUsers.indexOf(user);
        const membership = vm.group.memberships.find((membership) => membership.user.id === user.id);

        Membership.remove({ id: membership.id });
        vm.groupUsers.splice(index, 1);
        clearFilter();
      });
  };

  vm.update = () => {
    if (vm.groupsEditForm.$valid) {
      // if (!vm.groupUsers.includes(user.id) && user.id !== authUserId) vm.groupUsers.push(user);

      vm.group
        .$update()
        // .then((group) => $state.go('groupsIndex', { id: group.id }));
        .then((group) => $state.go('groupsShow', $stateParams));
    }
  };

  function showPreSearchBar() {
    return vm.query === null;
  }
  vm.showPreSearchBar = showPreSearchBar;

  function initiateSearch() {
    vm.query = '';
  }
  vm.initiateSearch = initiateSearch;

  function showSearchBar() {
    return vm.query !== null;
  }
  vm.showSearchBar = showSearchBar;

  function endSearch() {
    vm.query = null;
  }
  vm.endSearch = endSearch;

  function submitSearch() {
    // console.log('Search function : Has been disabled');
  }
  vm.submitSearch = submitSearch;
}
