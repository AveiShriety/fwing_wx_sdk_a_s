'use strict';

!(function (n) {
    module.exports = n();
})(function () {
    return (goods_desc, goods_detail, trade_amount, fn, requesturl) => {
        const index = require('../index');
        return index.wx.ready(function () {
            fetch(index.contextPath(requesturl) + "/n/wxsdk_jssdk_chooseWXPayNSH"
                + "?goods_desc=" + goods_desc + "&goods_detail=" + goods_detail + "&trade_amount=" + trade_amount)
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    let wc_pay_data = JSON.parse(response.wc_pay_data);
                    index.wx.chooseWXPay({
                        timestamp: wc_pay_data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        nonceStr: wc_pay_data.nonceStr, // 支付签名随机串，不长于 32 位
                        package: wc_pay_data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: wc_pay_data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: wc_pay_data.paySign, // 支付签名
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
                })
        });
    }
});