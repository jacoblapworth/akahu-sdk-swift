xui-icon
========

xui-icon is a module for importing and using XUI Icons to you project. Two React JS classes come with xui-icon, and they are intended to be used together. 

They may be imported to your project using `import XuiIcon, {XuiIconBlob} from 'xui-icon'`. `<XuiIconBlob/>` is a hidden element which contains all of the SVG markup for each icon, and `<XuiIcon/>` may be used to reference icons in the blob and display each of them in place. As a result, `XuiIconBlob` must be declared before any icon you wish to display.

By default, each icon has its fill set to `currentColor`, so it will use the inherited font colour.

`XuiIcon`'s parameters:
 - `icon` (string, required): specifies which icon you want to use
 - `modifierClasses` (string, optional): used to specify any additional classes for styling the icon. This will mostly be used for adding size modifiers. 

Using the Icons Without React
=============================

This package uses Babel & Rollup to create a standard JS distributable which has a function that can be used to inject the icon blob into your project. You can use it in the following way:
 - Add the icon blob to a DOM element at the top of your page:
 ```js
import xuiIconBlob from 'xui-icon-blob/dist/xuiIconBlob.js';

xuiIconBlob(document.getElementById('iconblob'));
```
 - Place `<svg class="xui-icon [modifiers]"> <use xlink:href="#[icon name]" /> </svg>` wherever you are wanting to use an icon from the package.

Icons
=====

A full list of existing icons may be found [here](https://github.dev.xero.com/pages/UXE/xui-icon/).

Contributing Icons
==================

This project pulls in it's icon data from `src/iconData.js`. If you wish to add an icon to the set, they may be added here. Simply add a new entry into the json with the icon name and path value for drawing the icon.

### Pre-commit hook
You can add a pre-commit hook to ensure you're building the javascript files before making your PR by running the following command:
```bash
$ ln -s ../../pre-commit.sh .git/hooks/pre-commit
```
