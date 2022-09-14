var callback = function(details) {
    return {redirectUrl: "chrome-extension://kgeeojleeblggkaeloloinflodojcnad/sagemode.html"};
};

var filter = { urls: ["*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]};
var opt_extraInfoSpec = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec);