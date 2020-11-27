musicManager.controller('managerController', function($scope, $location, songService, playlistService){
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
        console.log($scope.song);
    })
    $scope.isEdit = false;
    $scope.isCheck = {};
    $scope.isAll = {};
    var multiSelect = [];
    $scope.linkName = 'Song';
    // var url = $location.url().toString().split('/');
    // if(url[1] == 'playlist'){
    //     $scope.linkName = 'Playlist';
    // }
    // else{
    //     $scope.linkName = 'Song';
    // }
   



    //Function declaration of songs
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
      //  resetSong();
        $location.path("/manager");
    }
    $scope.onEditSong = function(song){
        $scope.song.name = song.name;
        $scope.song.artist = song.artist;
        $scope.song.id = song.id;
        $scope.isEdit = true;
        $location.path('/song')
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
