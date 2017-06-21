# XUI React Components

In the past, React components were all located in their own git repositories and installed via bower.  However, some things have changed that make bring XUI CSS and components together much more desirable.

The two primary factors are around release cadence and interdependency between components. Release autonomy between XUI and components has been great as we built out the base css library and initial suite of components. However recently it has made it increasingly hard to introduce changes to components that are used heavily by other components (think icon & button).

Also the wider FED community has gone all in on an npm/yarn based package management and the effortt to maintain a bower compatibility layer has been increasing in cost.

Because of this, we have moved all the React components here into the XUI repository.  This will enable us to improve consistency, testability, and release cadence.  All components will now version together and be released simultaneously as a single artifact in Artifactory.

## Installing

Make sure you've followed the instructions for [Consuming Xero NPM Modules](https://confluence.inside.xero.com/display/FED/Using+Artifactory).  You can then run
```bash
npm install --save @xero/xui
```

## Usage

All XUI component are available once `@xero/xui` has been installed.  However, build tools like Webpack should only include components that you import (and their dependencies) in your final build artifact.

Related components are grouped together in a single point to make importing related components easier and aid in the update path.  For example, the `react/button` module will export the exact same modules as the main entry point of the old `xui-button` component.

To import a component, you just need to:
```js
import XUIButton, { XUIButtonCaret } from '@xero/xui/react/button';
import DropDown, { DropDownToggled } from '@xero/xui/react/dropdown';
```

## Upgrading from bower components

XUI is now an NPM only module.  The costs of maintaining both an NPM and bower version of the library would be too high.  However, we also know that plenty of projects still depend on the old bower components.  Don't worry, those components aren't going away.  The repositories will remain in their current state.  However, all new development will occur in this repository.

Upgrading will require the following steps:
- Follow the installation instructions above.
- Do a find/replace in your code base to import the new components.  `import ... from 'xui-button'` should be replaced with `import ... from '@xero/xui/react/button'`, `import ... from 'xui-toast'` should be replaced with `import ... from '@xero/xui/react/toast'`, and so on.
- Remove all the components from your bower.json dependencies.

### React Labs

With the exception of DropDown, Datepicker and Positioning which have been moved into XUI all other components in React Labs will need to be individually updated to support install via NPM and published to Artifactory. Instructions in confluence [Using Artifactory - Publishing NPM Modules](https://confluence.inside.xero.com/display/FED/Using+Artifactory). This is the responsibility of component maintainers. In the meantime they will still work via Bower.

### Component upgrades

When creating this monorepo, we moved over the latest version of all components.  If you were not using the latest version of components, then you will need to upgrade.  Please refer to any migration guides in the existing individual component bower repositories.

### Using old bower components along side monorepo components

If you can't upgrade all the components at once, it is possible to use the bower components along side the new monorepo.  While this isn't recommended, it should still be possible until you can get the time to update to the latest version of our components.  The code will continue to work and components in the monorepo only depend on other monorepo components, so there won't be any conflicts.  However, it does mean that there's a possibility of having two different kinds of button (or whatever) on the page.  Unfortuanately, you will also be installing two copies of React (one for the bower components, one for npm).  Make sure your Webpack config is set up with an [alias](https://webpack.js.org/configuration/resolve/#resolve-alias) so that everything uses the same copy of React.  Including two copies on the page will not work.
