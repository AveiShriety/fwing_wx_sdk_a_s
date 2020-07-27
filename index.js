module.exports = {
    layer: require('layer-mobile'),
    wx: require("weixin-js-sdk"),
    contextPath: (requesturl) => {
        let url;
        if (!requesturl) {
            let curRequestPath = window.document.location.href;
            let pathName = window.document.location.pathname;
            let localhostPath = curRequestPath.substring(0, curRequestPath.indexOf(pathName));
            let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            url = localhostPath + projectName;
        } else {
            url = requesturl;
        }
        return url;
    }
};