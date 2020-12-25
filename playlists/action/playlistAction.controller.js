(function(){
    'use strict';

    musicManager.controller('playlistActionController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, $location, playlistService, songService, CONSTANT){
        
        $scope.selectedSongs = [];
        //Add: Left to right
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        //Remove: Right to left
        $scope.isCheckRemove = {};
        $scope.isAllRemove = {};
        $scope.multiSelectRemove = [];
        
        $scope.listKindsOfMusic = CONSTANT.LIST_KINDS_OF_MUSIC;

        $scope.$watch('defaultSongs', function(){
            $scope.isNoItemSelected = $scope.selectedSongs && $scope.selectedSongs.length <= 0 ? true : false;
            $scope.isNoItemDefault = $scope.defaultSongs && $scope.defaultSongs.length <= 0 ? true : false;
        }, true)
        
        init();

        function init(){
            playlistService.getListPlaylists().then(data => {
                $scope.listPlaylistsDefault = data;
            })
            songService.getListSongs().then(data => {
                $scope.listSongsDefault = data;
                $scope.defaultSongs = data;
                $scope.arrTitle = Object.keys(data[0]);

                $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
                $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
                if($rootScope.playlistEdit._id !== -1){
                    $scope.selectedSongs = $rootScope.playlistEdit.songs;
                    $scope.playlistName = $rootScope.playlistEdit.name;
                    $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
                    $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
    
                    $rootScope.playlistEdit.songs.forEach(root => {
                        $scope.defaultSongs.forEach((element, index) => {
                            if(root._id === element._id){
                                $scope.defaultSongs.splice(index, 1);
                            }
                        });
                    });
                }
            })
        }
        

        $scope.onAddSelectedSong = function(){
            $scope.multiSelect.forEach(element => {
                $scope.defaultSongs.forEach((item, index) => {
                    if(element._id === item._id){
                        $scope.defaultSongs.splice(index, 1);
                    }
                });
            });
            $scope.selectedSongs = $scope.selectedSongs.concat($scope.multiSelect);
            $scope.multiSelect = [];
        }
        $scope.onAddAllSongs = function(){
            $scope.defaultSongs = [];
            $scope.selectedSongs = [].concat($scope.listSongsDefault);
            $scope.multiSelect = [];
        }
        $scope.onRemoveSelectedSong = function(){
            $scope.multiSelectRemove.forEach(element => {
                $scope.selectedSongs.forEach((item, index) => {
                    if(element._id === item._id){
                        $scope.selectedSongs.splice(index, 1);
                        $scope.defaultSongs.push(item);
                        // $scope.defaultSongs = $scope.defaultSongs.concat([item]);
                    }
                });
            });
            $scope.multiSelectRemove = [];
        }
        $scope.onRemoveAllSongs = function(){
            $scope.defaultSongs = [].concat($scope.listSongsDefault);
            $scope.selectedSongs = [];
            $scope.multiSelectRemove = [];
        }

        
        var onCreatePlaylist = function(){
            var newPlaylist = {
                name: $scope.playlistName,
                kinds: $scope.playlistKinds,
                songs: $scope.selectedSongs,
            }
            playlistService.addPlaylist(newPlaylist).then(data => {
                $scope.listPlaylistsDefault.push(data);
                $location.path('/playlist');
            })
            
            $scope.multiSelect = [];
            $scope.multiSelectRemove = [];
        }
        var onApplyEditPlaylist = function(){
            var updatePlaylist = {
                _id: $rootScope.playlistEdit._id,
                kinds: $scope.playlistKinds,
                name: $scope.playlistName,
                songs: $scope.selectedSongs,
            }
            playlistService.updatePlaylist(updatePlaylist).then(() => {
                $rootScope.playlistEdit = {
                    _id: -1,
                    name: '',
                    kinds: 'R&B',
                    songs: [],
                }
                $rootScope.isEditPlaylist = false;
                $location.path('playlist');
            });
            
        }
        $scope.onSubmitPlaylist = function(){
            if($rootScope.playlistEdit._id === -1){
                onCreatePlaylist();
            }else{
                onApplyEditPlaylist();
            }
        }
        $scope.onCancelCreatePlaylist = function(){
            $scope.multiSelect = [];
            $scope.multiSelectRemove = [];
            $rootScope.playlistEdit = {
                _id: -1,
                name: '',
                songs: [],
            }
            $rootScope.isEditPlaylist = false;
            $location.path('/playlist');
        }

    }

}());