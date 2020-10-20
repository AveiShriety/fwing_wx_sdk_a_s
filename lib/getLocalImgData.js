'use strict';

!(function (n) {
    module.exports = n();
})(function () {
    return (localId, fn) => {
        const index = require('../index');
        return index.wx.ready(function () {
            index.wx.getLocalImgData({
                localId, // 图片的localID
                success: function (res) {
                    var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    fn && fn(localData);
                }
            });
        });
    }
});