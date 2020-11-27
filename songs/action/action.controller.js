musicManager.controller('actionSongController', function($scope, $location, songService){
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
    $scope.onEditSong = function(song){
        
        $scope.song.name = song.name;
        $scope.song.artist = song.artist;
        $scope.song.id = song.id;
        $scope.isEdit = true;
        $location.path('/song');
    }
    $scope.onApplyEditSong = function(song){
        $scope.listSongs.forEach(function(ele){
            if(ele.id === song.id){
                ele.name = song.name;
                ele.artist = song.artist;
            }
        })
        songService.updateSong(song);
        $scope.isEdit = false;
        resetSong();
        $location.path("/manager");
    }
})