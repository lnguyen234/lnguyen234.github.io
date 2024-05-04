(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];
    function SignupController(MenuService) {
        var $ctrl = this;

        $ctrl.user = {};

        $ctrl.showNotFound = false;
        $ctrl.showFound = false;

        $ctrl.showError = false;
        $ctrl.showSuccess = false;

        $ctrl.signup = function (form) {
            if (form.$invalid || $ctrl.showNotFound) {
                $ctrl.showError = true;
                $ctrl.showSuccess = false;
                return;
            } else {
                MenuService.saveUser($ctrl.user);
                $ctrl.showSuccess = true;
                $ctrl.showError = false;
            }

        };

        $ctrl.validateFavoriteDish = function () {
            var favoriteDishShortName = String($ctrl.user.favoriteDish);
            // if (favoriteDishShortName.length < 2) {
            //     $ctrl.showNotFound = true;
            //     $ctrl.showFound = false;
            //     return;
            // }
            var charPatt = /[a-zA-Z]+/g;
            var categoryLetter = favoriteDishShortName.match(charPatt);
            var numPatt = /[0-9]+/g;
            var itemNumber = favoriteDishShortName.match(numPatt);
            if (!categoryLetter || !itemNumber || (categoryLetter.length != 1) || (itemNumber.length != 1)) {
                $ctrl.showNotFound = true;
                $ctrl.showFound = false;
                return;
            }
            categoryLetter = categoryLetter[0].toUpperCase();
            itemNumber = parseInt(itemNumber[0]) - 1;
            MenuService.getFavoriteDish(categoryLetter, itemNumber).then(function (response) {
                if (response) {
                    $ctrl.user.favoriteDishDetails = response;
                    $ctrl.showFound = true;
                    $ctrl.showNotFound = false;
                } else {
                    $ctrl.showNotFound = true;
                    $ctrl.showFound = false;
                }
            });
        };
    }

})();