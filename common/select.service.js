(function(){
    'use strict';

    musicManager
        .factory('selectService', Factory)

    /** @ngInject */
    function Factory(){
        var factory = {};
        factory.onHandleSingleChange = function(song, listChecked, isCheckAll, arrMultiSelect, arrListSongs){
            if(listChecked[song._id]){
                arrMultiSelect.push(song);
                if(arrMultiSelect.length === arrListSongs.length){
                    isCheckAll = true;
                }
            }
            else{
                arrMultiSelect.forEach(function(ele, index){
                    if(ele._id == song._id){
                        arrMultiSelect.splice(index, 1);
                    }
                })
                isCheckAll = false;
            }
            return {
                array: arrMultiSelect,
                checkAll: isCheckAll,
            }
        }
        factory.onHandleCheckAll = function(listChecked, isCheckAll, arrMultiSelect, arrListSongs){
            if(isCheckAll){
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    arrMultiSelect.push(ele);
                    listChecked[ele._id] = true;
                })
            }
            else{
                arrMultiSelect = [];
                arrListSongs.forEach(function(ele){
                    listChecked[ele._id] = false;
                })
            }
            return arrMultiSelect;
        }
        return factory;
    }
}());