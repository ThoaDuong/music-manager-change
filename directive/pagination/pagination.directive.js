
(function () {
    'use strict';

    musicManager
        .directive ('paginationDirective', directive);


    /** @ngInject */
    function directive() {

        function link(scope){
            scope.previousText = 'previous';
            scope.nextText = 'next';
            scope.itemsPerPageText = 'pagination';
            scope.$watch('itemsPerPage', function(newVal, oldVal){
                //Check if first time, set default
                if(newVal && !oldVal){
                    scope.selectNumberOfItems = scope.itemsPerPage.toString();
                }
                scope.currentPage = 1;
                scope.numberOfPage = Math.ceil(scope.totalItems/scope.itemsPerPage);
                scope.arrValuePage = [];
                for(var i=1; i<=scope.numberOfPage; i++){
                    scope.arrValuePage.push({
                        page: i,
                    })
                }
            })
            
            scope.onChangeSelect = function(value){
                scope.itemsPerPage = value;
            }
            scope.onClickMovePage = function(page){
                scope.currentPage = page;
            }
            scope.onClickPrevious = function(){
                if(scope.currentPage !== 1){
                    scope.currentPage -= 1;
                }
            }
            scope.onClickNext = function(){
                if(scope.currentPage !== scope.numberOfPage){
                    scope.currentPage += 1;
                }
            }
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
                itemsPerPageText: '@',
            },
        }
    }

} ());