const { rowVariants } = require('../private/constants');
const storiesWithVariationsKindName = 'Instances/Structure';

const variations = Object.keys(rowVariants).map(variant => ({
		storyKind: storiesWithVariationsKindName,
        storyTitle: `With a ${variant} variant`,
				variant: variant,
				columnWidths: ["3", "6", "3"]
    })
);

module.exports = {
	storiesWithVariationsKindName,
	variations
}
