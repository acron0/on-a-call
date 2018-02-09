var call_count = 0;

function ifttt_event(op) {
    chrome.storage.local.get(["on-a-call", "off-a-call"], function(items) {
        var uri = null;
        if(op == "on") { uri = items["on-a-call"]; } else { uri = items["off-a-call"]; };
        if (uri != null) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", uri, true);
            // xhr.onreadystatechange = function() {
            //     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //         alert("SUCCESS");
            //     };
            // };
            xhr.send();
        };
    });
};

function process_call_state(calls) {
    if (calls >= 1) {
        chrome.browserAction.setIcon({path: "icon_on.png"});
        ifttt_event("on");
    } else {
        chrome.browserAction.setIcon({path: "icon.png"});
        ifttt_event("off");
    }
};

chrome.runtime.onStartup.addListener(
    function () {
        chrome.browserAction.setIcon({path: "icon.png"});
        ifttt_event("off");
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.operation == "on") {
            call_count += 1;
            process_call_state(call_count);
        } else if (request.operation == "off") {
            call_count -= 1;
            process_call_state(call_count);
        }
    }
);
