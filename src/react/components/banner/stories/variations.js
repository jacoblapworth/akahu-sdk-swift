const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/XUIBanner';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a positive sentiment',
		sentiment: 'positive',
		messageText: 'Positive Banner Message',
		onCloseClick: NOOP
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a negative sentiment',
		sentiment: 'negative',
		messageText: 'Negative Banner Message',
		onCloseClick: NOOP
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with an action',
		messageText: 'With One Action',
		onCloseClick: NOOP,
		actionProps: [{
			text: 'Action'
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with two actions',
		messageText: 'With Two Actions',
		onCloseClick: NOOP,
		actionProps: [{
			text: 'Action One'
		},
		{
			text: 'Action Two'
		}]
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP
}