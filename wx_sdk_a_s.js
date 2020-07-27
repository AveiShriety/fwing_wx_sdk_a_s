/**
 * @author AveiShriety
 * @version 1.0.6
 * @date 2020-07-27
 */
'use strict';
!function () {
  module.exports = function (FWingparam) {
    let jsApiList = FWingparam.jsApiList,
      requesturl = FWingparam.requesturl;
    if (!jsApiList) {
      throw "the instance of fwing_wx_sdk_a_s needs param: jsApiList";
    }
    const index = require('./index');
    if (!((window.navigator.userAgent.toLowerCase()).match(/MicroMessenger/i) == 'micromessenger')) {
      index.layer.open({
        shadeClose: false,
        content: 'ERROR: You can\'t open without Wechat Browser.',
      });
      return;
    }

    fetch(index.contextPath(requesturl) + "/n/wxsdk_jssdj_config" + "?url=" + encodeURIComponent(location.href.split("#")[0]))
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        index.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.appId, // 必填，公众号的唯一标识
          timestamp: response.timeStamp, // 必填，生成签名的时间戳
          nonceStr: response.nonceStr, // 必填，生成签名的随机串
          signature: response.signature, // 必填，签名
          jsApiList  // 必填，需要使用的JS接口列表
        });
      });

    let chooseImage = require('./lib/chooseImage');
    let scanQRCode = require('./lib/scanQRCode');

    this.chooseImage = chooseImage;
    this.scanQRCode = scanQRCode;
  }
}();