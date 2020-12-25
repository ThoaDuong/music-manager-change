musicManager.service('playlistService', function($http, CONSTANT){
    // this.url = 'https://5fb73d8d8e07f00016642927.mockapi.io';
    // this.url = 'http://localhost:3000';
    this.url = CONSTANT.DB_URL;

    this.getListPlaylists = function(){
        return  $http.get(this.url + '/playlist').then(function(res){
            return res.data;
        })
    }
    this.addPlaylist = function(playlist){
        var request = {
            method: 'POST',
            url: this.url + '/playlist',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: playlist.name,
                kinds: playlist.kinds,
                songs: playlist.songs
            },
        }
        return $http(request).then(function(res){
            return res.data;
        })
    }
    
    this.deletePlaylist = function(id){
        return $http.delete(this.url + '/playlist/' + id).then(function(res){
            return res.data;
        })
    }

    this.updatePlaylist = function(playlist){
        var request = {
            method: 'PUT',
            url: this.url + '/playlist/' + playlist._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                name: playlist.name,
                kinds: playlist.kinds,
                songs: playlist.songs
            },
        }
        return $http(request).then(function(res){
            return res.data;
        })
    }   
})