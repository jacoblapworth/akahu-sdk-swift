const storiesWithVariationsKindName = 'Instances/XUITag';

const NOOP = () => {};

const tagVariants = {
	neutral: 'xui-tag-neutral',
	positive: 'xui-tag-positive',
	negative: 'xui-tag-negative',
	warning: 'xui-tag-warning',
	standard: ''
};

const variations = Object.keys(tagVariants).map(variant => ({
		storyKind: storiesWithVariationsKindName,
        storyTitle: `With a ${variant} variant`,
        variant: variant,
        children: "Tag content"
    })
);

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP
}
