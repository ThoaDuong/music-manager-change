
(function () {
    'use strict';

    musicManager.controller('songsController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $location, songService, playlistService, $rootScope, CONSTANT) {
        $scope.isCheck = {};
        $scope.isAll = {};
        $scope.multiSelect = [];
        $scope.isSingleSelectSong = false;
        $scope.isCheckAnySong = false; 
        $scope.arrTitleSong = CONSTANT.TITLE_SONG;  

        $scope.$watch('multiSelect', function(){
            $scope.isSingleSelectSong = $scope.multiSelect.length === 1 ? true : false;
            $scope.isCheckAnySong = $scope.multiSelect.length > 0 ? true : false;
        }, true)
        
        init();
        function init() {
            songService.getListSongs().then(function(data){
                $scope.listSongsDefault = data.reverse();
    
                //Pagination
                $scope.pagination_song = {
                    totalItems:  $scope.listSongsDefault.length,
                    itemsPerPage: 10,
                    currentPage: 1,
                }
            
                $scope.$watch('currentPage', function() {
                    $scope.paginationSongs = $scope.listSongsDefault.slice(($scope.currentPage - 1) * $scope.itemsPerPage, $scope.currentPage * $scope.itemsPerPage);
                }, true);
            })
        }

        $scope.onEditSong = function () {
            var song = $scope.multiSelect[0];
            $rootScope.song.name = song.name;
            $rootScope.song.artist = song.artist;
            $rootScope.song._id = song._id;
            $rootScope.isEdit = true;
            $location.path('/song');
        }
        $scope.onClickAddSong = function(){
            $location.path("/song");
        }

        var onConfirmDeleteSong = function (id) {
            songService.deleteSong(id).then((del)=>{
                if(del){
                    $.notify({
                        message: 'Delete song <b>successfully</b>' 
                    },{
                        type: 'success'
                    });
                }
                songService.getListSongs().then(data=>{
                    $scope.listSongsDefault = data.reverse();
                });
            }, ()=>{
                $.notify({
                    message: 'Delete song <b>failure</b>' 
                },{
                    type: 'danger'
                });
            });
            playlistService.getListPlaylists().then(data => {
                data.forEach(playlist => {
                    playlist.songs.forEach((element, index) => {
                        if (element._id === id) {
                            playlist.songs.splice(index, 1);
                            playlistService.updatePlaylist(playlist);
                        }
                    });
                });
            })
        }
        $scope.onMultiDelete = function () {
            $scope.multiSelect.forEach(function (ele) {
                onConfirmDeleteSong(ele._id);
                $scope.multiSelect = [];
            })
        }
        $scope.onChangeSearch = function (keyWord) {
            $scope.searchKeyWord = keyWord;
        }
    }
}());
