let bannerMoudle = (function () {
    let queryData = function (callback) {
        $.ajax({
            url: './data.json',
            type: 'get',
            async: true,
            success: result => {
                callback && callback(result);
            }
        })
    }

    return {
        init() {
            queryData(function anonymous(data) {
                console.log(data);
            })
        }
    }
})()
bannerMoudle.init();