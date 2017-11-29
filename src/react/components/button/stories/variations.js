const privateConsts = require('../private/constants');

const storiesWithVariationsKindName = 'Instances/XUIButton';
const buttonVariants = Object.keys(privateConsts.VariantClassNames);
const sizes = Object.keys(privateConsts.SizeClassNames);
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
		storyTitle: 'as a Group',
		contentsKey: 'asGroup',
		componentType: 'XUIButtonGroup'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'as a Split Button Group',
		contentsKey: 'asSplitGroup',
		componentType: 'XUISplitButtonGroup',
		variant: 'primary'
	}
];

buttonVariants.forEach((buttonVariant, index) => {
	const isIcon = buttonVariant.match(/^icon/) && buttonVariant.match(/^icon/)[0];
	const size = isIcon ? 'full-width' : sizes[index % sizes.length];
	const storyVariation = {
		storyKind: storiesWithVariationsKindName,
		storyTitle: `as ${isIcon ? '' : size} ${buttonVariant}`,
		size: size,
		value: isIcon ? undefined : `${buttonVariant}`,
		contentsKey: isIcon ? 'icon' : undefined,
		variant: buttonVariant
	};
	variations.push(storyVariation);
});

module.exports = {
	storiesWithVariationsKindName,
	variations
}
