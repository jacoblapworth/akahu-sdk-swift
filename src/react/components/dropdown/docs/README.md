Dropdown React Component
========================
![](https://teamcity.dev.xero.com/app/rest/builds/buildType:id:XeroJS_SharedReactComponents_UxeXuiDropdown/statusIcon)
![](https://img.shields.io/badge/XUI-^10.22.3-blue.svg)
![](https://img.shields.io/badge/React-^15.3.2-blue.svg)

A React UI dropdown based on XUI styles. This component is broken into 4 parts so you can consume which parts best apply to your app/component.


### What's the difference between this component and Select Box?
The select-box component is a replacement for the native select-box. So if you're looking for a simple button with a dropdown
and a few items to add into your dropdown, then select-box is what you need. However, if you're looking to make your own
tweaks here and there or create something that requires some extra customization select-box doesn't support, then dropdown is what you need.


## DropDownListBox Component
A presentational component that will provide you with the XUI styles for a DropDown menu but no functionality.
It takes in Picklist as a dependency which can be found here: https://github.dev.xero.com/UXE/xui-picklist
``
### Properties
`className`: (String, Optional) Adds additional classes to the dropdown menu.

`footer`: (JSX, Optional) An optional prop for displaying the items in the footer.

`header`: (JSX, Optional) An optional prop for displaying a header in narrow viewports.

`footerClass`: (String, Optional) Classes to add to the footer.

`size`: (String, Optional) The size of this dropdown. `small`, `medium`, `large`, or `xlarge`. Default will fit to children's width.

`isHidden`: (Boolean, Optional) False by default.

`style`: (String, Optional) Style attribute on the dropdown node.

`onKeyDown`: (Function, Optional) keydown event handler.

`onCloseAnimationEnd`: (Function, Optional) Callback for when animation has ended on close.

`fixedWidth`: (Boolean, Optional) Whether the fixed width class variant should be used.

## Dropdown
The dropdown wraps the DropDownListBox and a [StatefulPicklist](https://github.dev.xero.com/UXE/xui-picklist/blob/master/README.md)
to give you a complete dropdown component and make sure that both have the functionality they need to be integrated with
the DropDownToggled.

### Properties
Same as DropDownListBox and extras include

`onSelect`: (Function, Optional) Callback when an item is selected/clicked

`id`: (String, Optional) id of the Dropdown. A Guid will be generated if none is provided since this is required for
accessibility features.

`hasKeyboardEvents`: (Boolean, Optional) Defaulted to true, this means you will get the keyboard handlers for free
but the dropdown will steal focus when it's opened. Without this you would need to manually add the keyboard event
handlers to manage the menu item navigation.

`ignoreKeyboardEvents`: (Array.<Number>, Optional) KeyCodes that should be ignored by the keydown handlers.

`onHighlightChange`: (Function, Optional) Callback to be executed when the highlighted element of the dropdown changes.

`onCloseAnimationEnd`: (Function, Optional) Callback to fire when animation has ended on a closing dropdown.

`disableScrollLocking`: (Boolean, Optional) False by default, setting to true will disable scroll locking behavior.

`header`: (Element, Optional) The header element.

`footer`: (Element, Optional) The footer element.

`onKeyDown`: (Function, Optional) Callback to provide additional onKeyDown functionality.

`restrictFocus`: (Boolean, default=`true`) Whether focus should be limited to the dropdown while it's open.

## NestedDropDown
An extension of `Dropdown` to be used when nested options are required. It can contain multiple instances of `DropDownPanel`, and uses the `panelName` and `parentPanel` props to switch between them.

Props are the same as `Dropdown` with the addition of the following:

`onPanelChange`: (Function) Callback for when the open DropDownPanel changes. Receives the name of the selected panel, and the previously selected panel.

`onPanelSelect`: (Function) Callback to trigger opening of another panel. Takes destination panel name as a parameter.

`headingAttributes`: (Object) Additional attributes to be passed down to the header (see `DropDownHeader` props).

## DropDownHeader
Header component to ble used within `DropDown`. By default it's only shown for mobile views.

`Title`: (String) Used as the heading text.
title: PropTypes.string.isRequired,

`onPrimaryButtonClick`: (Function, Optional) Callback for when the primary button is clicked.

`primaryButtonContent`: ([String, Node, Object], default='Apply') Content to render within the primary button.

`displayPrimaryButton`: (Boolean, default=`true`) Whether to display the primary button.

`isPrimaryButtonDisabled`: (Boolean, Optional) Whether the primary button is disabled */
isPrimaryButtonDisabled: PropTypes.bool,

`onSecondaryButtonClick` (Function, Required) Callback for when the secondary button is clicked.

`secondaryButtonContent`: ([String, Node, Object], default='Cancel') Content to render within the secondary button.

`onBackButtonClick`: (Function, Optional) Callback for when the back button is pressed (back button will not be rendered if this is not provided).

`onlyShowForMobile`: (Boolean, default=`true`) Whether the header should only be shown at mobile sizes.

## DropDownPanel
The component which wraps the contents of a dropdown. Automatically wraps the contents in a `StatefulPicklist` if any of the children are of type `Picklist`.

`panelName`: (String) Used by NestedDropDown to identify each panel.

`panelHeading`: (String, Optional) Used by NestedDropDown to populate the DropDownHeader content.

`isHidden`: (Boolean, Optional) Whether the panel is hidden.

`ignoreKeyboardEvents`: (Array.<Number>, Optional) Pass in an array of keydown keycodes to be ignored from dropdown behaviour.

`onSelect`: (Function, Optional) A generalised callback when an item has been selected.

`onHighlightChange`: (Function, Optional) Callback for when the highlighted item in the dropdown changes.

## DropDownToggled
This Higher Order Component will wrap in the passed in Dropdown so it can be toggled open and closed from the trigger.
You can wrap any of the above components including the DropDownListBox presentational component based on what you need.
Although we recommended using the DropDown component for the full functionality where ever possible.

Here is an example implementation into a containing component:

```js
import React from 'react';
import XUIIcon from 'xui-icon';
import XUIButton from 'xui-button';
import DropDown, { DropDownToggled } from 'dropdown';
import Picklist, { Pickitem } from 'xui-picklist';

export class Container extends React.Component {
  click(){
  }

  render(){
    const trigger = (
      <XUIButton buttonType="button" onClick={this.click}>
        Trigger Button <XUIIcon icon='caret' className='xui-icon-inline' />
      </XUIButton>
    );

    const dropdown = (
      <DropDown>
        <Picklist>
          <Pickitem id="1">
              Im the whole shabang!
          </Pickitem>
          <Pickitem id="2">
              Earnings from Busking
          </Pickitem>
          <Pickitem id="3">
              Costs
          </Pickitem>
          <Pickitem id="4">
              Unnecessary Costs
          </Pickitem>
          <Pickitem id="5">
              Absolutely Necessary Costs
          </Pickitem>
        </Picklist>
      </DropDown>
    );

    return (
      <DropDownToggled
        trigger={trigger}
        dropdown={dropdown}
      />
    );
  }
}

 ```

#### Properties for DropDownToggled
`isHidden`: (Boolean, Optional) Whether the dropdown is hidden on initial render.

`onOpen` : (Function, Optional) A callback function called when the dropdown renders open.

`onClose` : (Function, Optional) Another optional callback function called when the dropdown is rendered closed.

`className`: (String, Optional) String of class names to apply to the wrapper.

`trigger`: (Element, Required) The element which will trigger the dropdown to open/close.

`dropdown`: (Element, Required) The actual dropdown list which will be toggled.

`closeOnSelect`: (Boolean, Optional) Whether or not the dropdown should be automatically hidden when the user selects
something.  Defaults to true, but if you have a multi-select dropdown, setting this to false makes sense.

`restrictToViewPort`: (Boolean, Optional) Whether or not we should set a maxHeight on the dropdown to restrict it to the
window. (Default `true`).

`disableScrollLocking`: (Boolean, default=`true`) Whether scroll locking behaviour should be disabled.

`onCloseAnimationEnd`: (Function, Optional) Function to be called once the closing animation has finished.

#### Trigger Component
The trigger component can really be anything, but it has a few requirements.  The following props must
be allowed by the trigger component and passed through to the clickable element:

**Event Handlers**
We have to ensure that the dropdown will open/close per user actions, so there are some event handlers
that have to be output in the DOM. You can specify your own and we'll compose it with ours.

`onClick`: A click handler so that we can open/close the dropdown.

`onKeyDown`: A keydown handler so that we can open the dropdown when the down arrow is pressed.

**ARIA attributes:**
These are necessary to implement proper accessibility on the component.  You don't need to specify your own,
we provide proper values for these, but you do need to make sure they actually get output in the DOM.

`aria-hasPopup`: Tells the browser that this element triggers a popup.

`aria-controls`: Tells the browser exactly which popup this trigger controls.

`aria-activeDescendant`: Tells the browser exactly which element in the dropdown is selected.

## Installation & Getting Started
Install via bower with the following command
```bash
bower install --save git@github.dev.xero.com:ReactLabs/dropdown.git
```

Once everything installed simply run
```bash
npm install && npm run build
```

Unit tests are run via
```bash
npm run test
```

And you can have a look at the test page by running
```bash
npm run test-ui
```
then navigating to "file://<path-to-source-on-disk>/test/ui/index.html"

## Testing
simple run `npm run test` to run these UI tests using Enzyme, Karma and Mocha.

## Component Dependencies

#### XUI Picklist
https://github.dev.xero.com/UXE/xui-picklist

Provides the styling and behaviour for navigating and displaying the items inside the dropdown. It does not
include the wrapping styles or the toggling behaviour. Please note that `<MenuGroup />` has been deprecated in favour of this component.

#### Positioning
https://github.dev.xero.com/ReactLabs/Positioning

Controls where the dropdown should appear in relation to its trigger. A default of down and left is applied
unless there is no space in the viewport to display the dropdown in this way. For more information on this please review
the README for this component at the link above.

#### XUI Button
https://github.dev.xero.com/UXE/xui-button

Used in the DropdownToggled component as the built in trigger and in the test-ui examples.

### Troubleshooting
*Use inside XUIModal*
When DropDown is used inside XUIModal, by default the dropdown will not be visible when triggered. This is due to an existing limitation with XUI's z-indexing. Dropdown provides a CSS class `dropdown-zindex-override` that should be used when instancing a DropDown inside XUIModal eg `<Dropdown className="dropdown-zindex-override"> ... </DropDown>`. This shortcoming will be addressed in a future version of XUI.

*Scroll Locking*
For free, scroll locking is managed within the dropdown so a responsive dropdown will lock the scroll retaining the position of the page. This is the same behaviour for modals, however having modals and dropdown's in tangent causes some issues of when to lock and unlock the scroll. When you're using a dropdown and modal in conjunction it's recommended you manage the scroll locking in you application. The methods are exposed on the `<DropDown />` component or your free to write your own. To opt out of the scroll locking behavior mark the `disableScrollLocking` prop to true.
