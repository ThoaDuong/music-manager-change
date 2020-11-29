musicManager.controller('actionSongController', function($scope, $location, songService, $rootScope){
    $scope.onClickAddSong = function(){
        $location.path("/song");
    }
    $scope.onCreateSong = function(){
        songService.addSong($scope.song).then(function(data){
            $scope.listSongs.push(data);
        })
        resetSong();
        $location.path("/manager");
    }
    $scope.onCancelSubmit = function(){
        resetSong();
        $location.path("/manager");
    }
    $scope.onApplyEditSong = function(song){
        $scope.listSongs.forEach(function(ele){
            if(ele.id === song.id){
                ele.name = song.name;
                ele.artist = song.artist;
            }
        })
        songService.updateSong(song);
        $rootScope.isEdit = false;
        resetSong();
        $location.path("/manager");
    }
    
})