
(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope) {

        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        $scope.isSingleSelectSong = false;
        $scope.isCheckAnySong = false;
        $scope.numberOfItems = '10';
        

        init();

        function init() {
            songService.getListSongs().then(function(data){
                $scope.listSongsDefault = data;
                $scope.isNoItemSong = data.length <= 0 ? true : false;
    
                //Pagination
                $scope.totalItems = $scope.listSongsDefault.length;
                $scope.itemsPerPage = 10;
                $scope.currentPage = 1;
            
                $scope.$watch('currentPage', function() {
                    setPagingData($scope.currentPage, $scope.listSongsDefault);
                }, true);
                $scope.pageChanged = function(value){
                    $scope.currentPage = value;
                }
            })
        }
        
        var setPagingData = function(page, arrSongs) {
            $scope.currentPage = page;
            $scope.paginationSongs = arrSongs.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }

        $scope.onEditSong = function () {
            var song = multiSelect[0];
            $rootScope.song.name = song.name;
            $rootScope.song.artist = song.artist;
            $rootScope.song.id = song.id;
            $rootScope.isEdit = true;
            $location.path('/song');
        }

        var onConfirmDeleteSong = function (id) {
            songService.deleteSong(id);
            playlistService.getListPlaylists().then(data => {
                data.forEach(playlist => {
                    playlist.songs.forEach((element, index) => {
                        if (element.id === id) {
                            playlist.songs.splice(index, 1);
                            playlistService.updatePlaylist(playlist);
                        }
                    });
                });
            })
        }
        $scope.onDeleteSong = function (id) {
            onConfirmDeleteSong(id);
            //check the deleted item is in multiSelect. if true, remove it.
            multiSelect.forEach(function (ele, index) {
                if (ele.id == id) {
                    multiSelect.splice(index, 1);
                }
            })
        }
        $scope.onMultiDelete = function () {
            multiSelect.forEach(function (ele) {
                onConfirmDeleteSong(ele.id);
                multiSelect = [];
            })
            $scope.isAll['all'] = false;
        }
        $scope.onSingleChange = function (song) {
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $scope.listSongsDefault);
            $scope.isSingleSelectSong = multiSelect.length === 1 ? true : false;
            if(multiSelect.length > 0){
                $scope.isCheckAnySong = true;
            }
        }
        $scope.onCheckAll = function () {
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $scope.listSongsDefault);
            if($scope.isSingleSelectSong){
                $scope.isSingleSelectSong = false;
            }
            $scope.isCheckAnySong = multiSelect.length <= 0 ? false : true;
        }
        $scope.onChangeSearch = function (keyWord) {
            $scope.searchKeyWord = keyWord;
        }
        $scope.onChangeNumberOfItems = (number) => {
            $scope.itemsPerPage = Number(number);
        }

    }

}());
