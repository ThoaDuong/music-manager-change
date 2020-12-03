
(function(){
    'use strict';

    musicManager.controller('actionSongController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, $rootScope){
        init();
        $scope.listSongs = $rootScope.listSongsDefault;
        $scope.listPlaylists = $rootScope.listPlaylistsDefault;

        function init(){
        }

        $scope.onClickAddSong = function(){
            $location.path("/song");
        }
        $scope.onCreateSong = function(){
            songService.addSong($scope.song).then(function(data){
                $scope.listSongs.push(data);
                $rootScope.setPagingData($rootScope.currentPage, $scope.listSongs);
            })
            $rootScope.resetSong();
            $location.path("/manager");
        }
        $scope.onCancelSubmit = function(){
            $rootScope.resetSong();
            $location.path("/manager");
        }
        $scope.onApplyEditSong = function(song){
            $scope.listSongs.forEach(function(ele){
                if(ele.id === song.id){
                    ele.name = song.name;
                    ele.artist = song.artist;
                }
            })
            songService.updateSong(song).then(data => {
                $rootScope.setPagingData($rootScope.currentPage, $scope.listSongs);
            });
            
            $scope.listPlaylists.forEach(playlist => {
                playlist.songs.forEach(element => {
                    if(element.id === song.id){
                        element.name = song.name;
                        element.artist = song.artist;
                    }
                });
            });
            $rootScope.isEdit = false;
            $rootScope.resetSong();
            $location.path("/manager");
        }
    }
}());