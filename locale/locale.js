
(function(){
    'use strict';

    musicManager
        .run(RunRun)

    /** @ngInject */
    function RunRun(){
        window.i18next.use(window.i18nextXHRBackend);
        window.i18next.init({
            lng: 'en',
            resources: {
                en: {
                    translation: {
                        "home": "Home",
                        "song": "Song",
                        "playlist": "Playlist",
                        "manage": "Manage",
                        "edit": "Edit",
                        "delete": "Delete",
                        "add": "Add",
                        "remove": "Remove",
                        "all": "all",
                        "search": "Search",
                        "cancel": "Cancel",
                        "close": "Close",
                        "name": "Name",
                        "artist": "Artist",
                        "pagination": "Items per page",
                        "previous": "Previous",
                        "next": "Next",
                        "kinds": "Kinds",
                        "infoPlaylist": "Playlist information",
                        "infoSongs": "Songs of playlist information",
                        "noItem": "No items to show",
                        "detail": "Detail of playlist",
                        "notEmpty": "Song name cannot be empty",
                        "apply": "Apply",
                    }
                },
                vi: {
                    translation: {
                        "home": "Trang chủ",
                        "song": "Bài hát",
                        "playlist": "Danh sách phát",
                        "manage": "Quản lý",
                        "edit": "Sửa",
                        "delete": "Xóa",
                        "add": "Thêm",
                        "remove": "Loại bỏ",
                        "all": "tất cả",
                        "search": "Tìm kiếm",
                        "cancel": "Hủy bỏ",
                        "close": "Đóng",
                        "name": "Tên",
                        "artist": "Tác giả",
                        "pagination": "Số mục trên mỗi trang",
                        "previous": "Trước đó",
                        "next": "Kế tiếp",
                        "kinds": "Thể loại",
                        "infoPlaylist": "Thông tin danh sách phát",
                        "infoSongs": "Thông tin các bài hát của danh sách phát",
                        "noItem": "Không có mục nào để hiển thị",
                        "detail": "Chi tiết của danh sách phát",
                        "notEmpty": "Tên bài hát không được phép để trống",
                        "apply": "Áp dụng",
                    }
                }
            }
        }, function (err, t) {
            console.log('resources loaded');
        });
    }

}());


////////////


(function(){
    'use strict';

    musicManager
        .controller('localeController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $i18next){
        init();

        function init(){
            console.log('Run here');
        }

        $scope.onChangeLang = (lang) => {
            $i18next.changeLanguage(lang);
            console.log('change', lang);
        }
        i18next.on('languageChanged', () => {
            $scope.home = $i18next.t('home');
            $scope.song = $i18next.t('song');
            $scope.playlist = $i18next.t('playlist');
            $scope.manage = $i18next.t('manage');
            $scope.edit = $i18next.t('edit');
            $scope.delete = $i18next.t('delete');
            $scope.add = $i18next.t('add');
            $scope.remove = $i18next.t('remove');
            $scope.all = $i18next.t('all');
            $scope.search = $i18next.t('search');
            $scope.cancel = $i18next.t('cancel');
            $scope.close = $i18next.t('close');
            $scope.name = $i18next.t('name');
            $scope.artist = $i18next.t('artist');
            $scope.pagination = $i18next.t('pagination');
            $scope.previous = $i18next.t('previous');
            $scope.next = $i18next.t('next');
            $scope.kinds = $i18next.t('kinds');
            $scope.infoPlaylist = $i18next.t('infoPlaylist');
            $scope.infoSongs = $i18next.t('infoSongs');
            $scope.noItem = $i18next.t('noItem');
            $scope.detail = $i18next.t('detail');
            $scope.notEmpty = $i18next.t('notEmpty');
            $scope.apply = $i18next.t('apply');
        });

    }

}());