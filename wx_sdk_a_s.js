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
  return {
    chooseImage,
    scanQRCode,
  }
});