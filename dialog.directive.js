(function () {
    'use strict';

    musicManager.directive ('dialogDirective', directive);
    /** @ngInject */
    function directive() {
        return {
            restrict: 'AE',
            templateUrl: 'dialog.template.html',
            scope: {
                id: '=',
                title: '@',
                content: '@',
                function: '&',
            },
        }
    }

} ());