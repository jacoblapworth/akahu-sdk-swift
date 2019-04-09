const compositionKind = 'Components in Components';

const storyNames = {
	dateDDInModal: 'Datepicker dropdown in a modal',
	dropDownInModal: 'Dropdown in a modal',
	multiDropDowns: 'Multiple dropdowns in a modal',
	formOnAPage: 'Form on a page',
	formLayout: 'Form layout',
};

const nonBackstopStoryNames = {
	inifiniteStatefulPicklist: 'Infinite JS errors in StatefulPicklist render',
	modalInModal: 'Modal in a modal with dropdown',
	fiveNestedModals: 'Multiple nested modals',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
	variations.push(
		{
			storyKind: compositionKind,
			storyTitle: storyNames[name],
		},
	);
});

module.exports = {
	variations,
	storyNames,
	compositionKind,
	nonBackstopStoryNames,
};
