XUI
===

[![TC_build_status](https://teamcity.dev.xero.com/app/rest/builds/buildType:id:Xui_Style_Master/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master)
![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)

### Always get the latest versions here:
* XUI documentation: https://github.dev.xero.com/pages/UXE/xui/
* XUI on GitHub: https://github.dev.xero.com/UXE/xui
* Component Registry: https://github.dev.xero.com/pages/UXE/Components-Registry/


Using in Your Project
---------------------

### CDN (Recommended)

Include the following `link` in your page:

<!--?prettify lang=html?-->
```
<link rel="stylesheet" href="https://edge.xero.com/style/xui/10.24.0/xui.min.css"/>
```

#### Sherlock

You can use [Sherlock](https://github.dev.xero.com/Xero/Sherlock) to pull in the latest version of XUI for a given semver range.
A Sherlock manifest is available at `https://edge.xero.com/style/xui/sherlock.json`.

### Bower

<!--?prettify?-->
```
$ bower install git@github.dev.xero.com:UXE/xui.git#^10.24.0 --save
```

### npm

<!--?prettify?-->
```
$ npm install git://github.dev.xero.com/UXE/xui.git#10.24.0 --save
```

You will need to compile `xui.scss`.


What is XUI For?
----------------

XUI provides a CSS base that implements the Xero Pattern Library.

It is heavily [inspired by Stripe's approach](http://www.youtube.com/watch?feature=player_embedded&v=NHpSmJrEvRQ).

We also provide React components that target XUI in the [UXE Github org](https://github.dev.xero.com/UXE).
When appropriate components exist, developers should use those components over using XUI directly.

Example Page Markup
-------------------
<!--?prettify lang=html?-->
```
<!DOCTYPE html>
<html class="xui-html" lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Page Title</title>
    <link href="https://edge.xero.com/style/xui/10.24.0/xui.min.css" rel="stylesheet" />
    <script type="application/json" id="header-data" data-render-to="#header">
      {"app":{"name":"business","type":"business"},"page":{"title":"Page title"},"navigation":[{"name":"Home","url":"#"}]}
    </script>
    <link rel="stylesheet" href="https://edge.xero.com/platform/header/4.2.0/header.min.css" />
    <script src="https://edge.xero.com/platform/header/4.2.0/header.min.js" defer></script>
  </head>
  <body class="xui-body">
    <header id="header"></header>
    <header class="xui-pageheading">
      <div class="xui-pageheading--content xui-pageheading--content-layout xui-page-width-standard">
        <h1 class="xui-pageheading--title">Page Title</h1>
      </div>
    </header>
    <div class="xui-margin-horizontal-small">
      <main role="main" class="xui-page-width-standard xui-padding-vertical-large">
        <h1 class="xui-heading-display xui-margin-none">Hello World</h1>
      </main>
    </div>
  </body>
</html>
```

Using XUI
---------

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

Developing XUI Components
-------------------------

When developing components, import XUI as a dependency. Do not import XUI,
or any SCSS file containing shared classes, in any code that your component
exports. SCSS does not currently dedupe multiple imports of the same code, so
importing XUI in separate components will at the very least result in bloated
files. It may also cause broken styling depending on when the imports occur.

Using XUI's Variables and Mixins
--------------------------------

If you want access to XUI's variables and mixins, you can import XUI as a dependency, and then import these individual files
  * For variables, `@import 'xui/src/sass/vars';`
  * For mixins, `@import 'xui/src/sass/mixins';`

We do not recommend importing any other files as they are not considered a part of XUI's public API; they might move around between versions, which could end up breaking your project.

Updating
--------

XUI follows [semantic versioning](http://semver.org). You should be able to update patch and minor versions without
requiring any changes to your code.

The [UXE Releases flow](https://www.flowdock.com/app/xero/uxe-releases) lists updates and upgrades when they
become available.


Upgrading
---------

Major releases with breaking changes will be made in accordance with our [roadmap](https://github.dev.xero.com/UXE/xui/wiki#roadmap).

Release notes will be provided in the [releases](https://github.dev.xero.com/UXE/xui/releases) section of the repo to
enable you to upgrade as seamlessly as possible.


Consuming Future Breaking Changes
---------------------------------

If you find yourself needing XUI CSS before it's released, you have two options:
* Implement the required changes to the `xui-` classes as part of your app code
 * If you do this, take care to ensure that these XUI classes are loaded first before the rest of your CSS so that it
   simulates what will happen when you upgrade XUI
* Create an app-specific class for the element you're targeting which will override XUI styling
 * These app-specific classes should be treated as tech debt and should not linger in the relevant JS/HTML after upgrading.

Regardless of the approach you choose, make sure you do the following:

* Document! Explain the reason for the overrides and add a TODO to remove it with the expected version of XUI containing
  the change you want. You could also create an issue in your Github repo or a JIRA ticket.
* When upgrading, check to see that the change you wanted is still there - it may have changed! Then remove your custom
  code and verify that it works with the version of XUI you are upgrading to.


Contributing to XUI
-------------------

XUI is "internal open source" at Xero, meaning that we welcome contributions from anyone.
See [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md) for details on how to contribute.


Help
----

For general Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering)
or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have [a UXE team member on interrupts each week](https://github.dev.xero.com/UXE/Home/wiki/Interrupts-Support-Schedule) who can provide a prompt response to any specific questions or issues.

XUI's [roadmap](https://github.dev.xero.com/UXE/xui/wiki#roadmap) is documented in the project wiki.

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
