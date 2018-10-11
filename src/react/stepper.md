<div class="xui-margin-vertical">
	<a href="../section-compounds-navigation-stepper.html" isDocLink>Stepper in the XUI Documentation</a>
</div>

The stepper renders a set of _tabs_ and a _content_ area corresponding to the currently _active_ step/tab.<br />`import XUIStepper from '@xero/xui/react/stepper';`.

## Responsive

By default the stepper will automatically change the positioning of tabs and content in respect to the `currentStep` prop: either inline within the stepper for narrow viewports, or below the stepper for wider viewports to ensure optimal usability in the widest range of responsive scenarios.

The content elements must be passed as children to the stepper component so that the stepper can take control of their layout. Without this, you will not get the full benefits of the stepper's responsive behaviour.

You can opt out of the stepper's responsive functionality, however we **strongly** recommend that you retain these capabilities and **not** use the `lockLayout` prop. By not supporting all device sizes you are creating a reduced user experience.

## Examples

#### Inline *(standard)*

Lock by supplying the string `inline` to the prop `lockLayout`.

```
const tabs = [
	{ name: 'Tab 1' },
	{ name: 'Tab 2' },
	{ name: 'Tab 3' }
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-inline-standard"
				lockLayout="inline"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

#### Inline *(stacked buttons)*

The `inline` layout also has the ability to stack its button content using the prop `hasStackedButtons`.

+ You can use this prop in both a _locked_ or _default_ layout state.

```
const tabs = [
	{ name: 'Tab 1' },
	{ name: 'Tab 2' },
	{ name: 'Tab 3' }
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-inline-stacked"
				lockLayout="inline"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

#### Side Bar

Lock by supplying the string `sidebar` to the prop `lockLayout`.

```
const tabs = [
	{ name: 'Tab 1' },
	{ name: 'Tab 2' },
	{ name: 'Tab 3' }
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-sidebar-standard"
				lockLayout="sidebar"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

#### Stacked

Lock by supplying the string `stacked` to the prop `lockLayout`.

```
const tabs = [
	{ name: 'Tab 1' },
	{ name: 'Tab 2' },
	{ name: 'Tab 3' }
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-stacked-standard"
				lockLayout="stacked"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

### Tab options

You as a developer control the tab configuration via the `tabs` prop. This gives granularity to customise the component visually but to also control the usability e.g. force the user to proceed through the *steps* linearly or arbitrarily.

#### Generic

+ The simplest tab layout can be achieved by supplying just a `name` prop.
+ Add a *description* via the `description` prop.
+ Change a tab to an *error* state via the `isError` prop.
+ Change a tab to a *complete* state via the `isComplete` prop.

```
const tabs = [
	{ name: 'Active' },
	{ name: 'Standard' },
	{ name: 'Description', description: 'description prop' },
	{ name: 'Complete', description: 'isComplete prop', isComplete: true },
	{ name: 'Error', description: 'isError prop', isError: true },
	{ name: 'Disabled', description: 'isDisabled prop', isDisabled: true },
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-tab-generic"
				lockLayout="stacked"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

#### Progress Indicator

In addition to the generic tab format a **Progress Indicator** can be included with the `isProgress` prop.

+ Visualise *progress* by supplying a `totalProgress` and `currentProgress` prop.
+ You can either lock a tab to the *complete* state with the `isComplete` prop or if the `totalProgress` and `currentProgress` values are equal the *complete* state
will be applied automatically.

```
const tabs = [
		{ name: 'Active', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Standard', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Description', description: 'description prop', isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Complete', description: 'isComplete prop', isComplete: true, isProgress: true, totalProgress: 5, currentProgress: 0 },
		{ name: 'Complete (automatic)', description: 'isComplete prop', isComplete: true, isProgress: true, totalProgress: 5, currentProgress: 5 },
		{ name: 'Error', description: 'isError prop', isError: true, isProgress: true, totalProgress: 5, currentProgress: 3 },
		{ name: 'Disabled', description: 'isDisabled prop', isDisabled: true, isProgress: true, totalProgress: 5, currentProgress: 3 },
];

class Demo extends React.Component {
	constructor() {
		super();
		this.state = { currentStep: 0 };
		this.updateCurrentStep = this.updateCurrentStep.bind(this);
	}

	updateCurrentStep(currentStep) {
		this.setState({ currentStep });
	}

	render() {
		const { currentStep } = this.state;
		return (
			<XUIStepper
				id="stepper-tab-progress"
				lockLayout="stacked"
				currentStep={currentStep}
				updateCurrentStep={this.updateCurrentStep}
				tabs={tabs}>
				<h3>{`Custom Content for Tab ${currentStep + 1}`}</h3>
			</XUIStepper>
		);
	}
}

<Demo />
```

