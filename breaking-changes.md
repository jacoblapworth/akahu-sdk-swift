# XUI 12

## Component changes

* `Autocompleter` exported by autocompleter is now `XUIAutocompleter`
* `AutocompleterInput` exported by autocompleter is now `XUIAutocompleterInput`
* `EmptyState` exported by autocompleter is now `XUIAutocompleterEmptyState`
* `SecondarySearch` exported by autocompleter is now `XUIAutocompleterSecondarySearch`
* `Autocompleter` exposes `onHighlightChange` prop mapped from the underlying `Dropdown`
* `XUIButton` now supports the inverted variant. Also now supports retaining layout when used with loaders. Also now supports adding a min-width, useful for small buttons that use loaders
* `Toast` now limits toast actions to a max of 2.
* `Avatar` sizing support to cover xsmall all the way up to 2xlarge.
* `Loader` now supports the inverted variant.

### New Components
* `XUITag` is now added as a simple, stateless component.

## CSS changes

### CSS properties changed

#### Radios & Checkboxes
* Styled checkboxes and radios no longer use `input` and `svg` element selectors. The hidden underlying input element
must have the `xui-styledcheckboxradio--input` class and any accompanying SVGs must have the `xui-icon` class.

#### Buttons
* `xui-button` has `position: relative` by default. This is to enable buttons to have a z-index value when focused.
This is to ensure correct styling when placed next to inputs in a grouped input context.
* `xui-button-min-loader-width` class added to allow <small>small</small> buttons with loaders to maintain an even width during state changes.

#### Pills
* Single select pills have been changed to use the same DOM structure as regular pills, and are now absolutely positioned to ensure they fit within a standard input
* `xui-pill--secondary` line height has been added to fix vertical text alignment when placed alongside `xui-pill--text`.
* `xui-pill--text` line height has been added to fix vertical text alignment when placed alongside `xui-pill--secondary`.
* `xui-pill--secondary` now has a default grey color and line-height, instead of relying on utility classes.
* `xui-pill--link` has been added, use this to clear outlines on anchors, and use `xui-pill-is-focused` to indicate focus instead.
* `xui-pill--button` text align has been set to left, to support use inside `xui-input`.
* `xui-pill--content` white text color has been moved to `xui-pill--text` and `xui-pill--secondary` when invalid.

#### Utilities
* Margin and padding classes are now considered trumps (utilities), meaning they are included at the bottom of
XUI's CSS file. Previously, it was possible for margin and padding classes to be undone by others
(e.g. `xui-panel--section`) specified further down the CSS file.
* `xui-margin-none` no longer has `!important`
* `xui-padding-none` no longer has `!important`

#### Modals
* Dark modals have been deprecated. Use a regular modal instead.
* `dark-modal-heading` has been removed; use a regular modal heading instead.
* `dark-modal-text` has been removed; use a regular modal body instead.
* `xui-modal-layout` default width is now 380px, not 360px.
* `xui-modal--close` no longer needs to precede the header in the markup.
* `xui-modal--body` now has default spacing when using `xui-modal--layout`.
* `xui-modal--header` now has default spacing when using `xui-modal--layout`.
* `xui-modal--close` now has default spacing when using `xui-modal--layout`.
* `xui-modal--footer` now has default spacing when using `xui-modal--layout`.
* `xui-modal--heading` now handles wrapping text.

#### Overview blocks
* `xui-overview` border has been replaced with box-shadow, take care to re-introduce your own spacing if collapsing margins take effect
* `xui-overview--label` has been added, use this instead of utility classes
* `xui-overview--value` has been added, use this instead of utility classes

#### Page header
* `xui-pageheading--tabs` has been added to provide inline tabs.
* `xui-pageheading--actions` has been added to provide better button alignment and inter-button spacing without the need for utility classes.
* `xui-breadcrumb--link` has been added to provide focus styles for breadcrumb links.
* `xui-pageheading`
	* border has been replaced with box-shadow, take care to re-introduce your own spacing if collapsing margins take effect.
	* Children will now match height of this element
* `xui-pageheading--content` children will now match height of this element
* `xui-pageheading--content-layout` vertical margins have been moved to `xui-pageheading--title` so tabs can extend the full height of the header.
* `xui-pageheading--content-layout` horizontal margin has been applied so max-width is not required for it to work on mobile devices.
* `xui-pageheading--title`
	* left padding will be added if placed inside layout class, to provide horizontal alignment on mobile devices.
	* Now center aligns children

#### Panels
* `xui-panel--header` now has a min-height of 60px.
* `xui-panel--footer` now has a min-height of 60px.
* `xui-panel--section--header` now has a default font size and weight.
* `xui-panel--heading` now has a default font size and weight.
* `xui-panel--sidebar` width is now 220px.

