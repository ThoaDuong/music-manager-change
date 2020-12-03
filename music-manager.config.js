musicManager.run(function($rootScope, songService, playlistService) {
    songService.getListSongs().then(function(data){
        $rootScope.listSongsDefault = data;
    })
    playlistService.getListPlaylists().then(function(data){
        $rootScope.listPlaylistsDefault = data;
    })
    $rootScope.linkName = 'Song';
    $rootScope.currentPage = 1;
    $rootScope.currentPagePlaylist = 1;



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