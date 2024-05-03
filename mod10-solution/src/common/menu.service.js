(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    service.user = {};

    service.saveUser = function (user) {
      service.user = angular.copy(user);
    }

    service.getUser = function () {
      return service.user;
    }

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = { 'category': category };
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.getFavoriteDish = function (short_name) {
      if ((typeof short_name === 'string') && (short_name.length == 2)) {
        var categoryLetter = short_name.charAt(0).toUpperCase();
        var itemNumber = parseInt(short_name.charAt(1)) - 1;
        var url = ApiPath + '/menu_items/' + categoryLetter + '/menu_items/' + itemNumber + '.json';
        console.log(url);
        return $http.get(url).then(function (response) {
          // console.log(response.data);
          return response.data;
        });
      };
    }
  }
})();
