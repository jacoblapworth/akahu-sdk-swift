const storiesWithVariationsKindName = 'Instances/XUITextArea';

const variations = [
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'default'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with default value',
		defaultValue: 'default value'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a label',
		label: 'Text area label'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with maxCharacters',
		maxCharacters: 240
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with a label and maxCharacters',
		maxCharacters: 240,
		label: 'Long text in a text area label with max characters'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with lots of rows',
		rows: 10
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with min rows',
		minRows: 1
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with max rows',
		maxRows: 5,
		defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor justo nibh, id posuere tellus tempor a. Aliquam at posuere dolor. Duis rhoncus fermentum tellus in malesuada. Pellentesque porttitor dui arcu. Curabitur lacinia vel quam vel sodales. Aenean orci magna, malesuada ac mauris ac, lacinia aliquam felis. Suspendisse potenti. Vestibulum ultrices mi risus, eget condimentum tellus fringilla et. Praesent eget purus quis purus congue tempus. Suspendisse blandit dapibus laoreet.'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'read only',
		readOnly: true,
		defaultValue: 'Lorem ipsum dolor sit amet'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with validation message and invalid',
		isInvalid: true,
		validationMessage: 'Lorem ipsum dolor sit amet'
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'borderless input',
		isBorderless: true,
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'with hint message',
		hintMessage: 'Lorem ipsum dolor sit amet',
	},
	{
		storyKind: storiesWithVariationsKindName,
		storyTitle: 'isDisabled',
		isDisabled: true
	}
]

module.exports = {
	storiesWithVariationsKindName,
	variations
}
