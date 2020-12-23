(function () {
    'use strict';

    musicManager
        .directive ('paginationDirective', directive);


    /** @ngInject */
    function directive($timeout) {

        function link(scope){
            scope.previousText = 'Previous';
            scope.nextText = 'Next';
            $timeout(function(){
                console.log('total', scope.totalItems);
                console.log('per page', scope.itemsPerPage);
                console.log('current', scope.currentPage);
            }, 100)
            
        }

        return {
            link: link,
            restrict: 'AE',
            templateUrl: 'directive/pagination/pagination.template.html',   
            replace: true,
            scope: {
                totalItems: '=',
                itemsPerPage: '=',
                currentPage: '=',
                previousText: '@',
                nextText: '@',
            },
        }
    }

} ());