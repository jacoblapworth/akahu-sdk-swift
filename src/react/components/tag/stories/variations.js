const NOOP = require('../../helpers/noop');
const { variants } = require('../private/constants');
const storiesWithVariationsKindName = 'Instances/XUITag';

const variations = Object.keys(variants).map(variant => ({
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
