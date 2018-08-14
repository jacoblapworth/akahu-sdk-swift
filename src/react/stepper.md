<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-stepper.html" isDocLink>Stepper in the XUI Documentation</a>
</div>

The Stepper is a scaffold that renders a sequence of tabs and an *active* content panel. `import XUIStepper from '@xero/xui/react/stepper';`.

**Note:** The unique `id` prop specifically relates to the *ARIA* relationships within the Stepper component. In that regard we require this prop on all Stepper instances.

## Examples

### Layout Options

By default the Stepper will lay its elements out in a manner that conforms to its own internal element queries. There is however the ability to lock the design to one of the following layout options.

**Note:** Although we allow the ability to opt out of the responsive functionality that comes built into the Stepper we **strongly** recommend that you retain these responsive capabilities by **not** using the `lockLayout` prop. This ensures that the your Stepper instance has optimal usability in the widest range of scenarios.

#### Inline *(standard)*

Lock by supplying the string `inline` to the prop `lockLayout`.

```
<XUIStepper
	id="stepper-inline-standard"
	lockLayout="inline"
	currentStep={0}
	tabs={[
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Tab 3' }
	]}>
	<h3>Custom Content for Tab 1</h3>
</XUIStepper>
```

#### Inline *(stacked buttons)*

The `inline` layout also has the ability to stack its button content using the prop `hasStackedButtons`.

```
<XUIStepper
	id="stepper-inline-stacked"
	lockLayout="inline"
	currentStep={0}
	hasStackedButtons
	tabs={[
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Tab 3' }
	]}>
	<h3>Custom Content for Tab 1</h3>
</XUIStepper>
```

#### Side Bar

Lock by supplying the string `sidebar` to the prop `lockLayout`.

```
<XUIStepper
	id="stepper-sidebar-standard"
	lockLayout="sidebar"
	currentStep={0}
	tabs={[
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Tab 3' }
	]}>
	<h3>Custom Content for Tab 1</h3>
</XUIStepper>
```

#### Stacked

Lock by supplying the string `stacked` to the prop `lockLayout`.

```
<XUIStepper
	id="stepper-stacked-standard"
	lockLayout="stacked"
	currentStep={0}
	tabs={[
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Tab 3' }
	]}>
	<h3>Custom Content for Tab 1</h3>
</XUIStepper>
```

### Tab options

You as a developer control the tab configuration via the `tabs` prop. This gives granularity to customise the component visually but to also control the usability e.g. force the user to proceed through the *steps* linearly or arbitrarily.

#### Generic

+ The simplest tab layout can be achieved by supplying just a `name` prop.
+ Add a *description* via the `description` prop.
+ Change a tab to an *error* state via the `isError` prop.
+ Change a tab to a *complete* state via the `isComplete` prop.

```
<XUIStepper
	id="stepper-tab-generic"
	lockLayout="stacked"
	currentStep={0}
	tabs={[
		{ name: 'Active' },
		{ name: 'Standard' },
		{ name: 'Description', description: 'description prop' },
		{ name: 'Complete', description: 'isComplete prop', isComplete: true },
		{ name: 'Error', description: 'isError prop', isError: true },
		{ name: 'Disabled', description: 'isDisabled prop', isDisabled: true },
	]}
/>
```

#### Progress Indicator

In addition to the generic tab format a **Progress Indicator** can be included with the `isProgress` prop.

+ Visualise *progress* by supplying a `totalProgress` and `currentProgress` prop.
+ You can either lock a tab to the *complete* state with the `isComplete` prop or if the `totalProgress` and `currentProgress` values are equal the *complete* state
will be applied automatically.

```
<XUIStepper
	id="stepper-tab-progress"
	lockLayout="stacked"
	currentStep={0}
	tabs={[
		{ name: 'Active', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Standard', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Description', description: 'description prop', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Complete', description: 'isComplete prop', isComplete: true, isProgress: true, totalProgress: 5, currentProgress: 0 },
		{ name: 'Complete (automatic)', description: 'isComplete prop', isComplete: true, isProgress: true, totalProgress: 5, currentProgress: 5 },
		{ name: 'Error', description: 'isError prop', isError: true, isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Disabled', description: 'isDisabled prop', isDisabled: true, isProgress: true, totalProgress: 5, currentProgress: 3 },
	]}
/>
```

### Content

When setting the *current* tab using the `currentStep` prop you can also display any respective content using a traditional nested children format.

```
<XUIStepper
	id="stepper-progress-disabled"
	lockLayout="inline"
	currentStep={2}
	tabs={[
		{ name: 'First Tab' },
		{ name: 'Middle Tab' },
		{ name: 'Last Tab' }
	]}>
	<h3>Custom Content for the last tab</h3>
</XUIStepper>
```
