
xui
===

[![TC_build_status](https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon)](https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master)

A shared stylesheet for Xero applications that implements the [Xero Pattern Library](https://xero.invisionapp.com/boards/DN2P9HFAUVQP).

For examples see https://github.dev.xero.com/pages/UXE/xui/


Using in Your Project
---------------------

### CDN (Recommended)

Include the following `link` in your page:

```html
<link rel="stylesheet" href="https://edge.xero.com/style/xui/9.3.0/xui.css"/>
```

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

 * Do not create any classes that use the `xui` namespace outside this project.
   Namespace your project's classes appropriately.
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
    * Colours are defined in [colors](https://github.dev.xero.com/UXE/colors) - see that repository for information on how to import those variables.


Contributing to XUI
-------------------

XUI is "internal open source" at Xero, meaning that anyone can contribute to the
library. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to
contribute.


Help
----

For general Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering)
or ask a question with [the topic "xui" on Confluence Questions](https://confluence.inside.xero.com/questions/topics/126091267/xui).

We have [a UXE team member on interrupts each week](https://github.dev.xero.com/UXE/Home/wiki/Interrupts-Support-Schedule) who can provide a prompt response to any specific questions or issues.

XUI's [roadmap](./wiki#roadmap) is documented in the project wiki.

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
