musicManager.config(function($locationProvider, $stateProvider){
    $locationProvider.hashPrefix('');
    $stateProvider
    .state('home', {
        url: '',
        templateUrl: 'songs/view/songs.view.html',
        controller: 'songsController',
    })
    .state('manager', {
        url: '/manager',
        templateUrl: 'songs/view/songs.view.html',
        controller: 'songsController',
        data: {
            breadcrumb: 'Song',
        }
    })
    .state('song', {
        url: '/song',
        templateUrl: 'songs/view/songs.form.html',
        controller: 'actionSongController',
    })
    .state('playlist', {
        url: '/playlist',
        templateUrl: 'playlists/view/playlists.html',
        controller: 'playlistsController',
    })
    .state('create-playlist', {
        url: '/create-playlist',
        templateUrl: 'playlists/action/playlist.template.html',
        controller: 'playlistActionController',
    })
})