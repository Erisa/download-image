function onError(error) {
  console.log(`Error: ${error}`);
}

chrome.contextMenus.create({
  id: "download-image",
  title: chrome.i18n.getMessage("menuItemDownloadImage"),
  contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.downloads.download({
    url: info.srcUrl,
    conflictAction: 'uniquify'
  })
});
