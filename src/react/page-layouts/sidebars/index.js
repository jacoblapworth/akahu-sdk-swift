// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import readme from './README.md';

import { storyNames, storyKind } from '../tests';

const test = storiesOf(storyKind, module);
test.addDecorator(withReadme(readme));

const layoutPrefix = "xui-page-layout-sidebar-";
const buildSidebar = (side, suffix) => {
	suffix = suffix ? `-${suffix}` : "";
	const buildMain = () => {
		return (
			<div className={`${layoutPrefix}${side}--main${suffix} xui-panel`}>
				<p style={{minHeight: "300px"}}>Lots of main area stuff would go here</p>
			</div>
	)};
	const buildSidebarInner = () => {
		return (
			<div className={`${layoutPrefix}${side}--sidebar${suffix} xui-panel xui-margin-horizontal-small`}>
				<p style={{minHeight: "200px"}}>Some sidebar content would go here</p>
			</div>
	)};

	return (
		<div className={`xui-page-width-large ${layoutPrefix}${side} xui-margin-top-small`}>
			{side === 'left' ? buildSidebarInner() : buildMain()}
			{side === 'left' ? buildMain() : buildSidebarInner()}
		</div>
	);
};

test.add(storyNames.leftSidebar, () => {
	return buildSidebar('left');
});

test.add(storyNames.leftSidebarSmall, () => {
	return buildSidebar('left', 'small');
});

test.add(storyNames.rightSidebar, () => {
	return buildSidebar('right');
});

test.add(storyNames.rightSidebarSmall, () => {
	return buildSidebar('right', 'small');
});
