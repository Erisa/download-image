const mimeTypeExts = { "image/aces": ["exr"], "image/apng": ["apng"], "image/bmp": ["bmp"], "image/cgm": ["cgm"], "image/dicom-rle": ["drle"], "image/emf": ["emf"], "image/fits": ["fits"], "image/g3fax": ["g3"], "image/gif": ["gif"], "image/heic": ["heic"], "image/heic-sequence": ["heics"], "image/heif": ["heif"], "image/heif-sequence": ["heifs"], "image/ief": ["ief"], "image/jls": ["jls"], "image/jp2": ["jp2", "jpg2"], "image/jpeg": ["jpeg", "jpg", "jpe"], "image/jpm": ["jpm"], "image/jpx": ["jpx", "jpf"], "image/jxr": ["jxr"], "image/ktx": ["ktx"], "image/png": ["png"], "image/sgi": ["sgi"], "image/svg+xml": ["svg", "svgz"], "image/t38": ["t38"], "image/tiff": ["tif", "tiff"], "image/tiff-fx": ["tfx"], "image/webp": ["webp"], "image/wmf": ["wmf"] }
const validExts = ["exr", "apng", "bmp", "cgm", "drle", "emf", "fits", "g3", "gif", "heic", "heics", "heif", "ief", "jls", "jp2", "jpg2", "jpeg", "jpg", "jpe", "jpm", "jpx", "ktx", "png", "sgi", "svg", "svgz", "t38", "tif", "tiff", "tfx", "webp", "wmf"]
const MIME_TYPE_REGEX = /[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/

function onError(error) {
  console.log(`Error: ${error}`);
}

chrome.contextMenus.create({
  id: "download-image",
  title: chrome.i18n.getMessage("menuItemDownloadImage"),
  contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.storage.sync.get("prefix", items => {
    prefix = (Object.keys(items).length == 0)? "" : items.prefix;
    doDownload(info.srcUrl, prefix);
  });
});

function stringToUint8Array(s) {
  var buf = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++) {
    buf[i] = s.charCodeAt(i);
  }
  return buf;
}
function doDownload(url_str, prefix) {
  const formatTargetFilename = (name, mime) => {
    return prefix + name + "." + mimeTypeExts[mime][0];
  }
  const downloadFile = (targetUrl, targetFilename) => {
    chrome.downloads.download({
      url: targetUrl.href,
      filename: targetFilename,
      conflictAction: 'uniquify'
    });
  }
  let url = new URL(url_str);

  if (url.protocol != "data:") {
    let filename = url_str.split('/').pop().split('#')[0].split('?')[0].replace(':', '_'); // foo/(bar.html)?a#...
    let targetPath = prefix + filename;

    let ext = filename.split('.').pop(); // check valid ext

    if (validExts.includes(ext)) { downloadFile(url, targetPath); }
    else {
      fetch(new Request(url_str, { method: 'HEAD' }))
        .then(response => {
          let targetFilename = formatTargetFilename(filename, response.headers.get('content-type'));
          console.debug(targetFilename);
          downloadFile(url, targetFilename);
        })
        .catch(error => {
          console.error(error);
          if (url.searchParams.has("format")) {
            downloadFile(url, formatTargetFilename(filename, url.searchParams.get("format")));
          }
          downloadFile(url, targetPath); // why twice???
        });
    }
  } else {
    let mimeEndIdx = url_str.indexOf(",");
    let mimePart = url_str.substring(0, mimeEndIdx);
    let fileBytesB64 = url_str.substring(mimeEndIdx+1, url_str.length);

    let mimeType = mimePart.match(MIME_TYPE_REGEX)[0];
    var file = fileBytesB64.substring(0, 16).replace("/", "0"); // auto rename 16-chars path

    let blob = new Blob([stringToUint8Array(atob(fileBytesB64))]);
    let blobUrl = URL.createObjectURL(blob, { type: mimeType });

    downloadFile(blobUrl, formatTargetFilename(prefix, file, mimeType));
  }
}
