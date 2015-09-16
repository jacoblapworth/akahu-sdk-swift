# xui

<a href="https://teamcity.dev.xero.com/viewType.html?buildTypeId=Xui_Style_Master"><img src="https://teamcity.dev.xero.com/app/rest/builds/buildType:(id:Xui_Style_Master)/statusIcon"></a>

A shared stylesheet for Xero applications that implements [Xero Pattern Library](https://xero.invisionapp.com/boards/DN2P9HFAUVQP).

For examples see https://github.dev.xero.com/pages/Style/xui/

## Using in Your Project

### CDN (Recommended)

Include the following `link` in your page:

```html
<link rel="stylesheet" href="https://xero-rd-edge.s3-us-west-2.amazonaws.com/style/xui/3.1.0/xui.css"/>
```

### Bower
```bash
$ bower install git@github.dev.xero.com:Style/xui.git --save
```

You will need to compile `xui.scss`.

### Usage Guidelines

Do not create any classes that use the `xui` namespace outside this project.

## Contributing to XUI

Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

## Help

For Q & A ask a question in the [UX Engineering flow](https://www.flowdock.com/app/xero/ux-engineering).

You may also want to subscribe to the [UX Engineering Newsletter](http://xero.us11.list-manage1.com/subscribe?u=b6eb05e31e28aab10df3721c6&id=5c27a93854).
