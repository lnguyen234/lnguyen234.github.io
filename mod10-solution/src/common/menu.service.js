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

    service.getFavoriteDish = function (categoryLetter, itemNumber) {
      // if (typeof short_name === 'string') {   
      // console.log(short_name);     
      // var charPatt = /[a-zA-Z]+/g;
      // var categoryLetter = short_name.match(charPatt);
      // var numPatt = /[0-9]+/g;
      // var itemNumber = short_name.match(numPatt);
      // if ((categoryLetter.length != 1) || (itemNumber.length != 1)) {
      //   return null;
      // }
      // categoryLetter = categoryLetter[0].toUpperCase();
      // console.log(categoryLetter);
      // itemNumber = parseInt(itemNumber[0]) - 1;
      // console.log(itemNumber);
      // var categoryLetter = short_name.charAt(0).toUpperCase();
      // var itemNumber = parseInt(short_name.charAt(1)) - 1;
      var url = ApiPath + '/menu_items/' + categoryLetter + '/menu_items/' + itemNumber + '.json';
      
      return $http.get(url).then(function (response) {
        console.log(url);
        // response.data['categoryLetter'] = categoryLetter;
        // response.data['itemNumber'] = itemNumber;
        console.log(response.data);
        return response.data;
      });
      // };
    }
  }
})();
