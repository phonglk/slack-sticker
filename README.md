# chrome-extension-webpack-boilerplate
Chrome Extension with Webpack minimal boilerplate

Clone to existing repo:

`git clone --depth=1 --branch=master https://github.com/phonglk/chrome-extension-webpack-boilerplate.git tmp;rm -rf tmp/.git;mv -rf tmp/* .;rm -rf tmp;`


Includes:
- Webpack, LESS
- Eslint (airbnb)
- Lodash

Skeleton:
- Content Script
- Background Script
- Popup
- Option Page

Features:
- Separate dll and css build from main source build to speed up the development build
