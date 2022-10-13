// A callback function which returns the webpage which replaces blocked sites
//Used by the blocking API call to webRequest.onBeforeRequest
function blockRequest(details) {
    return {redirectUrl: "chrome-extension://kgeeojleeblggkaeloloinflodojcnad/sagemode.html"};
}

var defaultFilter = { urls: ["*://prohibited.illegal.domain/*", "*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]};

// Runs when extension is first installed
// Basically to do some housekeeping and setup work
chrome.runtime.onInstalled.addListener(function(details){ // The event can also be triggered by an update
    chrome.storage.local.set(defaultFilter , function() { // Saves the default filter with all 8 sites blocked to storage
        alert("Filter saved  ", defaultFilter)
        chrome.webRequest.onBeforeRequest.addListener( // Adds a blocker based on the full default filter list
            blockRequest, defaultFilter, ["blocking"]);
            // It uses the same callback function as the regular message activated webRequest.onBeforeRequest blocker
            // This ensures that the filter set here will be appropriately removed in the next update call
            // just like a regular filter
            // Thus, the full benefit of blocking is present from the moment of installation without user intervention
    });
});

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    alert(response);
    // console.log(response)
    alert("Message received from popup")
    if ("URLUPDATE" == response) {
        chrome.storage.local.get( ['urls'], function (cache) {
            alert("Trying to retreive urls");
            //alert(cache.urls)
            //console.log(defaultFilter)
            //console.log(cache)
            //console.log(cache.urls)
            //console.log(cache.urls==defaultFilter.urls)
            //alert((cache==defaultFilter))

            if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
                chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
            }

            chrome.webRequest.onBeforeRequest.addListener(
                blockRequest, cache, ["blocking"]);
        }
        );
    }
  });

