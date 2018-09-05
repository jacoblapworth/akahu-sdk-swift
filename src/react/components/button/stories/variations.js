const privateConsts = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIButton';
const buttonVariants = Object.keys(privateConsts.VariantClassNames);
const sizes = Object.keys(privateConsts.SizeClassNames);
const iconSizes = Object.keys(privateConsts.IconSizeClassNames);
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as Disabled',
		isDisabled: true,
		value: 'Disabled button'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with Caret',
		contentsKey: 'withCaret',
		variant: 'create'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'small with Caret',
		contentsKey: 'withCaret',
		size: 'small'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a Group',
		contentsKey: 'asGroup',
		componentType: 'XUIButtonGroup'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a small Group',
		contentsKey: 'asGroupSm',
		componentType: 'XUIButtonGroup'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a Split Button Group',
		contentsKey: 'asSplitGroup',
		componentType: 'XUISplitButtonGroup',
		variant: 'primary'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a Split Button Group with multi-line text',
		componentType: 'XUISplitButtonGroup',
		variant: 'primary',
		contentsKey: 'asSplitGroupMulti',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a small Split Button Group',
		contentsKey: 'asSplitGroupSm',
		componentType: 'XUISplitButtonGroup',
		variant: 'negative'
	}
];

buttonVariants.forEach((buttonVariant, index) => {
	const isIcon = buttonVariant.match(/^icon/) && buttonVariant.match(/^icon/)[0];
	const sizesToIterate = isIcon
		? iconSizes
		: [sizes[index % sizes.length]];

	sizesToIterate.forEach(size =>
		variations.push({
			storyKind: storiesWithVariationsKindName,
			storyTitle: `as ${size} ${buttonVariant}`,
			href: buttonVariant === 'link' ? '#' : undefined,
			isLink: buttonVariant === 'link',
			size: size,
			value: isIcon ? undefined : `${buttonVariant}`,
			contentsKey: isIcon ? 'icon' : undefined,
			variant: buttonVariant
		})
	);
});

sizes.forEach((sizeVariant) => {
	variations.push(
		{
			storyKind: storiesWithVariationsKindName,
			storyTitle: `${sizeVariant} with a Loader`,
			size: sizeVariant,
			isLoading: true,
			className: 'xui-loader-static', // Prevent dots from animating and causing diffs due to timing issues
			value: 'This is a button'
		}
	);
});

module.exports = {
	storiesWithVariationsKindName,
	variations
};
