# xui

<a href="https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master"><img src="https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon"></a>

A shared stylesheet for Xero applications.


## Using in Your Project

```bash
$ bower install git@github.dev.xero.com:Style/xui.git --save
```

You will need to compile `xui.scss`.

![](construction-cat.gif)

XUI is rapidly evolving and breaking changes are likely with versions before 1.0.0. It is recommended that you use a specific version rather than a version range _and_ stay in contact with the [User Experience Engineering team](https://www.flowdock.com/app/xero/ux-engineering) to keep up with changes.
[XUI Invision Board](https://xero.invisionapp.com/boards/DN2P9HFAUVQP)  
[Toolkit Invision Board](https://xero.invisionapp.com/share/P52VL4LHW)  



## Contributing to XUI

You'll need:

* [NodeJS](https://nodejs.org/)
* [Grunt](http://gruntjs.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)

[nvm](https://github.com/creationix/nvm) is recommended, but not required.

### npm scripts

Script          | Description
----------------|-------------
`npm install`   | Installs dependencies; required for other steps.
`npm run lint`  | Lints the stylesheet.
`npm run build` | Comiples the stylesheet.
`npm run doc`   | Comiples the style guide documentation.
