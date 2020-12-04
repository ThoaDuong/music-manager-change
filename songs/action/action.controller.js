
(function(){
    'use strict';

    musicManager.controller('actionSongController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope){
        init();

        function init(){
            songService.getListSongs().then(function(data){
                $scope.listSongsDefault = data;
            })
            playlistService.getListPlaylists().then(data => {
                $scope.listPlaylistsDefault = data;
            })
        }

        $scope.onClickAddSong = function(){
            $location.path("/song");
        }
        $scope.onCreateSong = function(){
            songService.addSong($scope.song).then(function(data){
                $scope.listSongsDefault.push(data);
                $location.path("/manager");
                $rootScope.resetSong();
            })
        }
        $scope.onCancelSubmit = function(){
            $rootScope.resetSong();
            $location.path("/manager");
        }
        $scope.onApplyEditSong = function(song){
            $scope.listSongsDefault.forEach(function(ele){
                if(ele.id === song.id){
                    ele.name = song.name;
                    ele.artist = song.artist;
                    songService.updateSong(song).then(() => {
                        songService.getListSongs().then(() => {
                            $rootScope.isEdit = false;
                            $rootScope.resetSong();
                            $location.path("/manager");
                        })
                    });
                }
            })
            
            $scope.listPlaylistsDefault.forEach(playlist => {
                playlist.songs.forEach(element => {
                    if(element.id === song.id){
                        element.name = song.name;
                        element.artist = song.artist;
                        playlistService.updatePlaylist(playlist);
                    }
                });
            });
            
        }
    }
}());