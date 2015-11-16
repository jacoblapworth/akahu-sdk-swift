# XUI

XUI is a CSS implementation of the [Xero Pattern Library](https://xero.invisionapp.com/boards/DN2P9HFAUVQP).

To use XUI in your project include the following `link` in your page:

### Minified
```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/<%= version %>/xui.min.css"/>
```

### Development
```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/<%= version %>/xui.css"/>
```

## Examples

[XUI Examples](https://github.dev.xero.com/pages/UXE/xui-examples/) provides examples of XUI component styles in larger interface layouts.

## Example Page Markup
```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Page Title</title>
		<link rel="stylesheet" href="https://edge.xero.com/style/xui/<%= version %>/xui.min.css"/>
	</head>
	<body>
        <header class="xui-pagenav">
            <div class="xui-pagecontainer xui-pagecontainer-spaced xui-pagecontainer-large">
                <div class="xui-pagenav--main ">
                    <h1 class="xui-page-title">Page Navigation Title</h1>
                </div>
                <nav class="xui-pagenav--nav xui-pagecontainer">
                    <ul class="xui-tabgroup">
                        <li class="xui-tab xui-tab-pagenav">
                            <a class="xui-tab--body" href="#nav1">Nav 1</a>
                        </li>
                        <li class="xui-tab xui-tab-pagenav xui-tab-pagenav-is-selected">
                             <a class="xui-tab--body" href="#nav3">Nav 3</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <header class="xui-pageheading">
            <div class="xui-pageheading--content xui-pagecontainer xui-pagecontainer-spaced xui-pagecontainer-large">
                <h1 class="xui-pageheading--title">Title</h1>
            </div>
        </header>
        <div class="xui-panel xui-pagecontainer xui-pagecontainer-large">
            <header class="xui-panel--header">
                <h3 class="xui-panel--heading xui-text-panelheading">Panel Header</h3>
            </header>
            <section>
                <!-- page content -->
            </section>
        </div>
    </body>
</html>
```

## Usage Guidelines

* Do not create any classes that use the `xui` namespace outside this project. Namespace your project's classes appropriately.
* In your main application, make sure XUI is loaded or imported before any of your other stylesheets.
* When developing components, import XUI as a devDependency. Do not import XUI, or any SCSS file containing shared classes, in any code that your component exports. SCSS does not currently dedupe multiple imports of the same code, so importing XUI in separate components will at the very least lead to bloated files. It may also cause broken styling depending on when the imports occur.
* If you need XUI's variables and mixins, import them individually:
  * For variables, `@import 'xui/src/sass/vars';`
  * For mixins, `@import 'xui/src/sass/tools/mixins';`

## Contributing to XUI

Please see [CONTRIBUTING.md](https://github.dev.xero.com/Style/xui/blob/master/CONTRIBUTING.md)

## Help

For Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering).

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
