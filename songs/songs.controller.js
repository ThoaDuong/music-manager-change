
(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope) {
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        $scope.isSingleSelectSong = false;
        $scope.isCheckAnySong = false;
        $scope.numberOfItems = '10';


        $scope.select = [];
        $scope.$watch('multiSelect', function(){
            console.log('value', $scope.select);
        })

        
        init();
        function init() {
            songService.getListSongs().then(function(data){
                $scope.listSongsDefault = data;
                $scope.isNoItemSong = data.length <= 0 ? true : false;
                $scope.arrTitle = Object.keys(data[0]);
    
                //Pagination
                $scope.totalItems = $scope.listSongsDefault.length;
                $scope.itemsPerPage = Number($scope.numberOfItems);
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
            $scope.paginationSongs = arrSongs.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }

        $scope.onEditSong = function () {
            var song = $scope.multiSelect[0];
            $rootScope.song.name = song.name;
            $rootScope.song.artist = song.artist;
            $rootScope.song.id = song.id;
            $rootScope.isEdit = true;
            $location.path('/song');
        }
        $scope.onClickAddSong = function(){
            $location.path("/song");
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

        $scope.onMultiDelete = function () {
            $scope.multiSelect.forEach(function (ele) {
                onConfirmDeleteSong(ele.id);
                $scope.multiSelect = [];
            })
        }

        $scope.onChangeSearch = function (keyWord) {
            $scope.searchKeyWord = keyWord;
        }
        $scope.onChangeNumberOfItems = (number) => {
            $scope.itemsPerPage = Number(number);
        }
    }

}());
