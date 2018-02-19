const compositionKind = 'Compositions';

const storyNames = {
	dateDDInModal: 'Datepicker dropdown in a modal',
	dropDownInModal: 'Dropdown in a modal',
	multiDropDowns: 'Multiple dropdowns in a modal',
	formOnAPage: 'Form on a page',
	formLayout: 'Form layout',
	inifiniteStatefulPicklist: 'Infinite JS errors in StatefulPicklist render'
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
