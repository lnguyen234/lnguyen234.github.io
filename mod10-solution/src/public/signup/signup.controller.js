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
            if (form.$invalid) {
                $ctrl.showError = true;
                $ctrl.showSuccess = false;
                return;
            }
            
            var favoriteDishShortName = String($ctrl.user.favoriteDish);
            if (favoriteDishShortName.length != 2) {
                $ctrl.showError = true;
                $ctrl.showSuccess = false;
                return;
            }
            // MenuService.getFavoriteDish(favoriteDishShortName).then(function (response) {
            //     if (response) {
            //         $ctrl.user.favoriteDishDetails = response;
            //         // console.log($ctrl.favoriteDish);
            //         MenuService.saveUser($ctrl.user);
            //         $ctrl.showMessage = true;
            //     } else {
            //         $ctrl.showError = true;
            //     }
            // });

            if ($ctrl.showFound) {
                MenuService.saveUser($ctrl.user);
                $ctrl.showSuccess = true;
                $ctrl.showError = false;
            }

        };

        $ctrl.validateFavoriteDish = function () {
            var favoriteDishShortName = String($ctrl.user.favoriteDish);
            if (favoriteDishShortName.length != 2) {
                $ctrl.showNotFound = true;
                $ctrl.showFound = false;
                return;
            }
            MenuService.getFavoriteDish(favoriteDishShortName).then(function (response) {
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