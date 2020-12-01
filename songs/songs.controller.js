(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, $rootScope, $log) {

        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        $scope.listSongs = $rootScope.listSongsDefault;
        $scope.listPlaylists = $rootScope.listPlaylistsDefault;

        init();

        function init() {
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
                    }
                });
            })
            $scope.listPlaylists.forEach(playlist => {
                playlist.songs.forEach((element, index) => {
                    if (element.id === id) {
                        playlist.songs.splice(index, 1);
                    }
                });
            });
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
