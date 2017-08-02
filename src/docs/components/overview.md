## Installing XUI Components

First configure artifactory by adding the following to .npmrc. More info on Confluence: [Consuming Xero NPM Modules](https://confluence.inside.xero.com/display/FED/Using+Artifactory).

```js
@xero:registry=https://af.inside.xero-support.com/artifactory/api/npm/npm-dev
registry=https://af.inside.xero-support.com/artifactory/api/npm/npm-upstream
```

Then install XUI with npm

```bash
npm install --save @xero/xui
```

This will install all the XUI components into `node_modules/@xero/xui` and keep them all together.

Note that only components imported into your application will be part of your final bundle.

## Using XUI Components

Related components are grouped together in a single entry point to make importing related components easier and aid in the update path.  For example, the `react/button` module will export the exact same modules as the main entry point of the old `xui-button` component.

To import a component, you just need to:
```js
import XUIButton, { XUIButtonCaret } from '@xero/xui/react/button';
import DropDown, { DropDownToggled } from '@xero/xui/react/dropdown';
```

Individual component documentation can be found below the [Getting Started](#getting-started) section.
