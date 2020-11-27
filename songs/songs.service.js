musicManager.service('songService', function($http){
    this.url = 'https://5fb73d8d8e07f00016642927.mockapi.io';

    this.getListSongs = function(){
        return  $http.get(this.url + '/song').then(function(res){
            return res.data;
        })
    }
    this.addSong = function(song){
        var request = {
            method: 'POST',
            url: this.url + '/song',
            headers: {
                'Content-Type': 'application/json'
            },
            data: song
        }
        return $http(request).then(function(res){
            return res.data;
        })
    }
    this.updateSong = function(song){
        var request = {
            method: 'PUT',
            url: this.url + '/song/' + song.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: song
        }
        return $http(request).then(function(res){
            return res.data;
        })
    }
    this.deleteSong = function(id){
        return $http.delete(this.url + '/song/' + id).then(function(res){
            return res.data;
        })
    }
})