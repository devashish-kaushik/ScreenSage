// A callback function which returns the webpage which replaces blocked sites
//Used by the blocking API call to webRequest.onBeforeRequest
function blockRequest(details) {
    return {redirectUrl: "chrome-extension://kgeeojleeblggkaeloloinflodojcnad/sagemode.html"};
}

var defaultFilter = { urls: ["*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]};


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

  // Runs when extension is first installed
  // Basically to do some housekeeping and setup work
  chrome.runtime.onInstalled.addListener(function(details){ // The event can also be triggered by an update
    if(details.reason == "install"){ // The reason attribiute allows us to know for sure
        chrome.storage.local.set(defaultFilter , function() { // Saves the default filter with all 8 sites blocked to storage
            chrome.runtime.sendMessage("URLUPDATE"); // Sends a message which will trigger the listener looking for filter modification
            // This will start the default blocking listener until the user makes any further changes via the popup
        });
    }
});