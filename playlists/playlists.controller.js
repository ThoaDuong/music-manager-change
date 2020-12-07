(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location) {
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        
        init();
        function init() {
            playlistService.getListPlaylists().then(function(data){
                $scope.listPlaylistsDefault = data;
    
                //Pagination
                $scope.totalItems = $scope.listPlaylistsDefault.length;
                $scope.itemsPerPage = 5 ;
                $scope.currentPagePlaylist = 1;
            
                $scope.$watch('currentPagePlaylist', function() {
                    setPaginationData($scope.currentPagePlaylist, $scope.listPlaylistsDefault);
                }, true);
                $scope.pageChanged = function(value){
                    $scope.currentPagePlaylist = value;
                }
            })
        }
        var setPaginationData = function(page, arrPlaylists) {
            $scope.currentPagePlaylist = page;
            $rootScope.paginationPlaylists = arrPlaylists.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }

        var onHandleDeletePlaylist = function (id) {
            playlistService.deletePlaylist(id).then(data => {
                $scope.listPlaylistsDefault.forEach((element, index) => {
                    if (element.id === data.id) {
                        $scope.listPlaylistsDefault.splice(index, 1);
                    }
                });
            })
        }

        $scope.onClickAddPlaylist = function(){
            $location.path('/create-playlist');
        }
        $scope.onDeletePlaylist = function (playlist_id) {
            onHandleDeletePlaylist(playlist_id);
            multiSelect.forEach(function (ele, index) {
                if (ele.id === playlist_id) {
                    multiSelect.splice(index, 1);
                }
            })
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            multiSelect.forEach(element => {
                onHandleDeletePlaylist(element.id);
            });
        }
        $scope.onEditPlaylist = function (playlist) {
            $rootScope.playlistEdit = {
                id: playlist.id,
                name: playlist.name,
                songs: playlist.songs,
            }
            $rootScope.isEditPlaylist = true;
            $location.path('/create-playlist');
        }
        $scope.onSingleChange = function (song) {
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $scope.listPlaylistsDefault);
        }
        $scope.onCheckAll = function () {
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $scope.listPlaylistsDefault);
        }

        $scope.onViewDetailPlaylist = function(playlist){
            $scope.detailPlaylist = playlist;
        }
    }

}());