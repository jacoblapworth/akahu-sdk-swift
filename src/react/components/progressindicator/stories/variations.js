const storyKind = 'Instances/XUIProgressIndicator';
const baseProps = {
	id: 'myCustomProgressId',
	total: 5,
	progress: 3,
};
const variations = [

	// Linear:

	{
		...baseProps,
		storyKind,
		storyTitle: 'linear standard',
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'linear segments',
		isSegmented: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'linear overflow standard',
		progress: 6,
		isOverflow: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'linear overflow segments',
		progress: 6,
		isSegmented: true,
		isOverflow: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'linear soft error',
		isSoftError: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'linear grow layout',
		isGrow: true,
	},

	// Circular:

	{
		...baseProps,
		storyKind,
		storyTitle: 'circular standard',
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular segments',
		isSegmented: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular overflow standard',
		progress: 6,
		isOverflow: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular overflow segments',
		progress: 6,
		isSegmented: true,
		isOverflow: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular soft error',
		isSoftError: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular hard error',
		isHardError: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular custom hard error',
		isHardError: true,
		hardErrorAlert: 'S',
	}, {
		...baseProps,
		storyKind,
		storyTitle: 'circular custom (icon) hard error',
		isHardError: true
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular completion alert',
		progress: 5,
		isAlertOnComplete: true,
	},
	{
		...baseProps,
		storyKind,
		storyTitle: 'circular grow layout',
		isGrow: true,
	},

	// Color:

	{
		...baseProps,
		storyKind,
		storyTitle: 'color combinations',
	},

];

module.exports = {
	storiesWithVariationsKindName: storyKind,
	variations,
	baseProps,
};
