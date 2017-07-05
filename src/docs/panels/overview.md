####What are panels

A panel is the standard top-level container for grouping page content. They give those groups definitions against the standard grey page.
A page can have multiple panels, but they should only ever be siblings, **never nested**.

Panels can contain any content but come with standard options for sections, headers, footers, and sidebars.

####When to use

* Use to group content at base page level

####When not to use

* Do not use panels inside modals.
* Do not nest panels inside other panels.
* Do not use panels to draw attention to UI controls.
* Do not use a panel as the containing css classes for a react component.

####Grouping elements together that don't belong in panels

If you need a bordered box to frame content inside a panel, that aren't semantically panels,
you can use XUI's variables and mixins to provide the same look by creating your own
application-specific classes.

```
@import '@xero/xui/sass/vars';
@import '@xero/xui/sass/mixins';

.example-container {
	@include xui-box-shadow-border($xui-shadow-border-all);
	background-color: $xui-color-white;
	border-radius: $xui-radius;
}
```

#### Padding in panels
To provide flexibility for different types of content, panel sections do not provide padding by default.
You can add padding using the `xui-padding-*` classes available.
We recommended using the `xui-padding-large` class for a panel inset.
