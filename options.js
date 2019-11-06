function saveOptions(e) {
    e.preventDefault();
    errorElement = document.getElementById("errors");
    var prefix = document.querySelector("#prefix").value;
    if (/[<>:"\\|?*\x00-\x1F]|(\/{2,})/g.test(prefix)) {
        errorElement.textContent = chrome.i18n.getMessage("invalid_characters"); //"Your prefix contains invalid characters and can't be saved, please check it.";
    } else {
        chrome.storage.sync.set({
            prefix: document.querySelector("#prefix").value
        });
        errorElement.innerHTML = "";
    }

}

function onLoad() {
    document.getElementById("mainPara1").textContent = chrome.i18n.getMessage("mainParagraph1");
    document.getElementById("mainPara2").textContent = chrome.i18n.getMessage("mainParagraph2");
    document.getElementById("saveButton").textContent = chrome.i18n.getMessage("save");

    function setCurrentChoice(result) {
        document.querySelector("#prefix").value = result.prefix || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = chrome.storage.sync.get("prefix", result => {
        setCurrentChoice(result);
    });

}

document.addEventListener("DOMContentLoaded", onLoad);
document.querySelector("form").addEventListener("submit", saveOptions);
