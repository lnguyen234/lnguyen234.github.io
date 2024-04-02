(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.searchTerm = '';
    narrow.found = [];
    narrow.searched = false;

    narrow.search = function () {
      if (narrow.searchTerm.trim() === '') {
        narrow.found = [];
        narrow.searched = true;
        return;
      }
      MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
        .then(function (foundItems) {
          narrow.found = foundItems;
          narrow.searched = true;
          console.log(narrow.found);
          console.log(narrow.searched);
        });
    };

    narrow.removeItem = function (index) {
      narrow.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }).then(function (response) {
        var allMenuItems = [];
        for (let category in response.data) {
          for (let menuItemIndex in response.data[category].menu_items) {
            allMenuItems.push(response.data[category].menu_items[menuItemIndex]);
          }
        }
        // console.log(allMenuItems);
        var foundItems = allMenuItems.filter(function (item) {
          return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
        });
        // console.log(foundItems);
        return foundItems;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
    };
    return ddo;
  }

})();
