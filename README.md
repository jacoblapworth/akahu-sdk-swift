XUI
===

[![TC_build_status](https://teamcity1.inside.xero-support.com/app/rest/builds/buildType:id:Xui_Style_Master/statusIcon)](https://teamcity1.inside.xero-support.com/viewType.html?buildTypeId=Xui_Style_Master)
![](https://github.dev.xero.com/pages/UXE/Home/interrupt.svg)

### Always get the latest versions here:
* XUI Guide: https://github.dev.xero.com/pages/UXE/xui/
* XUI on GitHub: https://github.dev.xero.com/UXE/xui

Using in Your Project
---------------------

### CSS

#### CDN (Recommended)

Include the following `link` in your page:

<!--?prettify lang=html?-->
```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/11.1.0/xui.min.css"/>
```

#### Sherlock

You can use [Sherlock](https://github.dev.xero.com/Xero/Sherlock) to pull in the latest version of XUI for a given semver range.
A Sherlock manifest is available at `https://edge.xero.com/style/xui/sherlock.json`.

### Components

### npm

First configure artifactory by adding the following to .npmrc. More info on Confluence: [Consuming Xero NPM Modules](https://confluence.inside.xero.com/display/FED/Using+Artifactory).

<!--?prettify?-->
```js
@xero:registry=https://af.inside.xero-support.com/artifactory/api/npm/npm-dev
registry=https://af.inside.xero-support.com/artifactory/api/npm/npm-upstream
```

Then install XUI with npm

<!--?prettify?-->
```bash
npm install --save @xero/xui
```

This will install all the XUI components into `node_modules/@xero/xui` and keep them all together.

Note that only components imported into your application will be part of your final bundle.

What is XUI For?
----------------

XUI provides CSS and React components for implementing user interfaces at Xero.

Example Page Markup
-------------------
<!--?prettify lang=html?-->
```html
<!DOCTYPE html>
<html class="xui-html" lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Page Title</title>
    <link href="https://edge.xero.com/style/xui/11.1.0/xui.min.css" rel="stylesheet" />
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
   styling and line height.
   The `xui-html` class sets the height of the `html` element to 100%, and
   the body element with `xui-body` directly under it.
 * For pages with legacy CSS that are unable to use `xui-body`, wrap XUI components in a container
   which has the `xui-container` class applied. This sets properties that XUI relies on,
   such as `box-sizing: border-box`, its default line-height, fonts, etc.
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
  * For variables, `@import '@xero/xui/sass/vars';`
  * For mixins, `@import '@xero/xui/sass/mixins';`

We do not recommend importing any other files as they are not considered a part of XUI's public API; they might move around between patch and minor versions, which could end up breaking your project.

Updating
--------

XUI follows [semantic versioning](http://semver.org). You should be able to update patch and minor versions without
requiring any changes to your code.

The [#platform-fed-releases](https://xero.slack.com/messages/C57H6G0RM) Slack lists updates and upgrades when they become available.

Upgrading
---------

Major releases with breaking changes may be made at a maximum every 90 days in accordance with our [Software Lovability Objectives](https://confluence.inside.xero.com/display/FED/The+UX+Engineering+Team+and+XUI#TheUXEngineeringTeamandXUI-SoftwareLovabilityObjectives).

Release notes will be provided in the [releases](https://github.dev.xero.com/UXE/xui/releases) section of the repo to enable you to upgrade as seamlessly as possible.

Consuming Future Breaking Changes
---------------------------------

If you find yourself needing XUI CSS before it's released, you have two options:
* Implement the required changes to the `xui-` classes as part of your app code
 * If you do this, take care to ensure that these XUI classes are loaded first before the rest of your CSS so that it simulates what will happen when you upgrade XUI
* Create an app-specific class for the element you're targeting which will override XUI styling
 * These app-specific classes should be treated as tech debt and should not linger in the relevant JS/HTML after upgrading.

Regardless of the approach you choose, make sure you do the following:

* Document! Explain the reason for the overrides and add a TODO to remove it with the expected version of XUI containing the change you want. You could also create an issue in your Github repo or a JIRA ticket.
* When upgrading, check to see that the change you wanted is still there - it may have changed! Then remove your custom code and verify that it works with the version of XUI you are upgrading to.

Contributing to XUI
-------------------

XUI is "internal open source" at Xero, meaning that we welcome contributions from anyone.
See [CONTRIBUTING.md](https://github.dev.xero.com/UXE/xui/blob/master/CONTRIBUTING.md) for details on how to contribute.

Documentation style guide
-------------------------

Our documentation writing style is based on [the Financial Times Origami documentation style guide](https://github.com/Financial-Times/ft-origami/blob/gh-pages/README.md#origami). It exists as guidance to help keep our documentation consistent.

1. Be conversational
	* Use contractions: "we're" over "we are"
	* Starting sentences with conjunctions like 'but' or 'so' is allowed
1. Prefer "we" to "I"
	* **good**: "we recommend you do X"
	* **bad**: "I recommend you do X"
1. Use the active voice. If you need help with this one, use [http://www.hemingwayapp.com/](http://www.hemingwayapp.com/)
	* **good**: "we recommend you do X"
	* **bad**: "it is recommended you do X"
1. Omit fluff. Avoid qualifiers like "pretty", "mostly", "probably"
1. Prefer short sentences to long sentences
1. Use British English
	* **good**: organise, favour
	* **bad**: organize, favor
1. Avoid metaphors or turns of phrase that non-native English speakers may not be familiar with
	* **good**: "this site has everything you need to know"
	* **bad**: "this site is a one stop shop for XUI"
1. [Avoid "simply" and other words that trivialise concepts and ideas that might not be trivial](https://css-tricks.com/words-avoid-educational-writing/)
1. When referring to XUI React components; use back-ticks, correct capitalisation, and no spaces
	* **good**: `XUIButton`, `DropDown`
	* **bad**: `XUI Button`, DropDown
1. Structure documentation for skim readers
	* Code variables go in `back-ticks`
	* Use tables
	* Use asides for extra tidbits
	* Use **strong** and _emphasis_ where appropriate
	* Use lists
	* Break things up with informative headings
1. Always capitalise XUI when referring to the product
1. Never capitalise modules
	* **good**: avatar, button
	* **bad**: Avatar, Button

Help
----

For general Q & A ask a question in the [#platform-fed-xui](https://xero.slack.com/messages/C565NP1A5) Slack or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have [a UXE team member on interrupts each week](https://github.dev.xero.com/UXE/Home/wiki/Interrupts-Support-Schedule) who can provide a prompt response to any specific questions or issues.

XUI's Roadmap and backlog live within the [UX Engineering teams's page](https://confluence.inside.xero.com/display/PLAT/UX+Engineering) on Confluence.
