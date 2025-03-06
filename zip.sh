#!/bin/bash
rm -rfv build download-image.zip download-image-firefox.zip download-image-chrome.zip
mkdir -p build/chrome build/firefox

cp -r * build/chrome
cp -r * build/firefox

cat manifest.json | jq 'del(.background.service_worker, .background.type)' > build/firefox/manifest.json
cat manifest.json | jq 'del(.background.scripts)' > build/chrome/manifest.json

cd build/firefox && zip -r ../../download-image-firefox.zip . -x '*.git*' -x '*.github-resources*' -x '*download-image.zip*' -x '*zip.sh*' -x '*zip-win.bat*'
cd ../../build/chrome && zip -r ../../download-image-chrome.zip . -x '*.git*' -x '*.github-resources*' -x '*download-image.zip*' -x '*zip.sh*' -x '*zip-win.bat*'
