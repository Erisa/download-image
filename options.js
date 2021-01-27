var INVALID_CHARS_REGEX = /[<>:"\\|?*\x00-\x1F]|(\/{2,})/g;

function translateElements(e_msgNames) {
    for (let i = 0; i < e_msgNames.length; i++) {
        var cfg = e_msgNames[i];
        document.getElementById(cfg[0]).textContent = chrome.i18n.getMessage(cfg[1]);
    }
}

function onLoad() {
    translateElements([
        ["mainPara1", "mainParagraph1"],
        ["mainPara2", "mainParagraph2"],
        ["saveButton", "save"]
    ]);
    var errorElement = document.getElementById("errors");
    var prefixInput = document.querySelector("#prefix");

    function setCurrentChoice(result) { prefixInput.value = result.prefix || ""; }
    chrome.storage.sync.get("prefix", setCurrentChoice);

    function saveOptions(ev) {
        ev.preventDefault();
        if (INVALID_CHARS_REGEX.test(prefixInput.value)) {
            errorElement.textContent = chrome.i18n.getMessage("path_contains_invalid_characters");
        } else {
            chrome.storage.sync.set({ prefix: prefixInput.value });
            errorElement.textContent = "";
        }
    }

    document.querySelector("form").addEventListener("submit", saveOptions);
}

document.addEventListener("DOMContentLoaded", onLoad);
