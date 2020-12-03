
(function(){
    'use strict';

    musicManager.controller('actionSongController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope){
        init();
        // $scope.listSongs = $rootScope.listSongsDefault;
        // $scope.listPlaylists = $rootScope.listPlaylistsDefault;

        function init(){
        }

        $scope.onClickAddSong = function(){
            $location.path("/song");
        }
        $scope.onCreateSong = function(){
            songService.addSong($scope.song).then(function(data){
                $rootScope.listSongsDefault.push(data);
                $rootScope.setPagingData($rootScope.currentPage, $rootScope.listSongsDefault);
                $location.path("/manager");
                $rootScope.resetSong();
            })
        }
        $scope.onCancelSubmit = function(){
            $rootScope.resetSong();
            $location.path("/manager");
        }
        $scope.onApplyEditSong = function(song){
            $rootScope.listSongsDefault.forEach(function(ele){
                if(ele.id === song.id){
                    ele.name = song.name;
                    ele.artist = song.artist;
                    songService.updateSong(song).then(() => {
                        songService.getListSongs().then(data => {
                            $rootScope.setPagingData($rootScope.currentPage, data);
                        })
                    });
                }
            })
            
            $rootScope.listPlaylistsDefault.forEach(playlist => {
                playlist.songs.forEach(element => {
                    if(element.id === song.id){
                        element.name = song.name;
                        element.artist = song.artist;
                        playlistService.updatePlaylist(playlist);
                    }
                });
            });
            $rootScope.isEdit = false;
            $rootScope.resetSong();
            $location.path("/manager");
        }
    }
}());