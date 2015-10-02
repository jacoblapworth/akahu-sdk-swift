# XUI

XUI is a CSS implementation of the [Xero Pattern Library](https://xero.invisionapp.com/boards/DN2P9HFAUVQP).

To use XUI in your project include the following `link` in your page:

```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/<%= version %>/xui.css"/>
```

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
