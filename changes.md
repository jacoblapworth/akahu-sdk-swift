# XUI 13

## Component changes
* remove all default values of qaHooks.

### XUIAvatar changes
* XUISimpleAvatar component no longer exists and has been merged with XUIAvatar
 - All the same rules applied as they did before.
* qaHook prop added

### Banner
* qaHook for Action, Actions and Message component added

### Button
* qaHook added to Caret and Group components

### Dropdown
* qaHook added for Toggled, Footer and Header components

### Inputs
* qaHook added to input component

### Modal
* qaHook added for Header, Body and Footer components

### Picklist
* qaHook added for Picklist component

### Toast
* qaHook added for Action, Actions and Message components

### Props Renamed
* Icon - `inline` is now `isInline`
* Pickitem - `multiselect` is now `isMultiselect`
* PickitemBody - `multiselect` is now `isMultiselect`
* NestedPicklistContainer - `open` is now `isOpen`
* Modal - `isHidden` is now `isOpen`
* Checkbox - `defaultChecked` is now `isDefaultChecked`
* Radio - `defaultChecked`	is now `isDefaultChecked`
* Switch - `checked` is now `isChecked`, `disabled` is now `isDisabled`
* Textarea - `manualResize` is now `isResizable`
* Positioning - `gap` is now `triggerDropdownGap`
             - `renderHidden` is now `isVisible`
             - `gutter` is now `viewportGutter`
             - `matchTriggerWidth` is now `isTriggerWidthMatched`
             - `forceDesktop` is now `isNotResponsive`
             - `setMaxHeight` is now `shouldRestrictMaxHeight`

### New Components

## CSS changes

* `xui-page-width-standard` and `xui-page-width-large` no longer have a clearfix applied with `::after`. This provides
better behaviour when using `xui-u-flex-space-between` alongside `xui-page-width-*` classes.

### CSS properties changed

### Classes removed

### Classes renamed

### Variables removed

## Dependency changes

