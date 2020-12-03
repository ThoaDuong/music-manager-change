(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location) {
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        $scope.listPlaylist = $rootScope.listPlaylistsDefault;
        init();
        function init() {
            // if($scope.listPlaylist){
            //     $scope.detailPlaylist = $scope.listPlaylist[0];
            // }
        }

        playlistService.getListPlaylists().then(function(data){
            $scope.listPlaylists = data;

            //Pagination
            $scope.totalItems = $scope.listPlaylists.length;
            $scope.itemsPerPage = 5 ;
            $scope.currentPagePlaylist = $rootScope.currentPagePlaylist;
        
            $scope.$watch('currentPagePlaylist', function() {
                $rootScope.setPaginationData($rootScope.currentPagePlaylist, $scope.listPlaylists);
                
            }, true);
            $scope.pageChanged = function(value){
                $rootScope.currentPagePlaylist = value;
            }
        })
        $rootScope.setPaginationData = function(page, arrPlaylists) {
            $rootScope.currentPagePlaylist = page;
            $rootScope.paginationPlaylists = arrPlaylists.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }
        

        var onHandleDeletePlaylist = function (id) {
            playlistService.deletePlaylist(id).then(data => {
                $scope.listPlaylists.forEach((element, index) => {
                    if (element.id === data.id) {
                        $scope.listPlaylists.splice(index, 1);
                    }
                    $rootScope.setPaginationData($rootScope.currentPagePlaylist, $scope.listPlaylists);
                });
            })
        }

        $scope.onDeletePlaylist = function (playlist_id) {
            var isSure = confirm('Are you sure you want to delete this playlist?');
            if (!isSure) {
                return;
            }
            onHandleDeletePlaylist(playlist_id);
            multiSelect.forEach(function (ele, index) {
                if (ele.id === playlist_id) {
                    multiSelect.splice(index, 1);
                }
            })
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            var isSure = confirm('Are you sure you want to delete selected playlists?');
            if (!isSure) {
                return;
            }
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
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $rootScope.listPlaylistsDefault);
        }
        $scope.onCheckAll = function () {
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $rootScope.listPlaylistsDefault);
        }

        $scope.onViewDetailPlaylist = function(playlist){
            $scope.detailPlaylist = playlist;
        }
    }

}());