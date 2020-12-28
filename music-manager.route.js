musicManager.config(function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('', {
        templateUrl: 'songs/view/songs.view.html',
        controller: 'songsController',
    })
    .when('/manager', {
        templateUrl: 'songs/view/songs.view.html',
        controller: 'songsController',
    })
    .when('/song', {
        templateUrl: 'songs/action/songs.form.html',
        controller: 'actionSongController',
    })
    .when('/playlist', {
        templateUrl: 'playlists/view/playlists.html',
        controller: 'playlistsController',
    })
    .when('/create-playlist', {
        templateUrl: 'playlists/action/playlist.template.html',
        controller: 'playlistActionController',
    })
})