const storyKind = 'Page Layouts';

const storyNames = {
	leftSidebarSmall: 'Left sidebar-small',
	leftSidebar: 'Left sidebar',
	rightSidebarSmall: 'Right sidebar-small',
	rightSidebar: 'Right sidebar',
};

const variations = [];

Object.keys(storyNames).forEach(name => {
	variations.push(
		{
			storyKind: storyKind,
			storyTitle: storyNames[name]
		}
	);
});


module.exports = {
	variations,
	storyNames,
	storyKind
};
