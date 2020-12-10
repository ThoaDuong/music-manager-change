
(function(){
    'use strict';

    musicManager.controller('managerController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $i18next){

        init();
        function init(){
        }
        
        $scope.onChangeLanguage = (lang) => {
            $i18next.changeLanguage(lang);
            console.log('Change', lang);
        }
        i18next.on('languageChanged', () => {
            $scope.nameAbc = $i18next.t('name');
            $scope.ageAbc = $i18next.t('age');
            console.log('Change name', $i18next.t('name'));
        });
    }

}());

// Fake json db
// json-server --watch D:\music-manager\data\db.json
