# XUI 13

## Component changes
* remove all default values of qaHooks.

### Autocompleter
* input qaHook `${props.qaHook}-input` is now `${props.qaHook}--input`
* list qaHook `${props.qaHook}-list` is now `${props.qaHook}--list`
* conatiner qaHook `${props.qaHook}-conatiner` is now `${props.qaHook}--container`

### XUIAvatar changes
* XUISimpleAvatar component no longer exists and has been merged with XUIAvatar
 - All the same rules applied as they did before.
* qaHook prop added

### Banner
* qaHook for Action, Actions, Message and MessageDetail component added
* test coverage improved
* close button qaHook `${qaHook}-close-button` is now `${qaHook}-close--button`
* XUIBannerAction button qaHook `${qaHook}-button` is now `${qaHook}--button`
* isLink added as a new prop to `XUIBannerAction`

### Button
* qaHook added to Caret and Group components

### Checkbox
* qaHooks added for lable, input and icon components

### Dropdown
* qaHook added for Toggled, Footer and Header components

### Inputs
* qaHook added to input and close component
* container button qaHook `${props.qaHook}-container` is now `${props.qaHook}--container`

### Modal
* qaHook added for Header, Body and Footer components
* close button qaHook `${props.qaHook}-close` is now `${props.qaHook}--close`
* mask qaHook `${props.qaHook}-mask` is now `${props.qaHook}--mask`

### Picklist
* qaHooks added for Picklist, NestedPicklistContainer and PickitemBody component

### Pill
* qaHook for inner pill `deletePillButton-${qaHook}` is now `${qaHook}--delete`
* InnerPill now has qaHook `${qaHook}--inner`

### Switch
* label now has `--label` suffix which wasn't previously present
* input now has `--input` suffix which wasn't previously present

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
