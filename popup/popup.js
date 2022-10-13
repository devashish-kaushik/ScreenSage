// Initialize the filter list in the popup with current values
window.onload = function() { // Runs everytime popup is opened
    chrome.storage.local.get( ['urls'], function (cache) {
        if (!cache.urls.includes("*://*.facebook.com/*")) {
            document.getElementById("facebook").checked = false;
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
    );
}


// Update the block list as per the checkboxes selected by the user
// All sites are checked when popup opens for first time as specified in html
// After that previous selection is shon on opening using window.onload above
document.getElementById('blocking').onclick = async () => { // Ruhenever the block button in the popup is clicked
    var urlList = new Array();
    //urlList = ["*://*.facebook.com/*", "*://*.youtube.com/*", "*://*.twitter.com/*", "*://*.reddit.com/*", "*://*.netflix.com/*", "*://*.4chan.org/*", "*://*.twitch.tv/*","*://*.instagram.com/*"]
    if (document.getElementById('facebook').checked ) {
        urlList.push("*://*.facebook.com/*")
        //const index = urlList.indexOf("*://*.facebook.com/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('youtube').checked) {
        urlList.push("*://*.youtube.com/*")
        //const index = urlList.indexOf("*://*.youtube.com/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('twitter').checked) {
        urlList.push("*://*.twitter.com/*")
        //const index = urlList.indexOf("*://*.twitter.com/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('reddit').checked) {
        urlList.push("*://*.reddit.com/*")
        //const index = urlList.indexOf("*://*.reddit.com/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('netflix').checked) {
        urlList.push("*://*.netflix.com/*")
        //const index = urlList.indexOf("*://*.netflix.com/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('4chan').checked) {
        urlList.push("*://*.4chan.org/*")
        //const index = urlList.indexOf("*://*.4chan.org/*");
        //.splice(index, 1);
    }
    if (document.getElementById('twitch').checked) {
        urlList.push("*://*.twitch.tv/*")
        //const index = urlList.indexOf("*://*.twitch.tv/*");
        //urlList.splice(index, 1);
    }
    if (document.getElementById('instagram').checked) {
        urlList.push("*://*.instagram.com/*")
        //const index = urlList.indexOf("*://*.instagram.com/*");
        //urlList.splice(index, 1);
    }

  chrome.storage.local.set({ "urls": urlList }, function() {
    //alert("Saved succesfully");
    alert('The following blocks were set :  ' + urlList);
    chrome.runtime.sendMessage("URLUPDATE");
});
};