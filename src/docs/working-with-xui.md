<p class="ds-intro">
	Set some expectations about what it is and does. It’s unlikely to solve everything. You’ll still need to design. We’re here to help — and link off to [feedback](./section-feedback.html) and [updates](./section-updates.html) pages
<p>

## Developing with XUI

Probably hit our getting started guide on Github

### CSS

XUI styling can be applied on it’s own.
Handy if you're prototyping things and there's a tokens file here too.
We use BEM
Here's some info about writing custom styles

### React

XUI comes with a few fully supported React Components to deliver complex interactions in consistent ways.
Look out for the [React Icon] to when there's a matching component or browse the [XUI React Docs](https://github.dev.xero.com/pages/UXE/Components-Registry/)



## Designing with XUI

Start with XUI. Work to make the best thing from the materials we already have. Introduce new concepts consciously and in concert with the overall system. If you're struggling to meet users’ needs then talk it through with the systems team.

Understand the foundations. XUI assumes a few things and falls over if used for things it wasn't designed for so get your head around the principles.

### Custom

Avoid custom for the sake of it - sometimes 100% positive for a specific situation can be a significant negative in a users overall experience of Xero.

### Managing the development process

What to expect from devs

### Handy tools

There's a [Sketch file](https://github.dev.xero.com/designers/xui-toolkit).

Get into HTML - Codepen is useful for prototyping.






## Information for product teams

This should let you build things quicker.
Challenge your designer.
Get design architect involved at the planning stage.
What sort of commitment is involved? Will I have to keep updating shit?

## What if XUI doesn't have what I need?


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
