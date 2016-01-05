xui
===

[![TC_build_status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master)
![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)

A shared stylesheet for Xero applications that implements the [Xero Pattern Library](https://xero.invisionapp.com/share/CX2VL4F75).

For examples see https://github.dev.xero.com/pages/UXE/xui/


Using in Your Project
---------------------

### CDN (Recommended)

Include the following `link` in your page:

```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/9.4.0/xui.css"/>
```

#### Sherlock

You can use [Sherlock](https://github.dev.xero.com/Xero/Sherlock) to pull in the latest version of XUI for a given semver range. 
A `sherlock.json` manifest is available at `https://edge.xero.com/style/xui/sherlock.json`.

### Bower

```bash
$ bower install git@github.dev.xero.com:UXE/xui.git --save
```

You will need to compile `xui.scss`.


What is XUI For?
----------------

XUI provides a CSS base that implements the Xero Pattern Library.

The approach is heavily inspired by Stripe's approach, which is discussed in
this video:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=NHpSmJrEvRQ" target="_blank">
  <img src="http://img.youtube.com/vi/NHpSmJrEvRQ/0.jpg" alt="Thumbnail of Michelle Bu's TXJS 2015 talk" width="480" height="360">
</a>

In the near future we aim to provide JavaScript components that target XUI and
when those components are available developers should prefer those components
over using XUI directly.


Usage Guidelines
----------------

 * Do not create any classes that use the `xui-` namespace outside this project.
   The only exception to this rule is [detailed below](#consuming-future-breaking-changes).
 * Namespace your project's classes appropriately and separately to XUI.
 * Avoid writing your own CSS as much as possible, particularly if your CSS
   overrides XUI's styling. The less custom CSS you have, the easier it will be
   to upgrade to new versions of XUI.
 * In your main application, make sure XUI is loaded or imported before any of
   your other stylesheets.
 * When developing components, import XUI as a devDependency. Do not import XUI,
   or any SCSS file containing shared classes, in any code that your component
   exports. SCSS does not currently dedupe multiple imports of the same code, so
   importing XUI in separate components will at the very least lead to bloated
   files. It may also cause broken styling depending on when the imports occur.
 * If you need XUI's variables and mixins, import them individually:
    * For variables, `@import 'xui/src/sass/vars';`
    * For mixins, `@import 'xui/src/sass/tools/mixins';`
    * Colours are defined in the [colors repository](https://github.dev.xero.com/UXE/colors) - consult its README for information on how to import colour variables.


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
See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.


Help
----

For general Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering)
or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have [a UXE team member on interrupts each week](https://github.dev.xero.com/UXE/Home/wiki/Interrupts-Support-Schedule) who can provide a prompt response to any specific questions or issues.

XUI's [roadmap](https://github.dev.xero.com/UXE/xui/wiki#roadmap) is documented in the project wiki.

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
