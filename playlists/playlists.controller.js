(function () {
    'use strict';

    musicManager.controller('playlistsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, playlistService, $location) {
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        $scope.isSingleSelectPlaylist = false;
        $scope.isCheckAnyPlaylist = false;
        $scope.numberOfItems = '10';
        
        init();
        function init() {
            playlistService.getListPlaylists().then(function(data){
                $scope.listPlaylistsDefault = data;
                $scope.isNoItemPlaylist = data.length <= 0 ? true : false;
    
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
            $scope.currentPagePlaylist = page;
            $rootScope.paginationPlaylists = arrPlaylists.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }

        $scope.onClickAddPlaylist = function(){
            $location.path('/create-playlist');
        }
        $scope.onDeletePlaylistMultiSelected = function () {
            multiSelect.forEach(element => {
                playlistService.deletePlaylist(element.id);
            });
        }
        $scope.onEditPlaylist = function () {
            var playlist = multiSelect[0];
            $rootScope.playlistEdit = {
                id: playlist.id,
                name: playlist.name,
                kinds: playlist.kinds,
                songs: playlist.songs,
            }
            $rootScope.isEditPlaylist = true;
            $location.path('/create-playlist');
        }
        $scope.onSingleChange = function (song) {
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $scope.listPlaylistsDefault);
            $scope.isSingleSelectPlaylist = multiSelect.length === 1 ? true : false;
            $scope.isCheckAnyPlaylist = multiSelect.length > 0 ? true : false;
        }
        $scope.onCheckAll = function () {
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $scope.listPlaylistsDefault);
            if($scope.isSingleSelectPlaylist){
                $scope.isSingleSelectPlaylist = false;
            }
            $scope.isCheckAnyPlaylist = multiSelect.length > 0 ? true : false;
        }

        $scope.onViewDetailPlaylist = function(playlist){
            $scope.isNoItemDetailPlaylist = playlist.songs.length <= 0 ? true : false;
            $scope.detailPlaylist = playlist;
        }
        $scope.onChangeNumberOfItems = (number) => {
            $scope.itemsPerPage = Number(number);
        }
    }

}());