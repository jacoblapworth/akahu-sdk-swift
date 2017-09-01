<h1 class="ds-h0">Make things people know and love</h1>

<p class="ds-intro intro">
XUI is a design system for Xero web applications. It includes standard approaches and patterns plus the front-end code to implement them. XUI lets us focus on user problems over UI problems, keep a large codebase healthy, and get to market quickly.
</p>

### Always get the latest versions here:
* XUI Guide: https://github.dev.xero.com/pages/UXE/xui/
* XUI on GitHub: https://github.dev.xero.com/UXE/xui

## Getting Started

### For Designers

XUI provides guidelines and best practices for when to use certain patterns,
when not to use them and what alternatives could be considered.

* Start with:  [Colors](section-colors.html), [Icons](section-icons.html) & [Typography](section-typography.html)
* Download the latest Sketch template from [XUI Toolkit: releases](https://github.dev.xero.com/designers/xui-toolkit/releases).
* Then explore the components and patterns that XUI CSS provides

#### Limitations

Its goal is to be in lock step with Sketch templates used by designers.
In practice, this has proved much harder than we thought, but it is still an
aspirational goal of XUI. XUI should be used in conjunction with Sketch
templates. If patterns, styles and components already exist everyone will have
a better time.

### For Developers

CSS is hard. XUI's goal is for you to not write CSS. We do this by providing CSS for a suite of validated components and design patterns.

* Explore the components in the [XUI React Docs](react/)
* Explore [Colors](section-colors.html), [Icons](section-icons.html) & [Typography](section-typography.html)
* Explore the patterns and other components that XUI CSS provides

### Using XUI

 * Add the `xui-body` class to your `<body>` element and `xui-html` to your
   `<html>` element, unless you are targeting legacy pages.
   The `xui-body` class provides background color, baseline font
   styling and line height. Note that if you use this, you must use at least
   version 3.0.3 of the Shared Header.
   The `xui-html` class sets the height of the `html` element to 100%, and
   the body element with `xui-body` directly under it.
 * For pages with legacy CSS that are unable to use `xui-body`, wrap XUI components in a container
   which has the `xui-container` class applied. This sets properties that XUI relies on,
   such as `box-sizing: border-box`, its default line-height, fonts, etc.
   For tricky legacy CSS that might override those rules, you can also use the
   `xui-container` mixin to apply these rules to more specific selectors in your own CSS.
 * Do not create any classes that use the `xui-` namespace outside this project.
   The only exception to this rule is [detailed below](#consuming-future-breaking-changes).
 * Namespace your project's classes appropriately and separately to XUI.
 * Avoid writing your own CSS as much as possible, particularly if your CSS
   overrides XUI's styling. The less custom CSS you have, the easier it will be
   to upgrade to future versions of XUI.
 * In your main application, make sure XUI is loaded or imported before any of
   your other stylesheets.

### Going Deeper

* XUI on GitHub: https://github.dev.xero.com/UXE/xui
* XUI Contributing guidelines [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md)
* [Tell us what you think](https://github.dev.xero.com/UXE/xui/issues)
