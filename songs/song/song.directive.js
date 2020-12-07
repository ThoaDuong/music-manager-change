(function () {
    'use strict';

    musicManager
        .directive ('songItem', directive);

    /** @ngInject */
    function directive() {

        return {
            restrict: 'AE',
            templateUrl: 'songs/song/song.template.html',
            scope: {
                song: '='
            },
        }
    }

} ());