
(function(){
    'use strict';

    musicManager.controller('actionSongController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope){
        init();
        function init(){
        }
        

        var onCreateSong = function(song){
            songService.addSong(song).then((data)=>{
                if(data){
                   $location.url("/manager");
                }
            }, (err)=>{
                console.log('Create song error');
            });
            $rootScope.resetSong();
        }
        var onApplyEditSong = function(song){
            songService.updateSong(song);
            playlistService.getListPlaylists().then(data => {
                data.forEach(playlist => {
                    playlist.songs.forEach((element) => {
                        if (element._id === song._id) {
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
        $scope.onSubmit = function(song){
            if(song._id === -1){
                onCreateSong(song);
            }else{
                onApplyEditSong(song);
            }
        }
        $scope.onCancelSubmit = function(){
            $rootScope.resetSong();
            $location.path("/manager");
        }
    }
}());