#### Avatars
* `xui-avatar-xsmall`, `xui-avatar-small`, `xui-avatar-large`, `xui-avatar-xlarge`, `xui-avatar-2xlarge` sizing support to cover xsmall all the way up to 2xlarge.

#### Toggles
* `xui-toggle--text` has been deprecated, to fix the IE11 wrapping bug, apply the `xui-u-fullwidth` utility class to a div instead.
* `xui-toggle-form-layout` has been deprecated, use the `xui-toggle-fullwidth-layout` modifier to achieve this behaviour instead.

### Classes removed

#### Radios & checkboxes
* Native checkbox and radio styling classes have been removed. Use styled checkboxes and radios instead.
The following classes are no longer available:
 * `xui-checkbox`
 * `xui-radio`
 * `xui-checkbox-layout`
 * `xui-radio-layout`
 * `xui-checkboxgroup`
 * `xui-radiogroup`

#### Filters (replace with Picklist)
 * `xui-sidebarfilter`, `xui-sidebarfilter-is-selected`, `xui-sidebarfilter--body`, `xui-sidebarfilter--control`,
 `xui-sidebarfilters`, `xui-sidebarfilters-multiple` ,`xui-sidebarsummary`, and `xui-sidebarsummary--control`
 have all been removed. Use picklists instead.

#### Toasts
* `xui-toast-list` has been removed.

#### Inputs
* `xui-input-borderless-layout`, `xui-input-wrapper-borderless-layout` and
`xui-inputwrapper-borderless-layout` have been removed.
There are no replacements for these; use the standard borderless classes.
* `xui-textarea` has been removed. Use `xui-input` on `<textarea>` elements instead.
* `xui-select--button-is-selected` has been removed and should no longer be used.

#### Page Heading
* `xui-pageheading-has-tabs` has been removed as it is no longer necessary.

### Tabs (replaced with Picklists)
* `xui-tabgroup`, `xui-tab`, `xui-tab--body`, `xui-tabgroup-layout`, `xui-tabgroup-layout-inline`, `xui-tab-inlinenav`,
`xui-tab-inlinenav-is-selected` have been removed. Use horizontal picklists instead.
* `xui-tabgroup-vertical`,`xui-tabgroup-vertical-layout`, `xui-verticaltab` `xui-verticaltab--body` and
`xui-verticaltab-is-selected` have been removed. Use vertical picklists instead.

#### Toggles
* `xui-toggle-form`, `xui-toggle-standard`, and `xui-toggle-icon-layout` have been removed. They are no longer
necessary to achieve the desired look.

#### Dropdown Menus (replaced with Picklists and Dropdowns)
* `xui-dropdownmenu`, `xui-dropdownmenu-layout`, `xui-dropdownmenu-small`, `xui-dropdownmenu-medium`,
`xui-dropdownmenu-large`, `xui-dropdownmenu-is-closed`, `xui-dropdownmenu--body`, `xui-dropdownmenu--footer`,
`xui-dropdownmenu--groupheading`, `xui-dropdownmenu--groupheading-layout`, `xui-menugroup`, `xui-menuitem`,
`xui-menuitem-layout`, `xui-menuitem--body`, `xui-menuitem--input`, and `xui-menuitem-is-selected` have been removed.
These are all succeeded by the `xui-dropdown` and `xui-picklist` component classes.

#### Typography
* `xui-caret` has been removed. Use the SVG caret icon instead.

#### Popover
* `xui-popover--body`, `xui-popover--header`, `xui-popover--header-standard`, `xui-popover--header-can-scroll-up`,
`xui-popover--heading`, `xui-popover--footer`, `xui-popover--footer-standard`, `xui-popover--footer-can-scroll-down`,
and `xui-popover--link` have been removed. These classes were not documented and there is no replacement for them.

#### Drawer
* `xui-sidedrawer`, `xui-sidedrawer-is-closed`, `xui-sidedrawer--header`, `xui-sidedrawer--footer`, `xui-sidedrawer--layout` and `xui-sidedrawer--content` have been removed. There is no replacement for them.

#### Popovers
* `xui-popover--arrow` had been deprecated, apply the new `xui-popover-arrow` modifier on `xui-popover` instead.
* `xui-popover--arrow--border` had been deprecated, this now is set by `xui-popover-arrow`.
* `xui-popover--arrow--*` position classes have been deprecated, use `xui-popover-arrow-*` instead.

#### Switch
* `xui-u-hiddenvisually` is no longer required to hide the checkbox, `xui-switch--checkbox` now does this by default.
* `xui-switch` now has unique disabled styles when the global `xui-is-disabled` class is applied.
* `xui-switch--labeltext` had been deprecated, use typography presets and utility classes instead.

### Classes renamed

#### Avatars
* `xui-avatar-group` has been removed. Use `xui-avatargroup` instead.

