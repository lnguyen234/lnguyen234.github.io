(function () {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'src/menuapp/template/items.template.html',
            bindings: {
                items: '<'
            }
        });
})();
