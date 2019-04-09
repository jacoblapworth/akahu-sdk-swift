const privateConsts = require('../../positioning/private/constants');

const storiesWithVariationsKindName = 'Instances/XUITooltip';
const { positionOptions } = privateConsts;

const longTipText = "So often we avoid running water, and running water is a lot of fun. Isn't that fantastic? You can just push a little tree out of your brush like that.";

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is Default',
		triggerType: 'button',
		tipText: 'tip with default settings',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'flip from top-right',
		triggerType: 'button',
		preferredPosition: 'top-right',
		styles: {
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'flip from left-bottom',
		triggerType: 'button',
		preferredPosition: 'left-bottom',
		styles: {
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'flip from right center',
		triggerType: 'button',
		preferredPosition: 'right',
		styles: {
			width: '100%',
			height: '100%',
			alignItems: 'flex-end',
			justifyContent: 'flex-end',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'flip from bottom left',
		triggerType: 'button',
		preferredPosition: 'bottom-left',
		styles: {
			width: '100%',
			height: '100%',
			alignItems: 'flex-end',
			justifyContent: 'flex-end',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'flip from side to vertical',
		triggerType: 'button',
		preferredPosition: 'right',
		styles: {
			width: '100%',
		},
		wrapperClassName: 'xui-u-fullwidth',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a longer tip',
		triggerType: 'button',
		tipText: longTipText,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a longer tip to the side',
		triggerType: 'button',
		preferredPosition: 'right',
		tipText: longTipText,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'inline with text',
		triggerType: 'text',
		styles: {
			padding: '10px',
		},
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'on an icon',
		triggerType: 'icon',
		preferredPosition: 'right',
	},
];

positionOptions.forEach(position => {
	variations.push({
		storyKind: storiesWithVariationsKindName,
		storyTitle: position,
		triggerType: 'button',
		preferredPosition: position,
		tipText: `tip at ${position}`,
	});
});


module.exports = {
	storiesWithVariationsKindName,
	variations,
};
