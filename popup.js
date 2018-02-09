function saveKey() {
    on = document.getElementById("on-a-call").value;
    off = document.getElementById("off-a-call").value;
    chrome.storage.local.set({
        "on-a-call": on,
        "off-a-call": off});
};

function initialize() {
    chrome.storage.local.get(["on-a-call", "off-a-call"], function(items) {
        document.getElementById("on-a-call").value = items["on-a-call"];
        document.getElementById("off-a-call").value = items["off-a-call"];
    });
};

document.getElementById("save_button").addEventListener("click", saveKey);
window.addEventListener("load", initialize);
