# Preparation
## Installation
    
    $ npm i fwing_wx_sdk_a_s

# Start Coding
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

## chooseImage
```javascript
jsApiList = ["chooseImage", "uploadImage"];
```

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
```javascript
jsApiList = ["scanQRCode"];
```
And the usage is below:

```javascript
fwing.scanQRCode(0);
// param 0: The scanning results are processed by wechat
```

```javascript
fwing.scanQRCode(1, (res) => {
    console.log(res);
    this.scanQRCodeValue = res;
});
// param 1: The scan result is returned directly, and the user can obtain the scan result through the parameter res in the scanQRCodeFn callback and perform other operations
```
## chooseWXPay
```javascript
jsApiList = ["chooseWXPay"];
```
```javascript
fwing.chooseWXPay("Test header: fw test pay", 1, (res) => {
        this.chooseWXPayCallback = "fontend success callback's data: " + JSON.stringify(res); 
    }, requesturl);
// param 'Test header: fw test pay': describe the title of you wechat pay
// param 1: define how much money you will pay for (unit: ￥0.01)
```
## chooseWXPayNSH
```javascript
jsApiList = ["chooseWXPay"];
```
```javascript
fwing.chooseWXPayNSH(
    {{
        "goods_desc": "****费",
        "list": [
            {
                "id": "1",
                "trade_amount": "0.01"
            },
            {
                "id": "2",
                "trade_amount": "0.02"
            }
        ]
    }},
    (res) => {
        console.log(res);
    },
    requesturl
);
```

Thanks!