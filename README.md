# xui

<a href="https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master"><img src="https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon"></a> <img src="beta.png" alt="Beta">

A shared stylesheet for Xero applications that implements [Xero Pattern Library](https://xero.invisionapp.com/boards/DN2P9HFAUVQP).

For examples see https://github.dev.xero.com/pages/Style/xui/

## Using in Your Project

### CDN (Recommended)

Include the following `link` in your page:

```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/7.0.1/xui.css"/>
```

### Bower

```bash
$ bower install git@github.dev.xero.com:Style/xui.git --save
```

You will need to compile `xui.scss`.

## What is XUI For?

XUI provides a CSS base that implements the Xero Pattern Library.

The approach is heavily inspired by Stripe's approach, which is discussed in this video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=NHpSmJrEvRQ
" target="_blank"><img src="http://img.youtube.com/vi/NHpSmJrEvRQ/0.jpg"
alt="IMAGE ALT TEXT HERE" width="480" height="360" border="10"></a>

In the near future we aim to provide JavaScript components that target XUI and when those components are available developers should prefer those components over using XUI directly.

## Usage Guidelines

* Do not create any classes that use the `xui` namespace outside this project. Namespace your project's classes appropriately.
* In your main application, make sure XUI is loaded or imported before any of your other stylesheets.
* When developing components, import XUI as a devDependency. Do not import XUI, or any SCSS file containing shared classes, in any code that your component exports. SCSS does not currently dedupe multiple imports of the same code, so importing XUI in separate components will at the very least lead to bloated files. It may also cause broken styling depending on when the imports occur.
* If you need XUI's variables and mixins, import them individually:
  * For variables, `@import 'xui/src/sass/vars';`
  * For mixins, `@import 'xui/src/sass/tools/mixins';`

## Contributing to XUI

Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

## Help

For Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering).

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
