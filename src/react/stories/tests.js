const compositionKind = 'Compositions';

const storyNames = {
	dateDDInModal: 'Datepicker dropdown in a modal',
	dropDownInModal: 'Dropdown in a modal',
	multiDropDowns: 'Multiple dropdowns in a modal'
};

const variations = [];

Object.keys(storyNames).forEach(name => {
	variations.push(
		{
			storyKind: compositionKind,
			storyTitle: storyNames[name]
		}
	);
});


module.exports = {
	variations,
	storyNames,
	compositionKind
};
