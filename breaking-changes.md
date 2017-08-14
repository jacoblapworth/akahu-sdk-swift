* `xui-avatar-group` has been removed. Use `xui-avatargroup` instead.
* Native checkbox and radio styling classes have been removed. Use styled checkboxes and radios instead.
The following classes are no longer available:
 * `xui-checkbox`
 * `xui-radio`
 * `xui-checkbox-layout`
 * `xui-radio-layout`
 * `xui-checkboxgroup`
 * `xui-radiogroup`
* `xui-u-flex-row` has been removed. Use `xui-u-flex-verticallycentered` instead.
* `xui-u-flex-col` has been removed. Use `xui-u-flex-horizontal` instead.
* `xui-u-flex-verticalalign-center` has been removed. Use `xui-u-flex-vertical` and `xui-u-flex-horizontallycentered` instead.
* Margin and padding classes are now trumps, meaning they are included at the bottom of XUI's CSS file. Previously, it
was possible for margin and padding classes to be undone by others (e.g. `xui-panel--section`) specified further down 
the CSS file.
* `xui-margin-none` no longer has `!important`
* `xui-padding-none` no longer has `!important`
* `xui-margin-auto-($1)` classes have been removed. Use `xui-margin-($1)-auto` instead.

