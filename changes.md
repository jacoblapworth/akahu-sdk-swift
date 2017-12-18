# XUI 13

## Component changes
* remove all default values of qaHooks.

### Autocompleter
* input qaHook `${props.qaHook}-input` is now `${props.qaHook}--input`
* list qaHook `${props.qaHook}-list` is now `${props.qaHook}--list`
* container qaHook `${props.qaHook}-conatiner` is now `${props.qaHook}--container`
* dropdown now has a qaHook of `${props.qaHook}--dropdown`
* id prop now sits on the root and `dropdownId` is a new prop added that is passed to the dropdown.
* EmptyState now has a `className` prop
* EmptyState `path` prop is now `iconPath`

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
* qaHook added for Layout, Panel Body, Toggled, Footer and Header components
* new prop `maxHeight` for `<DropDownToggled />` to let you set a max height given enough space.

### Inputs
* qaHook added to input and close component
* container button qaHook `${props.qaHook}-container` is now `${props.qaHook}--container`

### Modal
* qaHook added for Header, Body and Footer components
* close button qaHook `${props.qaHook}-close` is now `${props.qaHook}--close`
* mask qaHook `${props.qaHook}-mask` is now `${props.qaHook}--mask`

### Picklist
* qaHooks added for Picklist, NestedPicklistContainer and PickitemBody component
* Pickitem now has an automationid of `${qaHook}--body` applied to the body component
* PickitemBody has the `--child` removed fomr the `a` or `button` elements as they were unecessary

### Pill
* qaHook for inner pill `deletePillButton-${qaHook}` is now `${qaHook}--delete`
* InnerPill now has qaHook `${qaHook}--inner`

### SelectBox
* new prop `ariaId` so we can overrite the id used. Mainly for snapshot testing.
* now has label, dropdownToggled, inputGroup and buttonIcon qaHook added

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
* Pill - `hasLayout` is now `defaultLayout`

### New Components
#### Rollover Checkbox
* Taken from xui-layout, it's a simple stateful component that will show a checkbox on mouse over and alternate component thats provided when mouse is not over the hit target. These alternate components will commonly be images or avatars.


## CSS changes

* `xui-page-width-standard` and `xui-page-width-large` no longer have a clearfix applied with `::after`. This provides
better behaviour when using `xui-u-flex-space-between` alongside `xui-page-width-*` classes.
* Typography classes are included later in the CSS than before. This allows typography classes to be used more effectively
as overrides

### CSS properties changed

### Classes removed

### Classes renamed

### Variables removed

## Dependency changes

## For contributors
* The repo now requires GIT LFS. You will need to install GIT LFS to be able to commit to the repository.

* Pre-commit changes: Now on commit (assuming you have it setup correctly and are using it) the following tasks will run. `lint`, `test:coverage` and `test:visual`
	* You will need to have GITLFS installed and setup correctly
	* You will need to have built the XUI repo before you can run visual tests. (requires `./dist/xui.css`) (requires storybook)

### Husky
* Added [Husky](https://www.npmjs.com/package/husky) which allows us to define Git Hooks as NPM scripts
