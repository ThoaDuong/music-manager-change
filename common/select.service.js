(function(){
    'use strict';

    musicManager
        .factory('selectService', Factory)

    /** @ngInject */
    function Factory(){
        var factory = {};

        factory.onHandleSingleChange = function(song, listChecked, arrMultiSelect, arrListSongs){
            if(listChecked[song.id]){
                arrMultiSelect.push(song);
                if(arrMultiSelect.length === arrListSongs.length){
                    listChecked['all'] = true;
                }
            }
            else{
                arrMultiSelect.forEach(function(ele, index){
                    if(ele.id == song.id){
                        arrMultiSelect.splice(index, 1);
                    }
                })
                listChecked['all'] = false;
            }
            return arrMultiSelect;
        }
        factory.onHandleCheckAll = function(listChecked, arrMultiSelect, arrListSongs){
            if(listChecked['all']){
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    arrMultiSelect.push(ele);
                    listChecked[ele.id] = true;
                })
            }
            else{
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    listChecked[ele.id] = false;
                })
            }
            return arrMultiSelect;
        }

        return factory;

    }

}());