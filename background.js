function onError(error) {
  console.log(`Error: ${error}`);
}

chrome.contextMenus.create({
  id: "download-image",
  title: chrome.i18n.getMessage("menuItemDownloadImage"),
  contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  var getting = chrome.storage.sync.get("prefix", items => {
    if (Object.keys(items).length === 0) {
      prefix = ""
    } else {
      prefix = items.prefix;
    }

    doDownload(info.srcUrl, prefix);
  });
});

function doDownload(url, prefix) {
  var file = url.split('/').pop().split('#')[0].split('?')[0];
  var targetFilename = prefix + file;
  chrome.downloads.download({
    url: url,
    conflictAction: 'uniquify',
    filename: targetFilename
  });
}