#### Radios & Checkboxes
* Styled radio and checkbox classes have been merged under the `xui-styledcheckboxradio` class. This means any class
that began with `xui-styledradio` or `xui-styledcheckbox` now starts with `xui-styledcheckboxradio`

#### Icons
* `xui-icon-svg` has been removed. Use `xui-iconsymbol` instead.
* `xui-newicon` has been removed. This never ended up being used.
* `xui-icon-rotate-90` has been removed. Use `xui-u-rotate-90` instead.
* `xui-icon-rotate-180` has been removed. Use `xui-u-rotate-180` instead.
* `xui-icon-rotate-270` has been removed. Use `xui-u-rotate-270` instead.

#### Toasts
* `xui-toast-wrapper` has been removed. Use `xui-toastwrapper` instead.
* `xui-toast--link` has been removed. Use `xui-button-borderless-main xui-button-small` instead.

#### Datepicker
* `xui-datepicker--weekday-container` has been removed. Use `xui-datepicker--weekdaywrapper` instead.
* `xui-datepicker--othermonth` has been removed. Use `xui-datepicker--day-is-othermonth` instead.

#### Pills
* `xui-pill-*` has been removed (old pills), and `xui-newpill-*` has been renamed to `xui-pill`
* `xui-pill-is-focussed` has been renamed to `xui-pill-is-focused` (one `s`)
* `xui-pill-single-is-invalid` has been removed, use `xui-pill-is-invalid` instead.

#### Inputs
* `xui-input-group` has ben removed. Use `xui-inputgroup` instead.
* `xui-input-wrapper` has been removed. Use `xui-inputwrapper` instead.
* `xui-input-wrapper-borderless` has been removed. Use `xui-inputwrapper-borderless` instead.
* `xui-input-wrapper-borderless-layout` has been removed. Use `xui-inputwrapper-borderless-layout` instead.

#### Typography
##### Headings
* `xui-heading-mini` has been removed. Use `xui-text-minor` instead.
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
* `xui-heading-display-xl` has been removed. Use `xui-heading-2xlarge` instead.
* `xui-heading-display-xxl` has been removed. Use `xui-heading-3xlarge` instead.

##### Alignment
* `xui-text-leftaligned` has been removed. Use `xui-text-align-left` instead.
* `xui-text-centered` has been removed. Use `xui-text-align-center` instead.
* `xui-text-rightaligned` has been removed. Use `xui-text-align-right` instead.

##### Colors
* `xui-text-color-*` has been renamed to `xui-textcolor-*`
* `xui-text-color-black` has been removed. Use `xui-textcolor-standard` instead.
* `xui-text-muted` has been removed. Use `xui-textcolor-muted` instead.
* `xui-text-color-faint` has been removed. Use `xui-textcolor-faint` instead.
* `xui-text-negative` has been removed. Use `xui-textcolor-negative` instead.
* `xui-text-positive` has been removed. Use `xui-textcolor-positive` instead.
* `xui-text-color-white` has been removed. Use `xui-textcolor-inverted` instead.
* `xui-text-inverted` has been removed. Previously this set both color and background-color. Use `xui-textcolor-inverted` and the background of your choice (more than likely `xui-background-grey-1`).
* `xui-text-color-white-muted` has been removed. Use `xui-textcolor-inverted-muted` instead.
* `xui-text-color-white-faint` has been removed. Use `xui-textcolor-inverted-faint` instead.

#### Utilities
* `xui-u-flex-row` has been removed. Use `xui-u-flex-verticallycentered` instead.
* `xui-u-flex-col` has been removed. Use `xui-u-flex-horizontal` instead (not a typo).
* `xui-u-flex-verticalalign-center` has been removed. Use `xui-u-flex-vertical` and
`xui-u-flex-horizontallycentered` instead.
* `xui-button-link` has been removed. Use `xui-button-borderless-main` instead.
* `xui-margin-auto-*` classes have been removed. Use `xui-margin-*-auto` instead.
* `xui-margin-*-huge` class has been removed. Use `xui-margin-*-2xlarge` instead.
* `xui-padding-*-huge` class has been removed. Use `xui-padding-*-2xlarge` instead.
* `xui-space-between` has been removed; use `xui-u-flex-space-between` instead.
* `xui-space-around` has been removed; use `xui-u-flex-space-around` instead.
* `xui-justify-left` has been removed; use `xui-u-flex-justify-left` instead.
* `xui-justify-right` has been removed; use `xui-u-flex-justify-right` instead.
* `xui-justify-center` has been removed; use `xui-u-flex-justify-center` instead.
* `xui-space-between-medium` has been removed; use `xui-u-flex-space-between-medium` instead.
* `xui-space-around-medium` has been removed; use `xui-u-flex-space-around-medium` instead.
* `xui-justify-left-medium` has been removed; use `xui-u-flex-justify-left-medium` instead.
* `xui-justify-right-medium` has been removed; use `xui-u-flex-justify-right-medium` instead.
* `xui-justify-center-medium` has been removed; use `xui-u-flex-justify-center-medium` instead.
* `xui-space-between-wide` has been removed; use `xui-u-flex-space-between-wide` instead.
* `xui-space-around-wide` has been removed; use `xui-u-flex-space-around-wide` instead.
* `xui-justify-left-wide` has been removed; use `xui-u-flex-justify-left-wide` instead.
* `xui-justify-right-wide` has been removed; use `xui-u-flex-justify-right-wide` instead.
* `xui-justify-center-wide` has been removed; use `xui-u-flex-justify-center-wide` instead.
* `xui-u-hidden-mobile` has been removed; use `xui-u-hidden-narrow` instead.
* `xui-u-hidden-mobile-up` has been removed; use `xui-u-hidden-medium` and `xui-u-hidden-wide` instead.

