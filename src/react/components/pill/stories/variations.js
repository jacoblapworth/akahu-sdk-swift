const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/XUIPill';

const avatarProps = {
	className: '',
	qaHook: '',
	variant: undefined, // business is the other option
	value: 'Hello', // This has to be populated, or identifier
	imageUrl: '',
	identifier: '',
};

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no Avatar',
		value: 'No Avatar here',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no Delete Button',
		value: 'No Delete Button here',
		title: 'A reasonable Pill title',
		onClick: NOOP
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as invalid',
		value: 'Invalid Pill',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		isInvalid: true,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has custom class',
		value: 'Custom Class Pill',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		className: 'xui-margin',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a link',
		value: 'Click Me Pill',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		href: "https://www.xero.com",
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'does not have default layout',
		value: 'No default layout',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		defaultLayout: false,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'can have secondary text',
		value: 'Primary',
		secondaryText: 'Secondary',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with long text',
		value: 'I am the primary value, I have long text',
		title: 'A reasonable Pill title',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with qaHooks',
		value: 'Inspect me',
		title: 'A reasonable Pill title',
		qaHook: 'qaHook',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as small',
		value: 'Small',
		title: 'Small pill',
		size: 'small',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as xsmall',
		value: 'XSmall',
		title: 'XSmall pill',
		size: 'xsmall',
		onDeleteClick: NOOP,
		onClick: NOOP,
		deleteButtonLabel: 'Delete Button Label',
		avatarProps
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	avatarProps,
	NOOP
}
