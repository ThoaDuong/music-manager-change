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
                arrPagination: '=',
                arrTitle: '=',
                isNoItem: '=',
                searchKeyWord: '=',
                itemsPerPage: '=',
                currentPage : '=',
                multiSelect: '=',
                isSingleSelectSong: '=',
                isCheckAnySong: '=',
                remove: '@',
                detailPlaylist: '=',
                noItemDetail: '=',  
            },
            link: function(scope){
                scope.isCheck = {};
                scope.isAll = {};

                scope.onSingleSelectChange = (song)=>{
                    selectService.onHandleSingleChange(song, scope.isCheck, scope.isAll, scope.multiSelect, scope.array);
                    scope.isSingleSelectSong = scope.multiSelect.length === 1 ? true : false;
                    scope.isCheckAnySong = scope.multiSelect.length > 0 ? true : false;
                }
                scope.onCheckAllSelectChange = function () {
                    scope.multiSelect = selectService.onHandleCheckAll(scope.isCheck, scope.isAll, scope.multiSelect, scope.array);
                    if(scope.isSingleSelectSong){
                        scope.isSingleSelectSong = false;
                    }
                    scope.isCheckAnySong = scope.multiSelect.length > 0 ? true : false;
                }
                scope.onViewDetailPlaylist = function(playlist){
                    if(playlist['songs']){
                        scope.noItemDetail = playlist.songs.length <= 0 ? true : false;
                        scope.detailPlaylist = playlist;
                    }
                }
                
            }
        }
    }

} ());
