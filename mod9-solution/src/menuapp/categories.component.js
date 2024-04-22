(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'src/menuapp/template/categories.template.html',
            bindings: {
                categories: '<'
            }
        });
})();
