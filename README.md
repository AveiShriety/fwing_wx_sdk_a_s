# fwing_wx_sdk_a_s
    npm i fwing_wx_sdk_a_s

    import fwing from "fwing_wx_sdk_a_s";

Essentially, this js-api is the encapsulation of AJAX request realized by javascript `fetch` method.

You will use happily when you use `Vue or React` project. 

# Before using, you need
Before using this js-api, you must import the mvn-dependency:
    
    <dependency>
        <artifactId>wx_sdk</artifactId>
        <version>0.0.1-Release</version>
        <packaging>jar</packaging>
    </dependency>

This dependency writed by maven-java will obtain the photo from the weixin-server which a user take, and then write it into DEVELOPER'S DEPLOYED SERVER in path `images`.

## chooseImage
This api will return a text which means the picture name like 'amingehrniwhonpmp-enb4531saf.png'

If you want to request the image you take just now, request the below url:

    http(s)://{serverIp}:{serverPort}/{projectName}/images/amingehrniwhonpmp-enb4531saf.png

And the usage is below:

    let chooseImageFn = (res) => {
        this.imgsrc = "./images/" + res;
    };
    fwing.chooseImage(chooseImageFn);

But if you don't deploy the static resources along with the backend server so that error LIKE `CORS` occurs, then you can Specify the requesturl.

    let chooseImageFn = (res) => {
        this.imgsrc = this.requesturl + "/images/" + res;
    };
    fwing.chooseImage(chooseImageFn, this.requesturl);

## scanQRCode
And the usage is below:

    let scanQRCodeFn = (res) => {
        this.scanQRCodeValue = res;
    };
    fwing.scanQRCode(scanQRCodeFn, 1);

    // the second parameter 0 is assigned to 0 or 1
    // is 0: The scanning results are processed by wechat
    // is 1: The scan result is returned directly, and the user can obtain the scan result through the parameter res in the scanQRCodeFn callback and perform other operations

But if you don't deploy the static resources along with the backend server so that error LIKE `CORS` occurs, then you can Specify the requesturl.

    let scanQRCodeFn = (res) => {
        this.scanQRCodeValue = res;
    };
    fwing.scanQRCode(scanQRCodeFn, 1, this.requesturl);
    
    // the second parameter 0 is assigned to 0 or 1
    // is 0: The scanning results are processed by wechat
    // is 1: The scan result is returned directly, and the user can obtain the scan result through the parameter res in the scanQRCodeFn callback and perform other operations