#### Motion
* `xui-u-transition-short` has been removed. Use `xui-transition-speed-fast` instead.
* `xui-u-transition-medium` has been removed. Use `xui-transition-speed-medium` instead.
* `xui-u-transition-long` has been removed. Use `xui-transition-speed-slow` instead.

##### Animation keyframes
* `xui-animation-show` and `xui-animation-hide` have been removed.
* `xui-animation-slideup` and `xui-animation-slidedown` have been removed.
* `xui-animation-fadein` and `xui-animation-fadeout` have been removed. Use `xui-transition-fadein` and
`xui-transition-fadeout` classes instead.

#### Tags
* `xui-tag-outline` has been removed; this is now the base style provided by `xui-tag`
* `xui-tag-solid` has been removed; use `xui-tag-neutral` instead
* Additionally, sentiment color options are now available: `xui-tag-positive`, `xui-tag-warning`, and `xui-tag-negative`

#### Page header
* `xui-pageheading--content-layout-titleonly` has been removed, use `xui-pageheading--title` instead.


### Mixins removed
* `xui-navigation-filters-hide-control`
* `xui-navigation-filters-collapse-list`
* `xui-navigation-filters-expand-list`
* `xui-tab-variation`

### Mixins renamed
* `xui-bold`. Use `xui-text-emphasis` instead.

### Variables removed

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


### Variables renamed

#### Motion

* `$xui-transition-duration-short`; use `$xui-motion-speed-fast` instead
* `$xui-transition-duration-medium`; use `$xui-motion-speed-medium` instead
* `$xui-transition-duration-long`; use `$xui-motion-speed-slow` instead

#### Colors

* `xui-color-xero-dark-green`; use `xui-color-green-dark` instead
* `xui-color-xero-dark-red`; use `xui-color-red-dark` instead
* `xui-color-xero-dark-purple`; use `xui-color-grape-dark` instead
* `xui-color-xero-light-blue`; use `xui-color-blue-light` instead
* `xui-color-xero-light-green`; use `xui-color-green-light` instead
* `xui-color-xero-orange`; use `xui-color-orange` instead
* `xui-color-xero-yellow`; use `xui-color-yellow` instead
* `xui-color-xero-pink`; use `xui-color-pink` instead
* `xui-color-xero-purple`; use `xui-color-purple` instead
* `xui-color-xero-blue`; use `xui-color-blue` instead
* `xui-color-xero-dark-blue`; use `xui-color-blue-dark` instead
* `xui-color-xero-green`; use `xui-color-green` instead
* `xui-color-xero-red`; use `xui-color-red` instead
* `xui-color-inverted-alpha-2`; use `xui-color-white-alpha-2` instead
* `xui-color-inverted-alpha-3`; use `xui-color-white-alpha-3` instead
* `xui-color-inverted-alpha-4`; use `xui-color-white-alpha-4` instead
* `xui-color-inverted-alpha-5`; use `xui-color-white-alpha-5` instead
* `xui-color-inverted-alpha-6`; use `xui-color-white-alpha-6` instead
* `xui-color-inverted-alpha-7`; use `xui-color-white-alpha-7` instead

#### Typography

* `$xui-font-size-heading`; use `$xui-font-size-extended-xlarge` instead
* `$xui-font-size-page-title`; use `$xui-font-size-extended-large` instead
* `$xui-font-size-section-title`; use `$xui-font-size-medium` instead
* `$xui-font-size-text`; use `$xui-font-size-small` instead
* `$xui-font-size-text-mobile`; use `$xui-font-size-extended-small` instead
* `$xui-font-size-heading-small`; use `$xui-font-size-xsmall` instead
* `$xui-font-size-regular`; use `$xui-font-size-small` instead
