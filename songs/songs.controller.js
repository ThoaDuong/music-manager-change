musicManager.controller('songsController', function($scope, $location, songService){
    //Variable declaration of songs
    $scope.song;
    resetSong = function(){
        $scope.song = {
            name: '',
            artist: ''
        }
    }
    resetSong();
    songService.getListSongs().then(function(data){
        $scope.listSongs = data;
    })
    $scope.isEdit = false;
    $scope.isCheck = {};
    $scope.isAll = {};
    var multiSelect = [];
   



    //Function declaration of songs
    
    
    var onConfirmDeleteSong = function(id){
        songService.deleteSong(id).then(function(item){
            $scope.listSongs.forEach((element, index) => {
                if(element.id === item.id){
                    $scope.listSongs.splice(index, 1);
                }
            });
        })
    }
    $scope.onDeleteSong = function(id){
        var isSure = confirm('Are you sure you want to delete this song?');
        if(isSure){
            onConfirmDeleteSong(id);
            //check the deleted item is in multiSelect. if true, remove it.
            multiSelect.forEach(function(ele, index){
                if(ele.id == id){
                    multiSelect.splice(index, 1);
                }
            })
        }
    }

    $scope.onMultiDelete = function(){
        var isSure = confirm('Are you sure you want to delete selected songs?');
        if(isSure){
            multiSelect.forEach(function(ele){
                onConfirmDeleteSong(ele.id);
                multiSelect = [];
            })
            $scope.isAll['all'] = false;
        }
    }
    $scope.onSingleChange = function(song){
        if($scope.isCheck[song.id]){
            multiSelect.push(song);
            if(multiSelect.length == $scope.listSongs.length){
                $scope.isAll = { all: true };
            }
        }
        else{
            multiSelect.forEach(function(ele, index){
                if(ele.id == song.id){
                    multiSelect.splice(index, 1);
                }
            })
            $scope.isAll = { all: false };
        }
    }
    $scope.onCheckAll = function(){
        if($scope.isAll['all']){
            multiSelect = [];
            $scope.listSongs.forEach(function(ele){
                multiSelect.push(ele);
                $scope.isCheck[ele.id] = true;
            })
        }
        else{
            multiSelect = [];
            $scope.listSongs.forEach(function(ele){
                $scope.isCheck[ele.id] = false;
            })
        }
    }
})
