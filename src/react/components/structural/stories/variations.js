const { rowVariants } = require('../private/constants');
const storiesWithVariationsKindName = 'Instances/Structure';

let variations = Object.keys(rowVariants).map(variant => ({
		storyKind: storiesWithVariationsKindName,
		storyTitle: `With a ${variant} variant`,
		variant: variant,
		columnWidths: ["3", "6", "3"],
		type: 'row'
	})
);
variations = [...variations,
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `pageheader with title`,
		type: 'pageheader',
		title: 'Testing title'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `pageheader with breadcrumbs`,
		type: 'pageheader',
		breadcrumb: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `pageheader with title and tabs`,
		type: 'pageheader',
		title: 'Testing tabs',
		tabs: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `pageheader with breadcrumb and actions`,
		type: 'pageheader',
		breadcrumb: true,
		actions: true
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
