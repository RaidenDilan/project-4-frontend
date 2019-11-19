angular
  .module('holidayApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl)
  .controller('GroupsNewCtrl', GroupsNewCtrl)
  .controller('GroupsShowCtrl', GroupsShowCtrl)
  .controller('GroupsEditCtrl', GroupsEditCtrl)
  .controller('GroupsDeleteCtrl', GroupsDeleteCtrl);

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
      .then((user) => user.groups.forEach((group) => vm.groups.push(group)));
  }
}

GroupsNewCtrl.$inject = ['Group', 'User', 'Membership', '$stateParams', '$state', '$auth', '$scope', '$filter', 'searchFilter'];
function GroupsNewCtrl(Group, User, Membership, $stateParams, $state, $auth, $scope, $filter, searchFilter) {
  const vm       = this;
  const authUser = $auth.getPayload();

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.group                = {};
  vm.group.users          = [];
  vm.chosenUsers          = [];
  vm.query                = null;
  vm.filteredLength       = 0;
  vm.availableUsersLength = 0;

  fetchUsers();

  $scope.$watch(() => vm.query, filterUsers);
  $scope.$watch(watchSearchBar, handleSearchBarChanges);

  function fetchUsers() {
    User
      .query()
      .$promise
      .then((users) => {
        vm.availableUsers = [];
        users.forEach((user) => (user.groups.length === 0) && (vm.availableUsers.push(user)));
        if (vm.availableUsers.length !== 0) vm.availableUsersLength = vm.availableUsers.length;
      });
  }

  function filterUsers(query) {
    const params = { username: vm.query };

    // vm.filtered = $filter('filter')(vm.availableUsers, params);
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
    if(!vm.chosenUsers.includes(user.id) && user.id !== authUser.id) vm.chosenUsers.push(user);
    if(!vm.group.users.includes(user.id) && user.id !== authUser.id) vm.group.users.push(user);

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
          vm.group.users.forEach((user) => {
            Membership
              .save({ membership: { user_id: user.id, group_id: group.id }})
              .$promise
              .then(() => $state.go('groupsShow', { id: group.id }, { reload: true }));
          });
        });
    }
  }
  vm.create = create;

  function createMembership(group, user) {
    Membership
      .save({ membership: { user_id: user.id, group_id: group.id } })
      .$promise
      .then((member) => member);
  }
  vm.createMembership = createMembership;

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

GroupsShowCtrl.$inject = ['User', 'Group', 'Holiday', '$stateParams', '$state', '$auth', '$mdDialog'];
function GroupsShowCtrl(User, Group, Holiday, $stateParams, $state, $auth, $mdDialog) {
  const vm = this;

  vm.group = Group.get($stateParams);

  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  // Modal to confirm attendance of free group
  function attendModal() {
    $mdDialog.show({
      controller: MembershipCtrl,
      controllerAs: 'membership',
      templateUrl: 'js/views/modals/groupAttendModal.html',
      parent: angular.element(document.body),
      targetEvent: vm.currentUser,
      clickOutsideToClose: true,
      escapeToClose: true,
      fullscreen: false,
      resolve: {
        selectedMember: () => {
          return vm.currentUser;
        }
      }
    });
  }
  vm.attend = attendModal;

  // Modal to confirm ticket has been deleted
  function unattendModal() {
    $mdDialog.show({
      controller: MembershipCtrl,
      controllerAs: 'membership',
      templateUrl: 'js/views/modals/groupUnattendModal.html',
      parent: angular.element(document.body),
      targetEvent: vm.currentUser,
      clickOutsideToClose: true,
      escapeToClose: true,
      fullscreen: false,
      resolve: {
        selectedMember: () => {
          return vm.currentUser;
        }
      }
    });
  }
  vm.unattend = unattendModal;

  // Opens modal asking for confirmation to delete group
  function groupDeleteModal() {
    $mdDialog.show({
      controller: GroupsDeleteCtrl,
      controllerAs: 'groupsDelete',
      templateUrl: 'js/views/modals/groupDeleteModal.html',
      parent: angular.element(document.body),
      targetEvent: vm.group,
      clickOutsideToClose: true,
      escapeToClose: true,
      fullscreen: false,
      resolve: {
        selectedGroup: () => {
          return vm.group;
        }
      }
    });
  }
  vm.delete = groupDeleteModal;

  function groupsUpdate() {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then(() => $state.go('groupsShow', { id: vm.group.id }));
  }
  vm.groupsUpdate = groupsUpdate;

  // Function for displaying or hiding attendance buttons
  function isAttending() {
    // This map function takes all id values from inside group.users object, puts the values into an array and checks that array to see if it includes the current user id.
    return $auth.getPayload() && vm.group.$resolved && vm.group.users.map((obj) => obj.id).includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}

GroupsEditCtrl.$inject = ['Group', 'Membership', 'User', '$stateParams', '$state', '$auth', '$scope', '$filter', 'searchFilter'];
function GroupsEditCtrl(Group, Membership, User, $stateParams, $state, $auth, $scope, $filter, searchFilter) {
  const vm         = this;
  const authUserId = $auth.getPayload();

  vm.group                = Group.get($stateParams);
  vm.groupUsers           = [];
  vm.query                = null;
  vm.filteredLength       = 0;
  vm.availableUsersLength = 0;

  if (vm.group) fetchGroup();

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
      });
  }

  function filterUsers(query) {
    const params = { username: vm.query };

    vm.filtered = $filter('filter')(vm.availableUsers, query);
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
        vm.groupUsers.push(user);

        Membership
          .save({ membership: { user_id: user.id, group_id: group.id }})
          .$promise
          .then(() => {
            clearFilter();
            fetchGroup();
          });
      });
  };

  vm.removeUser = (user) => {
    Group
      .update({ id: vm.group.id, group: vm.group })
      .$promise
      .then((group) => {
        const index      = vm.groupUsers.indexOf(user);
        const membership = vm.group.memberships.find((membership) => membership.user.id === user.id);

        vm.groupUsers.splice(index, 1);

        Membership
          .remove({ id: membership.id })
          .$promise
          .then(() => {
            clearFilter();
            fetchGroup();
          });
      });
  };

  vm.update = () => {
    if (vm.groupsEditForm.$valid) {
      vm.group
        .$update()
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

GroupsDeleteCtrl.$inject = ['selectedGroup', '$state', '$mdDialog'];
function GroupsDeleteCtrl(selectedGroup, $state, $mdDialog) {
  const vm = this;
  vm.group = selectedGroup;

  function closeModal() {
    $mdDialog.hide();
  }
  vm.close = closeModal;

  function groupsDelete() {
    vm.group
      .$remove()
      .then(() => {
        $state.go('groupsIndex');
        closeModal();
      });
  }
  vm.delete = groupsDelete;
}
