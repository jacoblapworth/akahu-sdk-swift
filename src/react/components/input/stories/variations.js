const storiesWithVariationsKindName = 'Instances/XUIInput';
const search = require('@xero/xui-icon/icons/search').default;
const facebook = require('@xero/xui-icon/icons/social-facebook').default;
const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is plain',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is borderless',
		isBorderless: true
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'is invalid',
		isInvalid: true,
		validationMessage: 'invalid content'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a hint message and placeholder',
		hintMessage: 'here\'s a hint',
		inputAttributes: {
			placeholder: 'This is a search box'
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a right hand button',
		hasClearButton: true,
		inputAttributes: {
				defaultValue: 'default text'
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left hand icon',
		iconAttributes: {
				path: search
		}
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'has a left hand icon with wrapping color',
		iconAttributes: {
				path: facebook,
				wrapperColor: 'facebook',
				color: 'white'
		}
	}
];

module.exports = {
	storiesWithVariationsKindName,
	variations
};
