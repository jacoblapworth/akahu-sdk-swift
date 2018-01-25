<div class="xui-margin-vertical">
		<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
			<use xlink:href="#xui-icon-bookmark" role="presentation"/>
		</svg>
		<a href="../section-building-blocks-steps.html">Stepper in the XUI Documentation</a>
</div>

The Stepper is a scaffold that renders a sequence of tabs and an *active* content panel. `import XUIStepper from '@xero/xui/react/stepper';`.

**Note:** The unique `id` prop specifically relates to the *ARIA* relationships within the Stepper component. In that regard we require this prop on all Stepper instances.

## Examples

### Layout Options

By default the Stepper will lay its elements out in a manner that conforms to its own internal element queries. There is however the ability to lock the design to one of the following layout options.

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
	]}
/>
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

#### Standard

The simplest tab layout can be achieved by supplying just a `name` prop.

```
<XUIStepper
	id="stepper-tab-standard"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1' }
	]}
/>
```

#### Description

Add a *description* via the `description` prop.

```
<XUIStepper
	id="stepper-tab-description"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', description: 'Description 1' }
	]}
/>
```

#### Error

Change a tab to an *error* state via the 'isError' prop.

```
<XUIStepper
	id="stepper-tab-error"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isError: true }
	]}
/>
```

#### Complete

Change a tab to a *complete* state via the 'isComplete' prop.

```
<XUIStepper
	id="stepper-tab-complete"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isComplete: true }
	]}
/>
```

#### Disabled

Change a tab to a *disabled* state via the 'isDisabled' prop.

```
<XUIStepper
	id="stepper-tab-disabled"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isDisabled: true }
	]}
/>
```

### Progress Indicator

In addition to the generic tab format a **Progress Indicator** can be included with the `isProgress` prop.

#### Standard

Visualise *progress* by supplying a `totalProgress` and `currentProgress` prop.

```
<XUIStepper
	id="stepper-progress-standard"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isProgress: true, totalProgress: 5, currentProgress: 3 }
	]}
/>
```

#### Error

Change a tab to an *error* state via the 'isError' prop.

```
<XUIStepper
	id="stepper-progress-error"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isError: true, isProgress: true, totalProgress: 5, currentProgress: 3 }
	]}
/>
```

#### Complete

You can either lock a tab to the *complete* state with the `isComplete` prop or if the `totalProgress` and `currentProgress` values are equal the *complete* state will be applied automatically.

```
<XUIStepper
	id="stepper-progress-complete"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isComplete: true, isProgress: true, totalProgress: 5, currentProgress: 3 }
	]}
/>
```

```
<XUIStepper
	id="stepper-progress-complete"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isProgress: true, totalProgress: 5, currentProgress: 5 }
	]}
/>
```

#### Disabled

Change a tab to a *disabled* state via the 'isDisabled' prop.

```
<XUIStepper
	id="stepper-progress-disabled"
	lockLayout="inline"
	tabs={[
		{ name: 'Tab 1', isDisabled: true, isProgress: true, totalProgress: 5, currentProgress: 3 }
	]}
/>
```

### Content

When setting the *current* tab using the `currentStep` prop you can also display any respective content using a traditional nested children format.

```
<XUIStepper
	id="stepper-progress-disabled"
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
