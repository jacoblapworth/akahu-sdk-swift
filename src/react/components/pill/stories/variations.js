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
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with no Delete Button',
		value: 'No Delete Button here',
		omitDeleteBtn: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as invalid',
		value: 'Invalid Pill',
		isInvalid: true,
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has custom class',
		value: 'Custom Class Pill',
		className: 'xui-margin',
		avatarProps,
		onClick: NOOP,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a link',
		value: 'Click Me Pill',
		href: "https://www.xero.com",
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'does not have default layout',
		value: 'No default layout',
		defaultLayout: false,
		avatarProps,
		onClick: NOOP,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'can have secondary text',
		value: 'Primary',
		secondaryText: 'Secondary',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with long text',
		value: 'I am the primary value, I have long text',
		avatarProps
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with qaHooks',
		value: 'Inspect me',
		qaHook: 'qaHook',
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
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as single-select pill',
		value: 'Single pill',
		className: 'xui-pill-single',
		isSingle: true,
		defaultLayout: false,
		avatarProps,
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	avatarProps
}
