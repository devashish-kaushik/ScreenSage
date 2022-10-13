// A callback function which returns the webpage which replaces blocked sites
//Used by the blocking API call to webRequest.onBeforeRequest
function blockRequest(details) {
    return {redirectUrl: "chrome-extension://kgeeojleeblggkaeloloinflodojcnad/sagemode.html"};
}

// The default list of all social media sites to be blocked
var defaultFilter = { urls: ["*://prohibited.illegal.domain/*", "*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]};

// Runs when extension is first installed
// Basically to do some housekeeping and setup work
chrome.runtime.onInstalled.addListener(function(details){ // The event can also be triggered by an update
    console.log("Extension", details.reason)
    chrome.storage.local.set(defaultFilter , function() { // Saves the default filter with all 8 sites blocked to storage
        console.log("Default filter saved in local storage", defaultFilter)
        chrome.webRequest.onBeforeRequest.addListener( // Adds a blocker based on the full default filter list
            blockRequest, defaultFilter, ["blocking"]);
            // It uses the same callback function as the regular message activated webRequest.onBeforeRequest blocker
            // This ensures that the filter set here will be appropriately removed in the next update call
            // just like a regular filter
            // Thus, the full benefit of blocking is present from the moment of installation without user intervention
            console.log("Listener for URL blocker added")
    });
});

// This listener picks up the messages sent by the popup script whenever the URLs to be blocked are updated by the user
chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    console.log("Received message : ", response)
    if ("URLUPDATE" == response) { // Confirm that the message signifies an updation of the URL list
        chrome.storage.local.get( ['urls'], function (cache) { // Obtain the new URL list from local storage
            console.log("New URL blocking list obatined : ", cache.urls)

            // If there is an old listener using an outdated blocking list, then delete it
            if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) { 
                console.log("Web request listener with outdated blocking list. Deleting listener")
                chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
            }

            chrome.webRequest.onBeforeRequest.addListener( // Create listener woth new updated list
                blockRequest, cache, ["blocking"]); 
            // Any URL in the blocked list (cache), is "blocked" and redirected to sagemode.html returned by the blockRequest callback
            console.log("Listener created with updated blocking list ffrom local storage")
        }
        );
    }
  });

