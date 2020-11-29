(function(){
    'use strict';

    musicManager
        .controller('playlistActionController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope){
        $scope.isCheck = {};
        $scope.isAll = {};
        var multiSelect = [];
        console.log('list song', $scope.listSongs);
        
        init();

        function init(){
        }

        $scope.onSingleChange = function(song){
            if($scope.isCheck[song.id]){
                multiSelect.push(song);
                if(multiSelect.length == $scope.listSongs.length){
                    $scope.isAll = { all: true };
                }
            }
            else{
                multiSelect.forEach(function(ele, index){
                    if(ele.id == song.id){
                        multiSelect.splice(index, 1);
                    }
                })
                $scope.isAll = { all: false };
            }
        }
        $scope.onCheckAll = function(){
            if($scope.isAll['all']){
                multiSelect = [];
                $scope.listSongs.forEach(function(ele){
                    multiSelect.push(ele);
                    $scope.isCheck[ele.id] = true;
                })
            }
            else{
                multiSelect = [];
                $scope.listSongs.forEach(function(ele){
                    $scope.isCheck[ele.id] = false;
                })
            }
        }

    }

}());