
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
                   $.notify({
                        message: 'Create song <b>successfully</b>' 
                    },{
                        type: 'success',
                    });
                }
            }, ()=>{
                $.notify({
                    message: 'Create song <b>failure</b>' 
                },{
                    type: 'danger'
                });
            });
            $location.path("/manager");
            $rootScope.resetSong();
        }
        var onApplyEditSong = function(song){
            songService.updateSong(song).then(data=>{
                if(data){
                    $.notify({
                        message: 'Update song <b>successfully</b>' 
                    },{
                        type: 'success'
                    });
                }
            }, ()=>{
                $.notify({
                    message: 'Update song <b>failure</b>' 
                },{
                    type: 'danger'
                });
            });
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