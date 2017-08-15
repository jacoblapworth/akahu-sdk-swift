## XUI 12

## Breaking changes

### Buttons
* `xui-button` has `position: relative` by default. This is to enable buttons to have a z-index value when focused.
This is to ensure correct styling when placed next to inputs in a grouped input context.

### Avatars
* `xui-avatar-group` has been removed. Use `xui-avatargroup` instead.

### Radios and Checkboxes
* Native checkbox and radio styling classes have been removed. Use styled checkboxes and radios instead.
The following classes are no longer available:
 * `xui-checkbox`
 * `xui-radio`
 * `xui-checkbox-layout`
 * `xui-radio-layout`
 * `xui-checkboxgroup`
 * `xui-radiogroup`

### Utilities
* `xui-u-flex-row` has been removed. Use `xui-u-flex-verticallycentered` instead.
* `xui-u-flex-col` has been removed. Use `xui-u-flex-horizontal` instead.
* `xui-u-flex-verticalalign-center` has been removed. Use `xui-u-flex-vertical` and `xui-u-flex-horizontallycentered` instead.
* `xui-button-link` has been removed. Use `xui-button-borderless-main` instead.
* Margin and padding classes are now considered trumps (utilities), meaning they are included at the bottom of XUI's CSS file. Previously, it
was possible for margin and padding classes to be undone by others (e.g. `xui-panel--section`) specified further down 
the CSS file.
* `xui-margin-none` no longer has `!important`
* `xui-padding-none` no longer has `!important`
* `xui-margin-auto-($1)` classes have been removed. Use `xui-margin-($1)-auto` instead.

### Toggles
* `xui-toggle-form`, `xui-toggle-standard` and `xui-toggle-icon-layout` have been removed. They are no longer necessary to achieve the desired look.

### Dropdowns

* `xui-dropdownmenu`, `xui-dropdownmenu-layout`, `xui-dropdownmenu-small`, `xui-dropdownmenu-medium`, `xui-dropdownmenu-large`,
`xui-dropdownmenu-is-closed`, `xui-dropdownmenu--body`, `xui-dropdownmenu--footer`, `xui-dropdownmenu--groupheading`,
`xui-dropdownmenu--groupheading-layout`, `xui-menugroup`, `xui-menuitem`, `xui-menuitem-layout`, `xui-menuitem--body`,
`xui-menuitem--input`, and `xui-menuitem-is-selected` have been removed. 
These are all succeeded by the `xui-dropdown` and `xui-picklist` component classes.

### Mixins

The following mixins have been removed:

### Variables

The following variables have been removed:

#### Motion

* `$xui-transition-duration-short`; use `$xui-motion-speed-fast` instead
* `$xui-transition-duration-medium`; use `$xui-motion-speed-medium` instead
* `$xui-transition-duration-long`; use `$xui-motion-speed-slow` instead

#### Colors

* `$xui-color-highlight-light`
* `$xui-color-highlight-medium`
* `$xui-color-highlight-strong`
* `$xui-color-highlight-inverted-light`
* `$xui-color-highlight-inverted-medium`
* `$xui-color-highlight-inverted-strong`
* `$xui-color-primary-text`
* `$xui-color-tooltip`
* `$xui-color-secondary-text`
* `$xui-color-reversed-text`
* `$xui-color-disabled`
* `$xui-color-disabled-text`
* `$xui-color-placeholder`
* `$xui-color-border`
* `$xui-color-divider`
* `$xui-color-background`
* `$xui-color-hover`
* `$xui-color-icon`
* `$xui-color-icon-inverted`
* `$xui-color-form`
* `$xui-color-panel`
* `$xui-color-shadow-light`
* `$xui-color-shadow-medium`
* `$xui-color-shadow-strong`
* `$xui-shadow-depth-1`
* `$xui-shadow-depth-1-upward`
* `$xui-shadow-depth-2`
* `$xui-shadow-depth-3`
* `$xui-color-overflow-shadow`
* `$xui-color-overflow-shadow-grey`
* `$xui-shadow-panel`
* `$xui-shadow-banners`
* `$xui-shadow-dropdown`
* `$xui-shadow-popovers`
* `$xui-shadow-toasts`
* `$xui-shadow-modal`
* `$xui-divider-standard`
* `$xui-border-transparent`
* `$xui-border-is-selected`
* `$xui-color-tab-pagenav`
* `$xui-color-tab-focus`
* `$xui-color-tab-active`
* `$xui-color-xero-blue-divider`
* `$xui-color-xero-green-divider`
* `$xui-color-xero-red-divider`
* `$xui-color-toast-link`

#### Typography

* `$xui-font-size-heading`; use `$xui-font-size-extended-xlarge` instead
* `$xui-font-size-page-title`; use `$xui-font-size-extended-large` instead
* `$xui-font-size-section-title`; use `$xui-font-size-medium` instead
* `$xui-font-size-text`; use `$xui-font-size-small` instead
* `$xui-font-size-text-mobile`; use `$xui-font-size-extended-small` instead
* `$xui-font-size-heading-small`; use `$xui-font-size-xsmall` instead
* `$xui-font-size-regular`; use `$xui-font-size-small` instead
