/**
 * @author AveiShriety
 * @version 1.0.2
 * @date 2020-07-20
 */

!(function (e, n) {
  module.exports = n(e);
})(window, function (o, e) {
  'use strict';
  let wx = require("weixin-js-sdk");

  let curRequestPath = window.document.location.href;
  let pathName = window.document.location.pathname;
  let localhostPath = curRequestPath.substring(0, curRequestPath.indexOf(pathName));
  let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  let contextPath = localhostPath + projectName;

  function takePhoto(fn, url) {
    configCallFn(cameraFn(fn), url);
  }

  function configCallFn(fn, urlparam) {
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
          jsApiList: ["chooseImage", "uploadImage"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {
          fn && fn();
        });
      });
  }

  let cameraFn = (fn) => {
    return wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        wx.uploadImage({
          localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            let url =
              contextPath +
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
  return {
    takePhoto: takePhoto,
  }
});