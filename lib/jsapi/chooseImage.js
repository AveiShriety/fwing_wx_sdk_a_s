'use strict';

!(function (e, n) {
    module.exports = n(e);
})(window, function (o, e) {
    let config = require("../config");

    let chooseImageFn = (fn) => {
        return config.wx.chooseImage({
            count: 1, // 默认9
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                config.wx.uploadImage({
                    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        let url =
                            config.contextPath +
                            "/n/wxsdk_jssdj_camera" +
                            "?media_id=" + serverId;
                        fetch(url)
                            .then(function (response) {
                                return response.text();
                            })
                            .then(function (response) {
                                fn && fn(response);
                            })
                    }
                });
            }
        });
    }
    return (fn, url) => {
        config.configCallFn(chooseImageFn(fn), ["chooseImage", "uploadImage"], url);
    }
});