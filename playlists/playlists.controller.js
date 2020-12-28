(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location, CONSTANT) {
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        $scope.isSingleSelectPlaylist = false;
        $scope.isCheckAnyPlaylist = false;
        $scope.detailPlaylist = {};
        $scope.arrTitlePlaylist = CONSTANT.TITLE_PLAYLIST;
        $scope.arrTitleSong = CONSTANT.TITLE_SONG;

        $scope.$watch('multiSelect', function(){
            $scope.isSingleSelectPlaylist = $scope.multiSelect.length === 1 ? true : false;
            $scope.isCheckAnyPlaylist = $scope.multiSelect.length > 0 ? true : false;
        }, true)

        $scope.onViewDetail = (param) =>{
            $scope.detailPlaylist = param;
        }
        
        
        init();
        function init() {
            playlistService.getListPlaylists().then(function(data){
                $scope.listPlaylistsDefault = data.reverse();
    
                //Pagination
                $scope.pagination_playlist = {
                    totalItems: $scope.listPlaylistsDefault.length,
                    itemsPerPage: 10,
                    currentPage: 1,
                }
            
                $scope.$watch('currentPage', function() {
                    $scope.paginationPlaylists = $scope.listPlaylistsDefault.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
                }, true);
            })
        }

        $scope.onClickAddPlaylist = function(){
            $location.path('/create-playlist');
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            $scope.multiSelect.forEach(element => {
                playlistService.deletePlaylist(element._id).then(res=>{
                    playlistService.getListPlaylists().then(function(data){
                        $scope.listPlaylistsDefault = data.reverse();
                    });
                    if(res){
                        $.notify({
                            message: 'Delete playlist <b>successfully</b>' 
                        },{
                            type: 'success'
                        });
                    }
                }, ()=>{
                    $.notify({
                        message: 'Delete playlist <b>failure</b>' 
                    },{
                        type: 'danger'
                    });
                });
            });
        }
        $scope.onEditPlaylist = function () {
            var playlist = $scope.multiSelect[0];
            $rootScope.playlistEdit = {
                _id: playlist._id,
                name: playlist.name,
                kinds: playlist.kinds,
                songs: playlist.songs,
            }
            $rootScope.isEditPlaylist = true;
            $location.path('/create-playlist');
        }
    }

}());