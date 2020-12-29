(function () {
    'use strict';

    musicManager
        .directive ('tableDirective', directive);

    /** @ngInject */
    function directive(selectService) {
        return {
            restrict: 'AE',
            templateUrl: 'directive/table/table.template.html',
            scope: {
                array: '=',
                multiSelect: '=',
                arrTitle: '=',
                arrPagination: '=',
                searchKeyWord: '=',
                itemsPerPage: '=',
                currentPage : '=',
                onViewDetail: '&',
            },
            link: function(scope){
                scope.listChecked = {};
                scope.dataCheck = {};
                scope.array = [];
                scope.$watch('array', function(defaultArray){
                    scope.isNoItem = defaultArray.length <= 0 ? true : false;

                    //Set default for list checkbox
                    if(defaultArray.length > 0){
                        defaultArray.forEach(element => {
                            scope.listChecked[element._id] = false;
                        });
                        scope.dataCheck.isCheckAll = false;
                    }
                }, true)
                
                scope.onSingleSelectChange = (song)=>{
                    scope.multiSelect = selectService.onHandleSingleChange(song, scope.listChecked, scope.dataCheck, scope.multiSelect, scope.array);
                }
                scope.onCheckAllSelectChange = function () {
                    scope.multiSelect = selectService.onHandleCheckAll(scope.listChecked, scope.dataCheck.isCheckAll, scope.multiSelect, scope.array);
                }
            }
        }
    }

} ());
