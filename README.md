[toc]
# Preparation
## Installation
    
    $ npm i fwing_wx_sdk_a_s

## Before using, you need
Import the below `Java Mvn Dependency`:

<strong style='color:#cb3837'>Current haven't been deployed to public network. SORRY！</strong> 

```xml
<dependency>
    <artifactId>wx_sdk</artifactId>
    <version>0.0.1-Release</version>
    <packaging>jar</packaging>
</dependency>
```
This dependency export necessary RequestMapping Urls:
|  @RequestMapping  |  Description  |
|  ----  | ----  |
| /n/wxsdk_jssdj_config  | Return necessary properties used in wx.config() |
| /n/wxsdk_jssdj_camera  | Automatically called after user take a photo or choose a picture in the phone, then request the Wechat-Server to download the picture to Developer-Server and write the inputstream into path `images`. e.g. url: http(s)://www.xxx.com/xxx/images/xxx.png|

## Import
In page coding:
```javascript
import FWing from "fwing_wx_sdk_a_s";
let fwing = new FWing({
    jsApiList,
    requesturl
});
```
|  paramName  |  Description  |  type  | isRequired  |  example  |
|  ----  | ----  | ----  | ----  | ----  |
| jsApiList  | which JS-API you used in this page. [Available](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#63) | array | true | ["chooseImage", "uploadImage"] |
| requesturl  | On the premise of that your Developer-Server's accessible url is `http://www.aaa.com/aaa/index.html`. When instance `FWing`, if you don't define this param, `fetch(http://www.aaa.com/aaa/n/wxsdk_jssdj_config)`. But if you define to "http(s)://xxx.xxx.com/xxx", `fetch(http(s)://xxx.xxx.com/xxx/n/wxsdk_jssdj_config)`. | string | false | "http(s)://xxx.xxx.com/xxx" |

Essentially, this npm-package is the encapsulation of AJAX request realized by javascript `fetch` method.

You will use happily when you use `Vue or React` project. 

# Coding
## chooseImage
This api will return a text which means the picture name like 'xxx.png'

If you want to request the image you take just now, request the below url:

    http(s)://xxx.xxx.com/xxx/images/xxx.png

And the usage is below:
```javascript
fwing.chooseImage((res) => {
    this.imgsrc = requesturl + "/images/" + res;
}, requesturl);
// requesturl need you define like 'http(s)://xxx.xxx.com/xxx'
```

## scanQRCode
And the usage is below:

```javascript
fwing.scanQRCode(0);
// is 0: The scanning results are processed by wechat
```

```javascript
fwing.scanQRCode(1, (res) => {
    console.log(res);
    this.scanQRCodeValue = res;
});
// is 1: The scan result is returned directly, and the user can obtain the scan result through the parameter res in the scanQRCodeFn callback and perform other operations
```

Thanks!