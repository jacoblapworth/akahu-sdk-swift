<div class="xui-margin-vertical">
	<a href="../section-components-navigation-stepper.html" isDocLink>Stepper in the XUI Documentation</a>
</div>

The stepper renders a set of _tabs_ and a _content_ area corresponding to the currently _active_ step/tab.<br />`import XUIStepper from '@xero/xui/react/stepper';`.

## Responsive

By default the stepper will automatically change the positioning of tabs and content in respect to the `currentStep` prop: either inline within the stepper for narrow viewports, or below the stepper for wider viewports to ensure optimal usability in the widest range of responsive scenarios.

The content elements must be passed as children to the stepper component so that the stepper can take control of their layout. Without this, you will not get the full benefits of the stepper's responsive behaviour.

You can opt out of the stepper's responsive functionality, however we **strongly** recommend that you retain these capabilities and **not** use the `lockLayout` prop. By not supporting all device sizes you are creating a reduced user experience.

## Examples

#### Inline _(standard)_

Lock by supplying the string `inline` to the prop `lockLayout`.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [{ name: 'Plan' }, { name: 'Billing' }, { name: 'Review' }];
const content = ['Select a plan', 'Payment details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      id="stepper-inline-standard"
      lockLayout="inline"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3 className="xui-text-align-center">{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```

#### Inline _(stacked buttons)_

The `inline` layout also has the ability to stack its button content using the prop `hasStackedButtons`.

- You can use this prop in both a _locked_ or _default_ layout state.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [{ name: 'Plan' }, { name: 'Billing' }, { name: 'Review' }];
const content = ['Select a plan', 'Payment details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      hasStackedButtons
      id="stepper-inline-stacked"
      lockLayout="inline"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3 className="xui-text-align-center">{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```

#### Side Bar

Lock by supplying the string `sidebar` to the prop `lockLayout`.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [{ name: 'Plan' }, { name: 'Billing' }, { name: 'Review' }];
const content = ['Select a plan', 'Payment details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      id="stepper-sidebar-standard"
      lockLayout="sidebar"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3>{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```

#### Stacked

Lock by supplying the string `stacked` to the prop `lockLayout`.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [{ name: 'Plan' }, { name: 'Billing' }, { name: 'Review' }];
const content = ['Select a plan', 'Payment details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      id="stepper-stacked-standard"
      lockLayout="stacked"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3>{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```

### Tab options

You as a developer control the tab configuration via the `tabs` prop. This gives granularity to customise the component visually but to also control the usability e.g. force the user to proceed through the _steps_ linearly or arbitrarily.

#### Generic

- The simplest tab layout can be achieved by supplying just a `name` prop.
- Add a _description_ via the `description` prop.
- Change a tab to an _error_ state via the `isError` prop.
- Change a tab to a _complete_ state via the `isComplete` prop.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [
  { description: 'Complete', isComplete: true, name: 'Plan' },
  {
    description: 'Payment details are incomplete',
    isError: true,
    name: 'Billing'
  },
  {
    description: 'Add/view subscription details',
    name: 'Subscription details'
  },
  { description: 'Review & pay', isDisabled: true, name: 'Review' }
];
const content = ['Select a plan', 'Payment details', 'Subscription details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      id="stepper-tab-generic"
      lockLayout="stacked"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3>{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```

#### Progress Indicator

In addition to the generic tab format a **Progress Indicator** can be included with the `isProgress` prop.

- Visualise _progress_ by supplying a `totalProgress` and `currentProgress` prop.
- You can either lock a tab to the _complete_ state with the `isComplete` prop or if the `totalProgress` and `currentProgress` values are equal the _complete_ state
  will be applied automatically.

```jsx harmony
import { useState } from 'react';
import XUIStepper from '@xero/xui/react/stepper';

const tabs = [
  {
    currentProgress: 5,
    description: 'Complete',
    isComplete: true,
    isProgress: true,
    name: 'Plan',
    totalProgress: 5
  },
  {
    currentProgress: 3,
    description: 'Payment details are incomplete',
    isError: true,
    isProgress: true,
    name: 'Billing',
    totalProgress: 5
  },
  {
    currentProgress: 3,
    description: 'Add/view subscription details',
    isProgress: true,
    name: 'Subscription details',
    totalProgress: 5
  },
  { description: 'Review & pay', isDisabled: true, name: 'Review' }
];
const content = ['Select a plan', 'Payment details', 'Subscription details', 'Confirm purchase'];

const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const updateCurrentStep = step => {
    setCurrentStep(step);
  };

  return (
    <XUIStepper
      currentStep={currentStep}
      id="stepper-tab-progress"
      lockLayout="stacked"
      tabs={tabs}
      updateCurrentStep={updateCurrentStep}
    >
      <h3>{content[currentStep]}</h3>
    </XUIStepper>
  );
};

<StepperExample />;
```
