# Download Image from Context Menu

[Download for Firefox](https://addons.mozilla.org/en-GB/firefox/addon/download-image/) | [Download for Chrome](https://chrome.google.com/webstore/detail/download-image-from-conte/fihdnfkfpjmipmlggdknalpfjjnjbboj) | [Download for Edge](https://microsoftedge.microsoft.com/addons/detail/blbfdbinmdelkjcfceecbjnbkdmcdmoh)

<hr>

This extension simply adds a context menu item which allows you to (Directly) download an image. Currently this only shows on images, and doesn't seem to work for **some** images which are also links, or for `file://` or `data:` URIs.

## Why?
Because I wanted it, and so I made it. This simple idea for an extension was born from saving multiple images at once, and rapidly pressing enter after each save to go through the "Save as" prompt.

## Features
- Download an image from context menu without a save prompt.
- Choose a custom folder/filename prefix for your downloads. You can use this to put all files downloaded with the extension in a specific folder or to prefix their names with a specific string. 

## Notice for Firefox users
On Firefox, in many cases the tracking protection feature may interfere with this extension when set to the "**Strict**" option.

In some cases this interference may prevent the extension from automatically generating file extensions for images that do not have them in their filename.  
If this happens, you may have some image downloads which do not have valid file types. This does not affect the contents of the file, and they can be opened normally if a valid extension is manually provided.

In other cases (Seen more with newer Firefox versions) it may completely prohibit downloading of these extension-less images.  
These issues do not affect all images, only some. The exact cause is unknown but I see it the most with Twitter.

The only known workaround at this time is to set tracking protection to the "**Standard**" state.

## Screenshot
This will look similar on other browsers (Like Chrome), but here's one from Firefox on Windows.
![An example screenshot of a right click menu which has "Download image" at the bottom](/.github-resources/example.png)

## Download

- Only Firefox and Chrome for desktop are officially supported. Other Chromium-based browsers will likely work by association, but they won't be tested before a new version release.  
  - Other Firefox-based browsers will only work if they support WebExtensions. This includes WaterFox, but not Pale Moon. These browsers are not tested, but will likely work by association.  
- Browsers based on other engines (e.g. Safari, Internet Explorer, Edge Legacy) are not supported and will never be supported by me.  
- Mobile browsers are not supported, and never will be.

### Firefox (Desktop)
Grab a signed XPI from the official [Firefox Add-ons](https://addons.mozilla.org/en-GB/firefox/addon/download-image/) website, or from the [Releases](https://github.com/Erisa/download-image/releases) section.

### Google Chrome, Chromium, Opera, Vivaldi, Brave
Grab a signed CRX from the official [Chrome Web Store](https://chrome.google.com/webstore/detail/download-image-from-conte/fihdnfkfpjmipmlggdknalpfjjnjbboj), or from the [Releases](https://github.com/Erisa/download-image/releases) section.

### Microsoft Edge (Chromium)
Grab a signed CRX from the official [Microsoft Edge Addons Store](https://microsoftedge.microsoft.com/addons/detail/blbfdbinmdelkjcfceecbjnbkdmcdmoh) or from the [Releases](https://github.com/Erisa/download-image/releases) section.

### Microsoft Edge Legacy (EdgeHTML, UWP)
Not possible due to Edge Legacy not supporting the [downloads.download](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download) function. Other methods were explorered but failed (See [#4](https://github.com/Erisa/download-image/issues/4))  
Will never happen due to the release of [Edge powered by Chromium](https://microsoft.com/edge).

### Firefox for Android
Not possible due to Firefox for Android not supporting the `menus` API.
Also not really needed if you configure your downloads to not prompt for a filename.

## Planned changes
- Support for video downloading.
- Possibly work for downloading any link too, though might be out of scope.

## Credits
- Me! ([Erisa](https://github.com/Erisa))
- [TorchGM](https://github.com/torchgm/) - For the beautiful icon <3
- You! For using or considering to use my add-on! <3
