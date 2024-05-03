(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['MenuService', 'ApiPath'];
    function InfoController(MenuService, ApiPath) {
        var $ctrl = this;
        $ctrl.apiPath = ApiPath;

        $ctrl.existedUser = false;

        $ctrl.user = MenuService.getUser();
        if (angular.equals($ctrl.user, {})) {
            $ctrl.existedUser = false;
        } else {
            $ctrl.existedUser = true;
        }
    }

})();