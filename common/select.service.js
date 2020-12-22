(function(){
    'use strict';

    musicManager
        .factory('selectService', Factory)

    /** @ngInject */
    function Factory(){
        var factory = {};

        factory.onHandleSingleChange = function(song, isCheck, isAll, arrMultiSelect, arrListSongs){
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
            return arrMultiSelect;
        }
        factory.onHandleCheckAll = function(isCheck, isAll, arrMultiSelect, arrListSongs){
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

        return factory;

    }

}());