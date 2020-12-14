(function(){
    'use strict';

    musicManager.controller('playlistActionController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, $location, playlistService, songService, CONSTANT){
        
        $scope.selectedSongs = [];
        //Add: Left to right
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        //Remove: Right to left
        $scope.isCheckRemove = {};
        $scope.isAllRemove = {};
        var multiSelectRemove = [];
        
        $scope.listKindsOfMusic = CONSTANT.LIST_KINDS_OF_MUSIC;
        
        init();

        function init(){
            playlistService.getListPlaylists().then(data => {
                $scope.listPlaylistsDefault = data;
            })
            songService.getListSongs().then(data => {
                $scope.listSongsDefault = data;
                $scope.defaultSongs = data;

                $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
                $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
                if($rootScope.playlistEdit.id !== -1){
                    $scope.selectedSongs = $rootScope.playlistEdit.songs;
                    $scope.playlistName = $rootScope.playlistEdit.name;
                    $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
                    $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
    
                    $rootScope.playlistEdit.songs.forEach(root => {
                        $scope.defaultSongs.forEach((element, index) => {
                            if(root.id === element.id){
                                $scope.defaultSongs.splice(index, 1);
                            }
                        });
                    });
                }
            })

        }

        var resetIsCheck = function(arr, isCheck){
            arr.forEach(element => {
                isCheck[element.id] = false;
            })
        }
        var resetIsAll = function(isAll){
            isAll['all'] = false;
        }


        

        //On change add
        $scope.onSingleChange = function(song){
            $rootScope.onHandleSingleChange(song, $scope.isCheck, $scope.isAll, multiSelect, $scope.defaultSongs);
        }
        $scope.onCheckAll = function(){
            multiSelect = $rootScope.onHandleCheckAll($scope.isCheck, $scope.isAll, multiSelect, $scope.defaultSongs);
        }
        //On change remove
        $scope.onSingleChangeRemove = function(song){
            $rootScope.onHandleSingleChange(song, $scope.isCheckRemove, $scope.isAllRemove, multiSelectRemove, $scope.selectedSongs);
        }
        $scope.onCheckAllRemove = function(){
            multiSelectRemove = $rootScope.onHandleCheckAll($scope.isCheckRemove, $scope.isAllRemove, multiSelectRemove, $scope.selectedSongs);
        }
        

        $scope.onAddSelectedSong = function(){
            multiSelect.forEach(element => {
                $scope.defaultSongs.forEach((item, index) => {
                    if(element.id === item.id){
                        $scope.defaultSongs.splice(index, 1);
                    }
                });
            });
            $scope.selectedSongs = $scope.selectedSongs.concat(multiSelect);

            resetIsCheck(multiSelect, $scope.isCheck);
            resetIsAll($scope.isAll);
            multiSelect = [];
            $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
            $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
        }
        $scope.onAddAllSongs = function(){
            $scope.selectedSongs = $scope.selectedSongs.concat($scope.defaultSongs);
            $scope.defaultSongs = [];
            
            resetIsCheck(multiSelect, $scope.isCheck);
            resetIsAll($scope.isAll);
            multiSelect = [];
            $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
            $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
        }
        $scope.onRemoveSelectedSong = function(){
            multiSelectRemove.forEach(element => {
                $scope.selectedSongs.forEach((item, index) => {
                    if(element.id === item.id){
                        $scope.selectedSongs.splice(index, 1);
                        $scope.defaultSongs.push(item);
                    }
                });
            });

            resetIsCheck(multiSelectRemove, $scope.isCheckRemove);
            resetIsAll($scope.isAllRemove);
            multiSelectRemove = [];
            $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
            $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
        }
        $scope.onRemoveAllSongs = function(){
            $scope.defaultSongs = $scope.defaultSongs.concat($scope.selectedSongs);
            $scope.selectedSongs = [];

            resetIsCheck(multiSelectRemove, $scope.isCheckRemove);
            resetIsAll($scope.isAllRemove);
            multiSelectRemove = [];
            $scope.isNoItemSelected = $scope.selectedSongs.length <= 0 ? true : false;
            $scope.isNoItemDefault = $scope.defaultSongs.length <= 0 ? true : false;
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
            
            multiSelect = [];
            multiSelectRemove = [];
        }
        var onApplyEditPlaylist = function(){
            var updatePlaylist = {
                id: $rootScope.playlistEdit.id,
                kinds: $scope.playlistKinds,
                name: $scope.playlistName,
                songs: $scope.selectedSongs,
            }
            playlistService.updatePlaylist(updatePlaylist).then(() => {
                $rootScope.playlistEdit = {
                    id: -1,
                    name: '',
                    kinds: 'R&B',
                    songs: [],
                }
                $rootScope.isEditPlaylist = false;
                $location.path('playlist');
            });
            
        }
        $scope.onSubmitPlaylist = function(){
            if($rootScope.playlistEdit.id === -1){
                onCreatePlaylist();
            }else{
                onApplyEditPlaylist();
            }
        }
        $scope.onCancelCreatePlaylist = function(){
            multiSelect = [];
            multiSelectRemove = [];
            $rootScope.playlistEdit = {
                id: -1,
                name: '',
                songs: [],
            }
            $rootScope.isEditPlaylist = false;
            $location.path('/playlist');
        }

    }

}());