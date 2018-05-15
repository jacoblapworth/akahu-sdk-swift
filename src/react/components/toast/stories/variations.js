const NOOP = require('../../helpers/noop');

const storiesWithVariationsKindName = 'Instances/XUIToast';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a positive sentiment',
		sentiment: 'positive',
		messageText: 'Positive Message',
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a negative sentiment',
		sentiment: 'negative',
		messageText: 'Negative Message',
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP
	},
	{
		storyKind: storiesWithVariationsKindName,
		messageText: 'Toast with an action',
		storyTitle: 'with an action',
		actionProps: [{
			text: 'Actions'
		}],
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP
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
		}],
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP
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
		}],
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP
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
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP,
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
		onCloseClick: NOOP,
		onMouseOver: NOOP,
		onMouseLeave: NOOP,
		usingXUIActions: true
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations,
	NOOP
}
