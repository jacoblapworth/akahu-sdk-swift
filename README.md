# xui

<a href="https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master"><img src="https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon"></a>

A shared stylesheet for Xero applications.


## Using in Your Project

### CDN

Include the following CSS file in your page:

```html
<link rel="stylesheet" href="https://xero-rd-edge.s3-us-west-2.amazonaws.com/style/xui/2.0.1/xui.css"/>
```

### Usage Guidelines

Do not create any classes that use the `xui` namespace outside this project.

### Bower
```bash
$ bower install git@github.dev.xero.com:Style/xui.git --save
```

You will need to compile `xui.scss`.

![](construction-cat.gif)

XUI is rapidly evolving and breaking changes are likely with versions before 1.0.0. It is recommended that you use a specific version rather than a version range _and_ stay in contact with the [User Experience Engineering team](https://www.flowdock.com/app/xero/ux-engineering) to keep up with changes.


## Contributing to XUI

Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

### npm scripts

Script          | Description
----------------|-------------
`npm install`   | Installs dependencies; required for other steps.
`npm run lint`  | Lints the stylesheet.
`npm run build` | Comiples the stylesheet.
`npm run doc`   | Compiles the style guide documentation.
`npm run watch` | Watches for changes and then lints and compiles the stylesheet and the style guide
