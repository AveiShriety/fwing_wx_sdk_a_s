'use strict';

!(function (e, n) {
    module.exports = n(e);
})(window, function (o, e) {
    let wx = require("weixin-js-sdk");

    let curRequestPath = window.document.location.href;
    let pathName = window.document.location.pathname;
    let localhostPath = curRequestPath.substring(0, curRequestPath.indexOf(pathName));
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    let contextPath = localhostPath + projectName;

    return {
        wx,
        contextPath,
        configCallFn: (fn, jsApiList, urlparam) => {
            if (!!urlparam) contextPath = urlparam;
            let url =
                contextPath +
                "/n/wxsdk_jssdj_config" +
                "?url=" +
                encodeURIComponent(location.href.split("#")[0]);

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.appId, // 必填，公众号的唯一标识
                        timestamp: response.timeStamp, // 必填，生成签名的时间戳
                        nonceStr: response.nonceStr, // 必填，生成签名的随机串
                        signature: response.signature, // 必填，签名
                        jsApiList  // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function () {
                        fn && fn();
                    });
                });
        }
    }
});