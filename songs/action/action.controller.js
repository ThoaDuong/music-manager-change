
(function(){
    'use strict';

    musicManager.controller('actionSongController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope){
        init();
        function init(){
        }

        $scope.onClickAddSong = function(){
            $location.path("/song");
        }
        $scope.onCreateSong = function(){
            songService.addSong($scope.song);
            $location.path("/manager");
            $rootScope.resetSong();
        }
        $scope.onCancelSubmit = function(){
            $rootScope.resetSong();
            $location.path("/manager");
        }
        $scope.onApplyEditSong = function(song){
            songService.updateSong(song);
            playlistService.getListPlaylists().then(data => {
                data.forEach(playlist => {
                    playlist.songs.forEach((element) => {
                        if (element.id === song.id) {
                            element.name = song.name;
                            element.artist = song.artist;
                            playlistService.updatePlaylist(playlist);
                        }
                    });
                });
            })
            $rootScope.isEdit = false;
            $rootScope.resetSong();
            $location.path("/manager");
        }
    }
}());