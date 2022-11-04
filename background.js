// A callback function which returns the webpage which replaces blocked sites
//Used by the blocking API call to webRequest.onBeforeRequest
function blockRequest(details) {
    return {redirectUrl: "chrome-extension://kgeeojleeblggkaeloloinflodojcnad/sagemode.html"};
}

// The default list of all social media sites to be blocked
var defaultFilter = { urls: ["*://prohibited.illegal.domain/*", "*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]};
const ruleFacebook = {
    "id": "facebook",
    "enabled": true,
    "action" : { "type" : "block" },
    "condition" : {
        "urlFilter": "*://*.facebook.com/*"
    }
}

// Runs when extension is first installed
// Basically to do some housekeeping and setup work
chrome.runtime.onInstalled.addListener(function(details){ // The event can also be triggered by an update
    chrome.declarativeNetRequest.updateDynamicRules
});


  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.query({ url: "*://*.twitter.com/*" }, function(tabs){
        console.log(tabs[0])
        console.log(tabs[0].favIconUrl)
        console.log(tabs[0].id)
        if ("https://abs.twimg.com/favicons/twitter.2.ico" == tabs[0].favIconUrl){
            chrome.browsingData.remove("twitter.com", serviceWorkers)
        }
    })
  }
  );