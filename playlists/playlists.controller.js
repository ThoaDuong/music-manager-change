musicManager.controller('playlistsController', function($scope, playlistService){
    //Variable declaration of playlists
    $scope.playlist;
    resetPlaylist = function(){
        $scope.playlist = {
            name: '',
            songs: [],
        }
    }
    resetPlaylist();
    playlistService.getListPlaylists().then(function(data){
        $scope.listPlaylists = data;
    })
    //Function declaration of playlists
    $scope.onSaveChange = function(){
        console.log('Save change');
    }
})
