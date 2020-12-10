musicManager.run(function () {
    window.i18next.use(window.i18nextXHRBackend);
    window.i18next.init({
        lng: 'en',
        resources: {
            en: {
                translation: {
                    "name": "Name",
                    "age": "Age",
                }
            },
            vi: {
                translation: {
                    "name": "Tên",
                    "age": "Tuổi",
                }
            }
        }
    }, function (err, t) {
        console.log('resources loaded');
    });

    
})