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
		messageText: 'Toast with two actions',
		storyTitle: 'with two actions',
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
