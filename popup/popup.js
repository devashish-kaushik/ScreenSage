// Initialize the filter list in the popup with current values
window.onload = function() { // Runs everytime popup is opened
    console.log("Popup opened")
    chrome.storage.local.get( ['urls'], function (cache) {
        console.log("Blocked URL list from local storage : ", cache.urls)
        if (!cache.urls.includes("*://*.facebook.com/*")) { // if the URL list in local storage does NOT include the URL
            document.getElementById("facebook").checked = false; // Then uncheck the corresponding check box
        }
        if (!cache.urls.includes("*://*.youtube.com/*")) {
            document.getElementById("youtube").checked = false;
        }
        if (!cache.urls.includes("*://*.twitter.com/*")) {
            document.getElementById("twitter").checked = false;
        }
        if (!cache.urls.includes("*://*.reddit.com/*")) {
            document.getElementById("reddit").checked = false;
        }
        if (!cache.urls.includes("*://*.netflix.com/*")) {
            document.getElementById("netflix").checked = false;
        }
        if (!cache.urls.includes("*://*.4chan.org/*")) {
            document.getElementById("4chan").checked = false;
        }
        if (!cache.urls.includes("*://*.twitch.tv/*")) {
            document.getElementById("twitch").checked = false;
        }
        if (!cache.urls.includes("*://*.instagram.com/*")) {
            document.getElementById("instagram").checked = false;
        }
    }
    ); // Thus, only the websites which are blocked are ticked
}


// Update the block list as per the checkboxes selected by the user
// All sites are checked when popup opens for first time as specified in html
// After that previous selection is shown on opening using window.onload above
document.getElementById('blocking').onclick = async () => { // Run whenever the block button in the popup is clicked
    userResponse = window.prompt("Please type \"I am responsible for this\"")
    console.log("New blocking list entered by user. Confirmation requested")

    if ("I am responsible for this" == userResponse) { // Check if user entered correct phrase
        console.log("Confirmation successful")

        var urlList = new Array(); // If yes, put the new list of URLs which are to be blocked in an array
        urlList.push("*://prohibited.illegal.domain/*")
        if (document.getElementById('facebook').checked ) {
            urlList.push("*://*.facebook.com/*")
        }
        if (document.getElementById('youtube').checked) {
            urlList.push("*://*.youtube.com/*")
        }
        if (document.getElementById('twitter').checked) {
            urlList.push("*://*.twitter.com/*")
        }
        if (document.getElementById('reddit').checked) {
            urlList.push("*://*.reddit.com/*")
        }
        if (document.getElementById('netflix').checked) {
            urlList.push("*://*.netflix.com/*")
        }
        if (document.getElementById('4chan').checked) {
            urlList.push("*://*.4chan.org/*")
        }
        if (document.getElementById('twitch').checked) {
            urlList.push("*://*.twitch.tv/*")
        }
        if (document.getElementById('instagram').checked) {
            urlList.push("*://*.instagram.com/*")
        }
        console.log("URLsdesignated to be blocked : ", urlList)

        chrome.storage.local.set({ "urls": urlList }, function() { // Save the list in local storage
            console.log("New list of URLs saved succesfully")
            alert('The following blocks were set :  ' + urlList.slice(1));
            chrome.runtime.sendMessage("URLUPDATE");  // Send message saying URLUPDATE which will be picked up by background script
            // This will serve as a signal to update the listener which is blocking the URLs with the new list
        });
    } else {
        console.log("Confirmation failed")
    }
};