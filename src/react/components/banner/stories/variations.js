const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/XUIBanner';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a positive sentiment',
		sentiment: 'positive',
		messageText: 'Positive Banner Message',
		onCloseClick: NOOP,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a negative sentiment',
		sentiment: 'negative',
		messageText: 'Negative Banner Message',
		onCloseClick: NOOP,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with an action',
		messageText: 'With One Action',
		onCloseClick: NOOP,
		actionProps: [{
			text: 'Action',
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with two actions',
		messageText: 'With Two Actions',
		onCloseClick: NOOP,
		actionProps: [{
			text: 'Action One',
		},
		{
			text: 'Action Two',
		}],
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with two actions with long strings',
		messageText: 'With Two Actions But Really Really Long Strings',
		onCloseClick: NOOP,
		actionProps: [{
			text: 'Long long test string to see if this will break. Long long test string to see if this will break.' +
			'Long long test string to see if this will break. Long long test string to see if this will break.',
		},
		{
			text: 'Long long test string to see if this will break. Long long test string to see if this will break.' +
			 'Long long test string to see if this will break. Long long test string to see if this will break.',
		}],
	},
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP,
}