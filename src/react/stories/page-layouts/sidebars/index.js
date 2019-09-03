// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

import { storyNames, storyKind } from '../tests';

const test = storiesOf(storyKind, module);
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });

const layoutPrefix = 'xui-page-layout-sidebar-';
const buildSidebar = (side, suffix) => {
  suffix = suffix ? `-${suffix}` : '';
  const mainPanel = (
    <div className={`${layoutPrefix}${side}--main${suffix} xui-panel`}>
      <p style={{ minHeight: '300px' }}>Lots of main area stuff would go here</p>
    </div>
  );
  const sidebarPanel = (
    <div className={`${layoutPrefix}${side}--sidebar${suffix} xui-panel`}>
      <p style={{ minHeight: '200px' }}>Some sidebar content would go here</p>
    </div>
  );

  return (
    <div className={`xui-page-width-large ${layoutPrefix}${side} xui-margin-top-small`}>
      {side === 'left' ? sidebarPanel : mainPanel}
      {side === 'left' ? mainPanel : sidebarPanel}
    </div>
  );
};

test.add(storyNames.leftSidebar, () => buildSidebar('left'));

test.add(storyNames.leftSidebarSmall, () => buildSidebar('left', 'small'));

test.add(storyNames.rightSidebar, () => buildSidebar('right'));

test.add(storyNames.rightSidebarSmall, () => buildSidebar('right', 'small'));
