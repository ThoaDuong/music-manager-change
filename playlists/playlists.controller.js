(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location) {
        $scope.multiSelect = [];
        $scope.isSingleSelectPlaylist = false;
        $scope.isCheckAnyPlaylist = false;
        $scope.numberOfItems = '10';
        
        init();
        function init() {
            playlistService.getListPlaylists().then(function(data){
                $scope.listPlaylistsDefault = data;
                $scope.isNoItemPlaylist = data.length <= 0 ? true : false;
                $scope.arrTitle = Object.keys(data[0]);
    
                //Pagination
                $scope.totalItems = $scope.listPlaylistsDefault.length;
                $scope.itemsPerPage = 10;
                $scope.currentPagePlaylist = 1;
            
                $scope.$watch('currentPagePlaylist', function() {
                    setPaginationData($scope.currentPagePlaylist, $scope.listPlaylistsDefault);
                }, true);
                $scope.pageChangedPlaylist = function(value){
                    $scope.currentPagePlaylist = value;
                }
            })
        }
        var setPaginationData = function(page, arrPlaylists) {
            $scope.paginationPlaylists = arrPlaylists.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }

        $scope.onClickAddPlaylist = function(){
            $location.path('/create-playlist');
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            $scope.multiSelect.forEach(element => {
                playlistService.deletePlaylist(element.id);
            });
        }
        $scope.onEditPlaylist = function () {
            var playlist = $scope.multiSelect[0];
            $rootScope.playlistEdit = {
                id: playlist.id,
                name: playlist.name,
                kinds: playlist.kinds,
                songs: playlist.songs,
            }
            $rootScope.isEditPlaylist = true;
            $location.path('/create-playlist');
        }

        $scope.onChangeNumberOfItems = (number) => {
            $scope.itemsPerPage = Number(number);
        }
    }

}());