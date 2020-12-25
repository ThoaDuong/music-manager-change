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
                detailPlaylist: '=',
                type: '@',
                searchKeyWord: '=',
                arrPagination: '=',
                itemsPerPage: '=',
                currentPage : '=',
            },
            link: function(scope){
                scope.listChecked = {};
                scope.isCheckAll = false;
                scope.array = [];
                scope.arrTitle = [];

                if(scope.type === 'song'){
                    scope.arrTitle = CONSTANT.TITLE_SONG;
                }
                if(scope.type === 'playlist'){
                    scope.arrTitle = CONSTANT.TITLE_PLAYLIST;
                }
                scope.$watch('array', function(newValue){
                    scope.isNoItem = newValue.length <= 0 ? true : false;
                })
                
                scope.onSingleSelectChange = (song)=>{
                    scope.multiSelect = selectService.onHandleSingleChange(song, scope.listChecked, scope.isCheckAll, scope.multiSelect, scope.array);
                }
                scope.onCheckAllSelectChange = function () {
                    scope.isCheckAll = !scope.isCheckAll;
                    scope.multiSelect = selectService.onHandleCheckAll(scope.listChecked, scope.isCheckAll, scope.multiSelect, scope.array);
                }
                scope.onViewDetailPlaylist = function(playlist){
                    if(playlist['songs']){
                        scope.detailPlaylist = playlist;
                    }
                }
                //After add/remove -> set multiSelect = [] and this is newVal
                scope.$watch('multiSelect', function(newVal, oldVal){
                    if(oldVal && oldVal.length > 0){
                        //Check if multiSelect is empty, check set false
                        if(scope.multiSelect.length <= 0){
                            oldVal.forEach(element => {
                                scope.listChecked[element._id] = false;
                            });
                            scope.listChecked['all'] = false;
                        }
                        
                    }
                })
                scope.$watch('arrPagination', function(){
                    // console.log('pagination', scope.arrPagination);
                })
            }
        }
    }

} ());
