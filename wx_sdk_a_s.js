/**
 * @author AveiShriety
 * @version 1.0.3
 * @date 2020-07-20
 */
'use strict';

!(function (e, n) {
  module.exports = n(e);
})(window, function (o, e) {
  let chooseImage = require('./lib/jsapi/chooseImage');
  let scanQRCode = require('./lib/jsapi/scanQRCode');

  let viewer = window.navigator.userAgent.toLowerCase();
  let isWeixinClient;
  if (viewer.match(/MicroMessenger/i) == 'micromessenger') {
    isWeixinClient = true;
  } else {
    isWeixinClient = false;
  }
  if (!isWeixinClient) {
    console.log("ERROR: You need to open it with Wechat Browser.");
    return;
  }

  return {
    chooseImage,
    scanQRCode,
  }
});