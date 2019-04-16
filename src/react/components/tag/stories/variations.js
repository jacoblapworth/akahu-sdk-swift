import NOOP from'../../helpers/noop';
const { sizes, variants } = require('../private/constants');
const storiesWithVariationsKindName = 'Instances/XUITag';

const variantVariations = Object.keys(variants).map(variant => ({
        children: "Tag content",
        storyKind: storiesWithVariationsKindName,
        storyTitle: `With a ${variant} variant`,
        variant
    })
);

const sizeVariations = Object.keys(sizes).map(size => ({
        children: "Tag content",
        storyKind: storiesWithVariationsKindName,
        storyTitle: `With a ${size} size`,
        size
    })
);

module.exports = {
	storiesWithVariationsKindName,
	variations: [...variantVariations, ...sizeVariations],
	NOOP
}
