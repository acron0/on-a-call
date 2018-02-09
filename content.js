chrome.runtime.sendMessage({operation: "on"});
window.onunload = function(){ chrome.runtime.sendMessage({operation: "off"}); };
