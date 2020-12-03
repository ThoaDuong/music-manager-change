(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope) {

        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        $scope.listSongs =$rootScope.listSongsDefault;

        init();

        function init() {
        }

        songService.getListSongs().then(function(data){
            $scope.listSongs = data;

            //Pagination
            $scope.totalItems = $scope.listSongs.length;
            $scope.itemsPerPage = 6;
            $scope.currentPage = $rootScope.currentPage;
        
            $scope.$watch('currentPage', function() {
                $rootScope.setPagingData($rootScope.currentPage, $scope.listSongs);
            }, true);
            $scope.pageChanged = function(value){
                $rootScope.currentPage = value;
            }
        })
        $rootScope.setPagingData = function(page, arrSongs) {
            $rootScope.currentPage = page;
            $rootScope.paginationSongs = arrSongs.slice((page - 1) * $scope.itemsPerPage, page * $scope.itemsPerPage);
        }
        


        $scope.onEditSong = function (song) {
            $rootScope.song.name = song.name;
            $rootScope.song.artist = song.artist;
            $rootScope.song.id = song.id;
            $rootScope.isEdit = true;
            $location.path('/song');
        }

        var onConfirmDeleteSong = function (id) {
            songService.deleteSong(id).then(function (item) {
                $scope.listSongs.forEach((element, index) => {
                    if (element.id === item.id) {
                        $scope.listSongs.splice(index, 1);
                        console.log('Test list songs', $scope.listSongs);
                        $rootScope.setPagingData($rootScope.currentPage, $scope.listSongs);
                    }
                });
                

                $rootScope.listPlaylistsDefault.forEach(playlist => {
                    playlist.songs.forEach((element, index) => {
                        if (element.id === id) {
                            playlist.songs.splice(index, 1);
                            $rootScope.setPaginationData($rootScope.currentPagePlaylist, $rootScope.listPlaylistsDefault);
                        }
                    });
                });
            })
            
        }
        $scope.onDeleteSong = function (id) {
            var isSure = confirm('Are you sure you want to delete this song?');
            if (isSure) {
                onConfirmDeleteSong(id);
                //check the deleted item is in multiSelect. if true, remove it.
                multiSelect.forEach(function (ele, index) {
                    if (ele.id == id) {
                        multiSelect.splice(index, 1);
                    }
                })
            }
        }
        $scope.onMultiDelete = function () {
            var isSure = confirm('Are you sure you want to delete selected songs?');
            if (isSure) {
                multiSelect.forEach(function (ele) {
                    onConfirmDeleteSong(ele.id);
                    multiSelect = [];
                })
                $scope.isAll['all'] = false;
            }
        }
        $scope.onSingleChange = function (song) {
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $rootScope.listSongsDefault);
        }
        $scope.onCheckAll = function () {
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $rootScope.listSongsDefault);
        }
        $scope.onChangeSearch = function (keyWord) {
            $scope.searchKeyWord = keyWord;
        }

    }

}());
