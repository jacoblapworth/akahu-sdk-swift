## Removals

The `xui-steps` classes have been removed. Please use the `XUIStepper` React component, or `xui-stepper` classes if you're not using React.

## CSS Class Names

* `dropdown-toggled-wrapper` has been removed from the React component. This class did not conform with our
naming scheme, was considered private and only used with the React component, but we have noticed projects using it.
In the future, please use the relevant `className` prop on the React component rather than overriding a non-standard
private class.
