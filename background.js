mimeTypes = { "image/aces": ["exr"], "image/apng": ["apng"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/ktx": ["ktx"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"] }

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
  var targetFilename
  let uri = new URL(url);
  if (uri.protocol == "data:") {
    let base64ContentArray = url.split(",");
    let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
    ext = mimeTypes[mimeType][0];
    var file = base64ContentArray[1].substring(0, 16).replace("/", "0");
    targetFilename = prefix + file + "." + ext;

    byteString = atob(base64ContentArray[1]);

    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    let blob = URL.createObjectURL(new Blob([ia], { type: mimeType }));

    chrome.downloads.download({
      url: blob,
      conflictAction: 'uniquify',
      filename: targetFilename
    });
  } else {
    var file = url.split('/').pop().split('#')[0].split('?')[0].replace(':', '_');
    targetFilename = prefix + file;
    chrome.downloads.download({
      url: url,
      conflictAction: 'uniquify',
      filename: targetFilename
    });
  }


}
