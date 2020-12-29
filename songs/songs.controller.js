
(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope, CONSTANT) {
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        $scope.isSingleSelectSong = false;
        $scope.isCheckAnySong = false; 
        $scope.arrTitleSong = CONSTANT.TITLE_SONG;  

        $scope.$watch('multiSelect', function(){
            $scope.isSingleSelectSong = $scope.multiSelect.length === 1 ? true : false;
            $scope.isCheckAnySong = $scope.multiSelect.length > 0 ? true : false;
        }, true)

        $scope.pagination_song = {
            itemsPerPage: 5,
            currentPage: 1,
        }
        
        init();
        function init() {
            songService.getListSongs().then(function(data){
                $scope.listSongsDefault = data.reverse();
                $scope.pagination_song.totalItems = $scope.listSongsDefault.length;

                $scope.$watch('currentPage', function() {
                    $scope.paginationSongs = $scope.listSongsDefault.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
                }, true);
            })
        }

        

        $scope.onEditSong = function () {
            var song = $scope.multiSelect[0];
            $rootScope.song.name = song.name;
            $rootScope.song.artist = song.artist;
            $rootScope.song._id = song._id;
            $rootScope.isEdit = true;
            $location.path('/song');
        }
        $scope.onClickAddSong = function(){
            $location.path("/song");
        }

        var onConfirmDeleteSong = function (song) {
            songService.deleteSong(song._id).then((data)=>{
                if(data){
                    $.notify({
                        message: 'Delete song <b>' + data.name + '</b> successfully' 
                    },{
                        type: 'success'
                    });
                }
                songService.getListSongs().then(data=>{
                    $scope.listSongsDefault = data.reverse();
                });
            }, ()=>{
                $.notify({
                    message: 'Delete song  <b>' + song.name + '</b> failure' 
                },{
                    type: 'danger'
                });
            });
            playlistService.getListPlaylists().then(data => {
                data.forEach(playlist => {
                    playlist.songs.forEach((element, index) => {
                        if (element._id === song._id) {
                            playlist.songs.splice(index, 1);
                            playlistService.updatePlaylist(playlist);
                        }
                    });
                });
            })
        }
        $scope.onMultiDelete = function () {
            $scope.multiSelect.forEach(function (ele) {
                onConfirmDeleteSong(ele);
                $scope.multiSelect = [];
            })
        }
        $scope.onChangeSearch = function (keyWord) {
            $scope.searchKeyWord = keyWord;
        }
    }
}());
