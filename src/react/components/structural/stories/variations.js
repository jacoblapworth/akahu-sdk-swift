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
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `overview block`,
		type: 'overview',
		sections: [
			{label: 'hello', value: 'there'},
			{label: 'good', value: 'morning'},
			{label: 'good', value: 'bye'}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `overview block with more sections and colors`,
		type: 'overview',
		sections: [
			{label: 'hello', value: 'there'},
			{label: 'paid', value: '1,582.99', sentiment: 'positive'},
			{label: 'unpaid', value: '0.68', sentiment: 'negative'},
			{label: 'draft', value: '103.75', sentiment: 'muted'},
			{label: 'there', value: 'you go'}
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: `overview block without layout`,
		type: 'overview',
		hasLayout: false,
		sections: [
			{label: 'hello', value: 'there'},
			{label: 'there', value: 'you go'}
		]
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
