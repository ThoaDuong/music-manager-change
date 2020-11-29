musicManager.controller('managerController', function($scope, songService, $rootScope){
    $scope.linkName = 'Song';
    songService.getListSongs().then(function(data){
        $scope.listSongs = data;
    })
    $scope.song;
    resetSong = function(){
        $scope.song = {
            name: '',
            artist: ''
        }
    }
    resetSong();
    $rootScope.isEdit = false;
})
