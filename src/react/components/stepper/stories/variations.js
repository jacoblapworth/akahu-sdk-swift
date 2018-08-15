const storyKind = 'Instances/XUIStepper';

const defaultTabs = [
	{
		name: 'Standard',
	},
	{
		name: 'Error',
		description: 'Invalid Email',
		isError: true,
	},
	{
		name: 'Disabled',
		isDisabled: true,
	},
	{
		name: 'Complete',
		description: 'All done =)',
		isComplete: true,
	},
];

const baseProps = {
	id: 'myCustomStepperId',
	currentStep: 0,
	tabs: defaultTabs,
};

const standardTabs = [
	{
		name: 'Standard',
	},
	{
		name: 'Standard',
		description: 'Multiline',
	},
	{
		name: 'Error',
		isError: true,
	},
	{
		name: 'Error',
		description: 'With "isDisabled" prop',
		isError: true,
		isDisabled: true,
	},
	{
		name: 'Complete',
		isComplete: true,
	},
	{
		name: 'Complete',
		description: 'With "isError" prop',
		isComplete: true,
		isError: true,
	},
	{
		name: 'Complete',
		description: 'With "isDisabled" prop',
		isComplete: true,
		isDisabled: true,
	},

];

const longTabs = [
	{
		name: 'The quick brown fox jumped over the lazy dog, The quick brown fox jumped over the lazy dog',
	},
	{
		name: 'The quick brown fox jumped over the lazy dog, The quick brown fox jumped over the lazy dog',
		description: 'The quick brown fox jumped over the lazy dog, The quick brown fox jumped over the lazy dog',
	},
	{
		name: 'Standard',
		description: 'The quick brown fox jumped over the lazy dog, The quick brown fox jumped over the lazy dog',
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
		tabs: standardTabs,
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'progress button combinations',
		lockLayout: 'stacked',
		tabs: progressTabs,
	},

	{
		...baseProps,
		storyKind,
		storyTitle: 'extra long content',
		lockLayout: 'stacked',
		tabs: longTabs,
	},

];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
	baseProps,
};
