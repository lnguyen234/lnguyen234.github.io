(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];
    function SignupController(MenuService) {
        var $ctrl = this;

        $ctrl.user = {};

        $ctrl.showError = false;
        $ctrl.showMessage = false;

        $ctrl.signup = function (form) {
            $ctrl.showError = false;
            $ctrl.showMessage = false;
            if (form.$invalid) {
                console.log('The form is not valid');
                return;
            }

            MenuService.getFavoriteDish($ctrl.user.favoriteDish).then(function (response) {
                if (response) {
                    $ctrl.user.favoriteDishDetails = response;
                    MenuService.saveUser($ctrl.user);
                    $ctrl.showMessage = true;
                } else {
                    $ctrl.showError = true;
                }
            });
        }
    }
})();