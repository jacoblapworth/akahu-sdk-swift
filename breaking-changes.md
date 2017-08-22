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

### Filters

* `xui-sidebarfilter`, `xui-sidebarfilter-is-selected`, `xui-sidebarfilter--body`, `xui-sidebarfilter--control`,
`xui-sidebarfilters`, `xui-sidebarfilters-multiple` ,`xui-sidebarsummary`, and `xui-sidebarsummary--control` have all been removed.
Use picklists instead.

### Icons
* `xui-icon-svg` has been removed. Use `xui-iconsymbol` instead.
* `xui-newicon` has been removed. This never ended up being used.
* `xui-icon-rotate-90` has been removed. Use `xui-u-rotate-90` instead.
* `xui-icon-rotate-180` has been removed. Use `xui-u-rotate-180` instead.
* `xui-icon-rotate-270` has been removed. Use `xui-u-rotate-270` instead.

### Toasts
* `xui-toast-negative`, `xui-toast-positive`, and `xui-toast-list` have been removed.
* `xui-toast-wrapper` has been removed. Use `xui-toastwrapper` instead.
* `xui-toast--link` has been removed. Use `xui-button-borderless-main xui-button-small` instead.

### Datepicker
* `xui-datepicker--weekday-container` has been removed. Use `xui-datepicker--weekdaywrapper` instead.
* `xui-datepicker--othermonth` has been removed. Use `xui-datepicker--day-is-othermonth` instead.

### Pills
* `xui-pill-*` has been removed (old pills), and `xui-newpill-*` has been renamed to `xui-pill`

### Inputs
* `xui-input-group` has ben removed. Use `xui-inputgroup` instead.
* `xui-input-wrapper` has been removed. Use `xui-inputwrapper` instead.
* `xui-input-wrapper-borderless` has been removed. Use `xui-inputwrapper-borderless` instead.
* `xui-input-wrapper-borderless-layout` has been removed. Use `xui-inputwrapper-borderless-layout` instead.
* `xui-input-borderless-layout`, `xui-input-wrapper-borderless-layout` and `xui-inputwrapper-borderless-layout` have been removed.
There are no replacements for these; use the standard borderless classes.
* `xui-textarea` has been removed. Use `xui-input` on `<textarea>` elements instead.
* `xui-select--button-is-selected` has been removed and should no longer be used.

### Page Heading
* `xui-pageheading-has-tabs` has been removed as it is no longer necessary.

### Tabs
* `xui-tabgroup-vertical`,`xui-tabgroup-vertical-layout`, `xui-verticaltab` `xui-verticaltab--body` and
`xui-verticaltab-is-selected` have been removed. Use picklists instead.

### Toggles
* `xui-toggle-form`, `xui-toggle-standard` and `xui-toggle-icon-layout` have been removed. They are no longer necessary to achieve the desired look.

### Dropdowns

* `xui-dropdownmenu`, `xui-dropdownmenu-layout`, `xui-dropdownmenu-small`, `xui-dropdownmenu-medium`, `xui-dropdownmenu-large`,
`xui-dropdownmenu-is-closed`, `xui-dropdownmenu--body`, `xui-dropdownmenu--footer`, `xui-dropdownmenu--groupheading`,
`xui-dropdownmenu--groupheading-layout`, `xui-menugroup`, `xui-menuitem`, `xui-menuitem-layout`, `xui-menuitem--body`,
`xui-menuitem--input`, and `xui-menuitem-is-selected` have been removed.
These are all succeeded by the `xui-dropdown` and `xui-picklist` component classes.

### Typography
* `xui-heading-mini` has been removed. Use `xui-text-minor` instead.
* `xui-caret` has been removed. Use the SVG caret icon instead.
* `xui-heading` has been removed. Use `xui-heading-large` instead.
* `xui-page-title` has been removed. Use `xui-heading` instead.
* `xui-section-title` has been removed. Use `xui-heading-small` instead.
* `xui-text-panelheading` has been removed. Use `xui-heading` instead.
* `xui-text-sectionheading` has been removed. Use `xui-heading-small` instead.
* `xui-panel-title` has been removed. Use `xui-heading-title` instead.
* `xui-modal-title` has been removed. Use `xui-heading-modal` instead.
* `xui-item-title` has been removed. Use `xui-heading-item` instead.
* `xui-separator-title` has been removed. Use `xui-heading-separator` instead.
* `xui-heading-medium` has been removed. Use `xui-heading` instead.
* `xui-heading-display` has been removed. Use `xui-heading-xlarge` instead.
* `xui-heading-display-xl` has been removed. Use `xui-heading-xxlarge` instead.
* `xui-heading-display-xxl` has been removed. Use `xui-heading-xxxlarge` instead.

### Popover
* `xui-popover--body`, `xui-popover--header`, `xui-popover--header-standard`, `xui-popover--header-can-scroll-up`,
`xui-popover--heading`, `xui-popover--footer`, `xui-popover--footer-standard`, `xui-popover--footer-can-scroll-down`,
and `xui-popover--link` have been removed. These classes were not documented and there is no replacement for them.

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
* `xui-margin-auto-*` classes have been removed. Use `xui-margin-*-auto` instead.

### Motion
* `xui-u-transition-short` has been removed. Use `xui-transition-speed-fast` instead.
* `xui-u-transition-medium` has been removed. Use `xui-transition-speed-medium` instead.
* `xui-u-transition-long` has been removed. Use `xui-transition-speed-slow` instead.

#### Animation keyframes
* `xui-animation-show` and `xui-animation-hide` have been removed.
* `xui-animation-slideup` and `xui-animation-slidedown` have been removed.
* `xui-animation-fadein` and `xui-animation-fadeout` have been removed. Use `xui-transition-fadein` and `xui-transition-fadeout` classes instead.

### Mixins

The following mixins have been removed:

* `xui-navigation-filters-hide-control`
* `xui-navigation-filters-collapse-list`
* `xui-navigation-filters-expand-list`
* `xui-bold`

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
