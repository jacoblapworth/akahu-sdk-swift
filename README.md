xui-icon
========

xui-icon is a module for importing and using XUI Icons to you project. Two React JS classes come with xui-icon, and they are intended to be used together. 

They may be imported to your project using `import XuiIcon, {XuiIconBlob} from 'xui-icon'`. `<XuiIconBlob/>` is a hidden element which contains all of the SVG markup for each icon, and `<XuiIcon/>` may be used to reference icons in the blob and display each of them in place. As a result, `XuiIconBlob` must be declared before any icon you wish to display.

By default, each icon has it's fill set to `currentColor`, which means that it will use the inerited font colour.

`XuiIcon`'s parameters:
 - `icon` (string, required): specifies which icon you want to use
 - `modifierClasses` (string, optional): used to specify any additional classes for styling the icon. This will mostly be used for adding size modifiers. 
