const mimeTypes = { "image/aces": ["exr"], "image/apng": ["apng"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/ktx": ["ktx"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"] }
const validExts = ["exr", "apng", "bmp", "cgm", "drle", "emf", "fits", "g3", "gif", "heic", "heics", "heif", "ief", "jls", "jp2", "jpg2", "jpeg", "jpg", "jpe", "jpm", "jpx", "ktx", "png", "sgi", "svg", "svgz", "t38", "tif", "tiff", "tfx", "webp", "wmf"]

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

    doDownload(info.srcUrl, prefix, info.pageUrl);
  });
});

function doDownload(url, prefix, pageUrl) {
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
    var lastChar = url.substr(url.length - 1);
    if (lastChar == '/') {
      url = url.slice(0, -1);
    }
    var file = url.split('/').pop().split('#')[0].split('?')[0].replace(':', '_');
    targetFilename = prefix + file;

    if (targetFilename == "") {
      targetFilename = "unknown"
    }


    // check valid ext
    let ext = targetFilename.split('.').pop();

    let mimeType;

    if (!validExts.includes(ext)) {
      const request = new Request(url, { method: 'HEAD' });
      fetch(request)
        .then(response => {
          mimeType = response.headers.get('content-type')
          ext = mimeTypes[mimeType][0];
          targetFilename = targetFilename + "." + ext;
          console.debug(targetFilename);
          downloadFile(url, targetFilename, pageUrl);
        })
        .catch(error => {
          console.error(error);
          if (uri.searchParams.has("format")) {
            ext = uri.searchParams.get("format");
            targetFilename = targetFilename + "." + ext;
            downloadFile(url, targetFilename, pageUrl);
          }
          downloadFile(url, targetFilename, pageUrl);
        });
    } else {
      downloadFile(url, targetFilename, pageUrl);
    }
  }

  function downloadFile(targetUrl, targetFilename, pageUrl) {
    let downloadHeaders = []
    // If running under Firefox
    if (typeof browser !== "undefined"){
      downloadHeaders = [
        {
          name: "Referer",
          value: pageUrl
        }
      ]
    }

    chrome.downloads.download({
      url: targetUrl,
      conflictAction: 'uniquify',
      filename: targetFilename,
      headers: downloadHeaders
    });
  }

}
