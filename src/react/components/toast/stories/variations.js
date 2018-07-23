const storiesWithVariationsKindName = 'Instances/XUIToast';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a positive sentiment',
		sentiment: 'positive',
		messageText: 'Positive Message'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a negative sentiment',
		sentiment: 'negative',
		messageText: 'Negative Message'
	},
	{
		storyKind: storiesWithVariationsKindName,
		messageText: 'Toast with an action',
		storyTitle: 'with an action',
		actionProps: [{
			text: 'Actions'
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		messageText: 'Toast with two small actions',
		storyTitle: 'with two small actions',
		actionProps: [
			{ text: 'Action 1' },
			{ text: 'Action 2' }
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		messageText: 'Toast with two medium actions',
		storyTitle: 'with two medium actions',
		actionProps: [
			{ text: 'Action 1 medium' },
			{ text: 'Action 2 medium' }
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		messageText: 'Toast with two long actions',
		storyTitle: 'with two long actions',
		actionProps: [
			{ text: 'Action One with a large amount of text to force wrapping' },
			{ text: 'Action Two with a large amount of text to force wrapping' }
		]
	},
	{
		storyKind: storiesWithVariationsKindName,
		message: 'Toast with two actions',
		storyTitle: 'message as prop and two actions',
		actionProps: [{
			text: 'Action One'
		},
		{
			text: 'Action Two'
		}]
	},
	{
		storyKind: storiesWithVariationsKindName,
		message: 'Toast with two actions',
		storyTitle: 'message as prop and two actions as props',
		actionProps: [{
			text: 'Action ONE'
		},
		{
			text: 'Action TWO'
		}],
		actionsAsProps: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		message: 'Toast using XUIActions under the hood',
		storyTitle: 'using XUIActions',
		actionProps: [{
			text: 'Action ONE'
		},
		{
			text: 'Action TWO'
		}],
		usingXUIActions: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
}
