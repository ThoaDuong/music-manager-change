(function(){
    'use strict';

    musicManager.controller('playlistActionController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $rootScope, $location, playlistService){
        
        $scope.defaultSongs = [].concat($rootScope.listSongsDefault);
        $scope.selectedSongs = [];

        //Add: Left to right
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        //Remove: Right to left
        $scope.isCheckRemove = {};
        $scope.isAllRemove = {};
        var multiSelectRemove = [];
        
        init();

        function init(){
            if($rootScope.playlistEdit.id !== -1){
                $scope.selectedSongs = $rootScope.playlistEdit.songs;
                $scope.playlistName = $rootScope.playlistEdit.name;

                $rootScope.playlistEdit.songs.forEach(root => {
                    $scope.defaultSongs.forEach((element, index) => {
                        if(root.id === element.id){
                            $scope.defaultSongs.splice(index, 1);
                        }
                    });
                });
            }
        }

        var resetIsCheck = function(arr, isCheck){
            arr.forEach(element => {
                isCheck[element.id] = false;
            })
        }
        var resetIsAll = function(isAll){
            isAll['all'] = false;
        }
        var checkAllIsTrue = function(arrSongs, arrSelected, isAll){
            if(arrSelected.length !== arrSongs.length){
                isAll['all'] = false;
            }
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
        

        $scope.onAddASong = function(){
            if(multiSelect.length <= 0){
                return;
            }
            resetIsCheck([multiSelect[0]], $scope.isCheck);
            $scope.defaultSongs.forEach((item, index) => {
                if(item.id === multiSelect[0].id){
                    $scope.defaultSongs.splice(index, 1);
                }
            });
            $scope.selectedSongs = $scope.selectedSongs.concat(multiSelect[0]);
            multiSelect.splice(0, 1);
            if(multiSelect.length <= 0){
                resetIsAll($scope.isAll);   
            }
        }
        $scope.onAddAllSongs = function(){
            resetIsCheck(multiSelect, $scope.isCheck);
            resetIsAll($scope.isAll);

            multiSelect.forEach(element => {
                $scope.defaultSongs.forEach((item, index) => {
                    if(element.id === item.id){
                        $scope.defaultSongs.splice(index, 1);
                    }
                });
            });
            $scope.selectedSongs = $scope.selectedSongs.concat(multiSelect);
            multiSelect = [];
        }
        $scope.onRemoveASong = function(){
            if(multiSelectRemove.length <= 0){
                return;
            }
            resetIsCheck([multiSelectRemove[0]], $scope.isCheckRemove);   
            $scope.selectedSongs.forEach((item, index) => {
                if(item.id === multiSelectRemove[0].id){
                    $scope.selectedSongs.splice(index, 1);
                }
            });
            $scope.defaultSongs = $scope.defaultSongs.concat(multiSelectRemove[0]);
            multiSelectRemove.splice(0, 1);
            if(multiSelectRemove.length <= 0){
                resetIsAll($scope.isAllRemove);   
            }
        }
        $scope.onRemoveAllSongs = function(){
            resetIsCheck(multiSelectRemove, $scope.isCheckRemove);
            resetIsAll($scope.isAllRemove);

            multiSelectRemove.forEach(element => {
                $scope.selectedSongs.forEach((item, index) => {
                    if(element.id === item.id){
                        $scope.selectedSongs.splice(index, 1);
                        $scope.defaultSongs.push(item);
                    }
                });
            });
            multiSelectRemove = [];
        }
        $scope.onCreatePlaylist = function(){
            var newPlaylist = {
                name: $scope.playlistName,
                songs: $scope.selectedSongs,
            }
            playlistService.addPlaylist(newPlaylist).then(data => {
                $rootScope.listPlaylistsDefault.push(data);
                $rootScope.setPaginationData($rootScope.currentPagePlaylist, $rootScope.listPlaylistsDefault);
                $location.path('/playlist');
            })
            
            multiSelect = [];
            multiSelectRemove = [];
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

        $scope.onApplyEditPlaylist = function(){
            var updatePlaylist = {
                id: $rootScope.playlistEdit.id,
                name: $scope.playlistName,
                songs: $scope.selectedSongs,
            }
            console.log('Before', updatePlaylist);
            playlistService.updatePlaylist(updatePlaylist).then(data => {
                console.log('Test update', data);
                console.log('After', updatePlaylist);
                //$rootScope.listPlaylistsDefault.forEach(root => {
                    // if(root.id === data.id){
                    //     root.name = data.name;
                    //     root.songs = data.songs;

                    //     $rootScope.setPaginationData($rootScope.currentPagePlaylist, $rootScope.listPlaylistsDefault);
                        
                    // }
                //})

                $rootScope.playlistEdit = {
                    id: -1,
                    name: '',
                    songs: [],
                }
                $rootScope.isEditPlaylist = false;
                $location.path('playlist');
            });
            
        }

    }

}());