(function () {
    'use strict';

    musicManager
        .directive ('tableDirective', directive);

    /** @ngInject */
    function directive(selectService, CONSTANT) {
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
                onViewDetailPlaylist: '&'
            },
            link: function(scope){
                scope.listChecked = {};
                scope.data = {};
                scope.array = [];
                scope.$watch('array', function(defaultArray){
                    scope.isNoItem = defaultArray.length <= 0 ? true : false;

                    //Set default for list checkbox
                    if(defaultArray.length > 0){
                        defaultArray.forEach(element => {
                            scope.listChecked[element._id] = false;
                        });
                        scope.data.isCheckAll = false;
                    }
                }, true)
                
                scope.onSingleSelectChange = (song)=>{
                    var result = selectService.onHandleSingleChange(song, scope.listChecked, scope.data.isCheckAll, scope.multiSelect, scope.array);
                    scope.multiSelect = result.array;
                    scope.data.isCheckAll = result.checkAll;
                }
                scope.onCheckAllSelectChange = function () {
                    scope.multiSelect = selectService.onHandleCheckAll(scope.listChecked, scope.data.isCheckAll, scope.multiSelect, scope.array);
                }
            }
        }
    }

} ());
