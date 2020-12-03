
(function(){
    'use strict';

    musicManager.controller('managerController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, songService, playlistService, $rootScope){
        songService.getListSongs().then(function(data){
            $rootScope.listSongsDefault = data;
        })
        playlistService.getListPlaylists().then(function(data){
            $rootScope.listPlaylistsDefault = data;
        })
        $rootScope.linkName = 'Song';
        $rootScope.currentPage = 1;
        $rootScope.currentPagePlaylist = 1;


        init();
        function init(){
        }
        

        //Define song edit
        $rootScope.song = {
            id: -1,
            name: '',
            artist: ''
        }
        $rootScope.isEdit = false;
        $rootScope.resetSong = function(){
            $rootScope.song = {
                id: -1,
                name: '',
                artist: ''
            }
            $rootScope.isEdit = false;
        }
        //Define playlist edit
        $rootScope.playlistEdit = {
            id: -1,
            name: '',
            songs: [],
        }
        $rootScope.isEditPlaylist = false;
        $rootScope.resetPlaylistEdit = function(){
            $rootScope.playlistEdit = {
                id: -1,
                name: '',
                songs: [],
            }
            $rootScope.isEditPlaylist = false;
        }

        //Onchange checkbox
        $rootScope.onHandleSingleChange = function(song, isCheck, isAll, arrMultiSelect, arrListSongs){
            if(isCheck[song.id]){
                arrMultiSelect.push(song);
                if(arrMultiSelect.length === arrListSongs.length){
                    isAll['all'] = true;
                }
            }
            else{
                arrMultiSelect.forEach(function(ele, index){
                    if(ele.id == song.id){
                        arrMultiSelect.splice(index, 1);
                    }
                })
                isAll['all'] = false;
            }
        }
        $rootScope.onHandleCheckAll = function(isCheck, isAll, arrMultiSelect, arrListSongs){
            if(isAll['all']){
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    arrMultiSelect.push(ele);
                    isCheck[ele.id] = true;
                })
            }
            else{
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    isCheck[ele.id] = false;
                })
            }
            return arrMultiSelect;
        }

    }

}());
