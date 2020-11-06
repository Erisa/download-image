#!/bin/bash
rm -fv download-image.zip
zip -r download-image.zip ./ -x '*.git*' -x '*.github-resources*' -x '*download-image.zip*' -x '*zip.sh*' -x '*zip-win.bat*'
