## Removals

### Utility classes

| Removed       | Replacement    |
| ------------- | :------------- |
| `xui-u-flex-verticallycentered` | `xui-u-flex-align-center` |
| `xui-u-flex-horizontallycentered` | `xui-u-flex-justify-center` |
| `xui-u-flex-horizontal` | `xui-u-flex-row` |
| `xui-u-flex-vertical` | `xui-u-flex-column` |
| `xui-u-spacebetween` | `xui-u-flex-justify-space-between` |
| `xui-u-flex-space-between` | `xui-u-flex-justify-space-between` |
| `xui-u-flex-space-around` | `xui-u-flex-justify-space-around` |
| `xui-u-flex-justify-left` | `xui-u-flex-justify-start` |
| `xui-u-flex-justify-right` | `xui-u-flex-justify-end` |

---

### Component classes

* The `xui-steps` classes have been removed. Please use the `XUIStepper` React component, or `xui-stepper` classes if you're not using React.
* The `xui-banner-animated` class has been removed. There is no replacement for this but design has indicated they want to do an animation pass over the library at some point in the future and we may see it's return. For now, no animations provided by XUI will be supported.
* The `xui-icon-color-standard` class has been removed. The standard replacement is `xui-icon-color-black-muted`.
* The `xui-progress-tooltip` class has been removed. It has been replaced with `xui-progress--tooltip` instead.
* The `xui-switch--labeltext` class has been removed. There is no standard replacement to this class.
* `dropdown-toggled-wrapper` has been removed from the React component. This class did not conform with our naming scheme, was considered private and only used with the React component, but we have noticed projects using it. In the future, please use the relevant `className` prop on the React component rather than overriding a non-standard private class.
* `xui-contentblock--item` has been replaced with `xui-contentblockitem`.
* `xui-contentblock--item-selected` has no replacement.
* `xui-contentblock--item-negative` has no replacement.
