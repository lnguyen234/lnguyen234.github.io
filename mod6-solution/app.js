(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch_menu = "Yaakov";
    $scope.msg = "";
    $scope.msg_style = {
      "font-size": "1.3em",
      "font-weight": "bold"
    };
    $scope.textbox_style = {}

    $scope.check_lunch_menu = function () {
      var lunch_list = $scope.lunch_menu.split(',');
      var count = 0;
      for (var item in lunch_list) {
        var trimmed_item = lunch_list[item].trim();
        if (trimmed_item.length > 0) {
          console.log(trimmed_item);
          count++;
        }
      }
      if (count <= 0) {
        $scope.msg = "Please enter data first!";
        $scope.msg_style["color"] = "red";
        $scope.textbox_style["border"] = "3px solid red";
      } else {
        $scope.msg_style["color"] = "green";
        $scope.textbox_style["border"] = "3px solid green";
        if (count <= 3) {
          $scope.msg = "Enjoy!";
        } else {
          $scope.msg = "Too much!"
        }
      }
    };
  }

})();
