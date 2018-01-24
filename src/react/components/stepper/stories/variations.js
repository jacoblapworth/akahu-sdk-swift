const { NOOP } = require('../helpers/constants');
const storyKind = 'Instances/XUIStepper';

const defaultTabs = [
	{
		name: 'Standard',
		handleClick: NOOP,
	},
	{
		name: 'Error',
		description: 'Invalid Email',
		handleClick: NOOP,
		isError: true,
	},
	{
		name: 'Disabled',
		handleClick: NOOP,
		isDisabled: true,
	},
	{
		name: 'Complete',
		description: 'All done =)',
		handleClick: NOOP,
		isComplete: true,
	}
];

const baseProps = {
	id: 'myCustomStepperId',
	currentStep: 0,
	tabs: defaultTabs
};

const standardTabs = [
	{
		name: 'Standard',
		handleClick: NOOP,
	},
	{
		name: 'Standard',
		description: 'Multiline',
		handleClick: NOOP,
	},
	{
		name: 'Error',
		isError: true,
		handleClick: NOOP,
	},
	{
		name: 'Error',
		description: 'With "isDisabled" prop',
		isError: true,
		isDisabled: true,
		handleClick: NOOP,
	},
	{
		name: 'Complete',
		isComplete: true,
		handleClick: NOOP,
	},
	{
		name: 'Complete',
		description: 'With "isError" prop',
		isComplete: true,
		isError: true,
		handleClick: NOOP,
	},
	{
		name: 'Complete',
		description: 'With "isDisabled" prop',
		isComplete: true,
		isDisabled: true,
		handleClick: NOOP,
	},

];

const progressTabs = [
	...standardTabs.map(tab => ({
		...tab,
		isProgress: true,
		totalProgress: 5,
		currentProgress: 3,
	})),
	{
		name: 'Complete',
		description: 'When progress is complete',
		isProgress: true,
		totalProgress: 5,
		currentProgress: 5,
		handleClick: NOOP,
	},
];

const variations = [

	{
		...baseProps,
		storyKind,
		storyTitle: 'inline standard layout',
		lockLayout: 'inline',
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'inline (stacked button) layout',
		hasStackedButtons: true,
		lockLayout: 'inline',
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'sidebar layout',
		lockLayout: 'sidebar',
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'stacked layout',
		lockLayout: 'stacked',
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'standard button combinations',
		lockLayout: 'stacked',
		tabs: standardTabs
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'progress button combinations',
		lockLayout: 'stacked',
		tabs: progressTabs
	},

];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
	baseProps,
};
