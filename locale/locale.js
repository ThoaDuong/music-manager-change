

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
                        "quote": "Without music, life would be a mistake.",
                        "songTxt": "Song",
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
                        'ok': "Ok",
                        "delSong": "Are you sure you want to delete selected songs?",
                        "delPlaylist": "Are you sure you want to delete selected playlists?"
                    }
                },
                vi: {
                    translation: {
                        "home": "Trang chủ",
                        "quote": "Nếu thiếu đi âm nhạc, cuộc sống sẽ chẳng còn ý nghĩa.",
                        "songTxt": "Bài hát",
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
                        "notEmpty": "Tên không được phép để trống",
                        "apply": "Áp dụng",
                        'ok': "Đồng ý",
                        "delSong": "Bạn có chắc chắn muốn xóa các bài hát đã chọn không?",
                        "delPlaylist": "Bạn có chắc chắn muốn xóa các danh sách phát đã chọn không?"
                    }
                }
            }
        }, function (err, t) {
            console.log('resources loaded');
        });
    }

}());


//////////////////


(function(){
    'use strict';

    musicManager
        .controller('localeController', ControllerCtrl)

    /** @ngInject */
    function ControllerCtrl($scope, $i18next, $http, CONSTANT){
        init();
        function init(){
            $http.get(CONSTANT.LANGUAGE_URL).then(res => {
                var lang = res.data.value;
                $scope.langValue = lang;
                $i18next.changeLanguage(lang);
            })
        }
        $scope.onChangeLang = (lang) => {
            $i18next.changeLanguage(lang);
            $http.put(url, { value: lang });
        }
    }

}());