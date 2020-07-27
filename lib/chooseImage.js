'use strict';

!(function (n) {
    module.exports = n();
})(function () {
    const index = require('../index');
    return (fn, requesturl) => {
        return index.wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            index.wx.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    index.layer.open({
                        type: 2,
                        shadeClose: false,
                    });
                    index.wx.uploadImage({
                        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 0, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            fetch(index.contextPath(requesturl) + "/n/wxsdk_jssdj_camera" + "?media_id=" + serverId)
                                .then(function (response) {
                                    return response.text();
                                })
                                .then(function (response) {
                                    fn && fn(response);
                                    index.layer.closeAll();
                                })
                        }
                    });
                }
            });
        });
    }
});