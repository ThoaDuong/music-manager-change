(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location) {
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        $scope.isSingleSelectPlaylist = false;
        $scope.isCheckAnyPlaylist = false;
        $scope.detailPlaylist = {};

        $scope.$watch('multiSelect', function(){
            $scope.isSingleSelectPlaylist = $scope.multiSelect.length === 1 ? true : false;
            $scope.isCheckAnyPlaylist = $scope.multiSelect.length > 0 ? true : false;
        }, true)
        
        init();
        function init() {
            playlistService.getListPlaylists().then(function(data){
                $scope.listPlaylistsDefault = data.reverse();
    
                //Pagination
                $scope.totalItems = $scope.listPlaylistsDefault.length;
                $scope.itemsPerPage = 10;
                $scope.currentPagePlaylist = 1;
            
                $scope.$watch('currentPagePlaylist', function() {
                    $scope.paginationPlaylists = $scope.listPlaylistsDefault.slice(($scope.currentPagePlaylist - 1) * $scope.itemsPerPage, $scope.currentPagePlaylist * $scope.itemsPerPage);
                }, true);
            })
        }

        $scope.onClickAddPlaylist = function(){
            $location.path('/create-playlist');
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            $scope.multiSelect.forEach(element => {
                playlistService.deletePlaylist(element._id);
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