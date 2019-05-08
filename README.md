# Download Image from Context Menu

This extension simply adds a context menu item which allows you to (Directly) download an image. Currently this only shows on images, and doesn't seem to work for **some** images which are also links, or for `file://` or `data:` URIs.

## Why?
Because I wanted it, and so I made it. This simple idea for an extension was born from saving multiple images at once, and rapidly pressing enter after each save to go through the "Save as" prompt.

## Features
- Download an image from context menu without a save prompt.

## Screenshot
This will look similar on other browsers (Like Chrome), but I decided not to include too many images to make the repository too large.  
![An example screenshot of a right click menu which has "Download image" at the bottom](/.github-resources/example.png)

## Download

### Mozilla Firefox (Desktop)
Grab a signed XPI from the official [Firefox Add-ons](https://addons.mozilla.org/en-GB/firefox/addon/download-image/) website, or from the [Releases](https://github.com/Erisa/download-image/releases) section.

### Google Chrome / Chromium / Opera / Vivaldi / Brave / Microsoft Edge Canary/Dev
Grab a signed CRX from the official [Chrome Web Store](https://chrome.google.com/webstore/detail/download-image-from-conte/fihdnfkfpjmipmlggdknalpfjjnjbboj), or from the [Releases](https://github.com/Erisa/download-image/releases) section.

### Microsoft Edge (UWP)
Not currently possible due to UWP Edge not supporting the [downloads.download()] function. Could be potentially explored in future by triggering the download a different way (Possibly by abusing `data:` URIs?)
When available, it will be distributed through the Microsoft Store and possibly also this repository.

### Mozilla Firefox (Android)
Not possible due to Firefox for Android not supporting the `menus` API.
Also not really needed if you configure your downloads to not prompt for a filename.

## Planned changes
- Support for `data:` URIs.
- Support for `file://` URIs.
- Generate file extensions (And possibly whole filenames) for images which don't have one.
- Investigate issues with link images.
- Legacy Edge support.
- Support for video downloading.
- Possibly work for downloading any link too, though might be out of scope.
