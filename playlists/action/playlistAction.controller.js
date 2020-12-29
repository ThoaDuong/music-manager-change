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
        $scope.arrTitleSong = CONSTANT.TITLE_SONG;
        $scope.action = {
            isDisableAdd: false,
            isDisableAddAll: false,
            isDisableRemove: false,
            isDisableRemoveAll: false,
        }
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
        
        $scope.$watch('multiSelect', function(){
            $scope.action.isDisableAdd = $scope.multiSelect.length <= 0 ? true : false;
            $scope.action.isDisableRemove = $scope.multiSelectRemove.length <= 0 ? true : false;
        }, true)
        $scope.$watch('multiSelectRemove', function(){
            $scope.action.isDisableRemove = $scope.multiSelectRemove.length <= 0 ? true : false;
            $scope.action.isDisableAdd = $scope.multiSelect.length <= 0 ? true : false;
        }, true)
        $scope.$watch('defaultSongs', function(){
            $scope.action.isDisableAddAll = $scope.defaultSongs && $scope.defaultSongs.length <= 0 ? true : false;
        }, true)
        $scope.$watch('selectedSongs', function(){
            $scope.action.isDisableRemoveAll = $scope.selectedSongs.length <= 0 ? true : false;
        }, true)
        

        $scope.onAddSelectedSong = function(){
            if($scope.multiSelect.length === $scope.defaultSongs.length){
                $scope.onAddAllSongs();
                return;
            }
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
            songService.getListSongs().then(data => {
                $scope.selectedSongs = data;
            })
            $scope.defaultSongs = [];
            $scope.multiSelect = [];
        }
        $scope.onRemoveSelectedSong = function(){
            if($scope.multiSelectRemove.length === $scope.selectedSongs.length){
                $scope.onRemoveAllSongs();
                return;
            }
            $scope.multiSelectRemove.forEach(element => {
                $scope.selectedSongs.forEach((item, index) => {
                    if(element._id === item._id){
                        $scope.selectedSongs.splice(index, 1);
                        $scope.defaultSongs.push(item);
                    }
                });
            });
            $scope.multiSelectRemove = [];
        }
        $scope.onRemoveAllSongs = function(){
            songService.getListSongs().then(data => {
                $scope.defaultSongs = data;
            })
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
                if(data){
                    $.notify({
                        message: 'Create playlist <b>' + data.name + '</b> successfully' 
                    },{
                        type: 'success'
                    });
                }
                $scope.listPlaylistsDefault.push(data);
                $location.path('/playlist');
            }, ()=>{
                $.notify({
                    message: 'Create playlist <b>' + newPlaylist.name + '</b> failure' 
                },{
                    type: 'danger'
                });
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
            playlistService.updatePlaylist(updatePlaylist).then((data) => {
                if(data){
                    $.notify({
                        message: 'Update playlist <b>' + data.name + '</b> successfully' 
                    },{
                        type: 'success'
                    });
                }
                $rootScope.playlistEdit = {
                    _id: -1,
                    name: '',
                    kinds: 'R&B',
                    songs: [],
                }
                $rootScope.isEditPlaylist = false;
                $location.path('playlist');
            }, ()=>{
                $.notify({
                    message: 'Update playlist <b>' + updatePlaylist.name + '</b> failure' 
                },{
                    type: 'danger'
                });
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