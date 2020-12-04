musicManager.run(function($rootScope) {
    $rootScope.linkName = 'Song';
    //Define song edit
    $rootScope.song = {
        id: -1,
        name: '',
        artist: ''
    }
    $rootScope.isEdit = false;
    $rootScope.resetSong = function(){
        $rootScope.song = {
            id: -1,
            name: '',
            artist: ''
        }
        $rootScope.isEdit = false;
    }
    //Define playlist edit
    $rootScope.playlistEdit = {
        id: -1,
        name: '',
        songs: [],
    }
    $rootScope.isEditPlaylist = false;
    $rootScope.resetPlaylistEdit = function(){
        $rootScope.playlistEdit = {
            id: -1,
            name: '',
            songs: [],
        }
        $rootScope.isEditPlaylist = false;
    }

    //Onchange checkbox
    $rootScope.onHandleSingleChange = function(song, isCheck, isAll, arrMultiSelect, arrListSongs){
        if(isCheck[song.id]){
            arrMultiSelect.push(song);
            if(arrMultiSelect.length === arrListSongs.length){
                isAll['all'] = true;
            }
        }
        else{
            arrMultiSelect.forEach(function(ele, index){
                if(ele.id == song.id){
                    arrMultiSelect.splice(index, 1);
                }
            })
            isAll['all'] = false;
        }
    }
    $rootScope.onHandleCheckAll = function(isCheck, isAll, arrMultiSelect, arrListSongs){
        if(isAll['all']){
            arrMultiSelect = [];
            arrListSongs.forEach(function(ele){
                arrMultiSelect.push(ele);
                isCheck[ele.id] = true;
            })
        }
        else{
            arrMultiSelect = [];
            arrListSongs.forEach(function(ele){
                isCheck[ele.id] = false;
            })
        }
        return arrMultiSelect;
    }



    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        //Change path
        var str_next = next.substr(next.lastIndexOf('/') + 1);
        var str_current = current.substr(next.lastIndexOf('/') + 1);
        if(str_next === 'playlist'){
            $rootScope.linkName = 'Playlist';
        }
        else{
            $rootScope.linkName = 'Song';
        }

        if(str_current === 'create-playlist' && (str_next === 'playlist' || str_next === 'manager')){
            $rootScope.resetPlaylistEdit();
        }
        if(str_current === 'song' && (str_next === 'playlist' || str_next === 'manager')){
            $rootScope.resetSong();
        }

    });
});