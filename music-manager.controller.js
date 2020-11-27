musicManager.controller('managerController', function($scope, songService){
    $scope.linkName = 'Song';
    songService.getListSongs().then(function(data){
        $scope.listSongs = data;
    })
})
