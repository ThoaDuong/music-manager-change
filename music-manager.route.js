musicManager.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'songs/view/songs.view.html',
        
    })
    .when('/manager', {
        templateUrl: 'songs/view/songs.view.html',
    })
    .when('/song', {
        templateUrl: 'songs/view/songs.form.html',
    })
    .when('/playlist', {
        templateUrl: 'playlists/view/playlists.html',
    })
    .when('/add-playlist', {
        templateUrl: 'playlists/view/playlist.form.html',
    })
})