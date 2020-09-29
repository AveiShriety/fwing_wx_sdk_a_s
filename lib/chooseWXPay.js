'use strict';

!(function (n) {
    module.exports = n();
})(function () {
    return (body, total_fee, fn, requesturl) => {
        const index = require('../index');
        return index.wx.ready(function () {
            fetch(index.contextPath(requesturl) + "/n/wxsdk_jssdk_chooseWXPay"
                + "?body=" + body + "&total_fee=" + total_fee, {
                headers: {
                    'Wechat-Oauth2-Key': JSON.parse(localStorage.getItem("user")).openid
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let execcode = response.execcode;
                    let execdata = response.execdata;
                    if (execcode === 1) {
                        index.wx.chooseWXPay({
                            timestamp: execdata.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: execdata.nonceStr, // 支付签名随机串，不长于 32 位
                            package: execdata.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: execdata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: execdata.paySign, // 支付签名
                            success: function (res) {
                                // 支付成功后的回调函数
                                fn && fn(res);
                            },
                            fail: function () {
                                index.layer.open({
                                    shadeClose: false,
                                    content: '支付失败，请稍后尝试...',
                                    skin: 'msg',
                                    time: 2 //2秒后自动关闭
                                });
                            },
                            cancel: function () {
                                index.layer.open({
                                    shadeClose: false,
                                    content: '您已取消支付...',
                                    skin: 'msg',
                                    time: 2 //2秒后自动关闭
                                });
                            }
                        });
                    } else {
                        console.log(response);
                    }
                })
        });
    }
});