// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

// Components we need to test with
import overflow from '@xero/xui-icon/icons/overflow';
import XUIIcon from '../../icon/XUIIcon';
import XUIBreadcrumbTrail from '../../pageheader/XUIBreadcrumbTrail';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../../actions/XUIActions';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';

import { variations, storiesWithVariationsKindName } from './variations';

const exampleTabs = (
  <XUIPicklist secondaryProps={{ role: 'menu' }}>
    <XUIPickitem ariaRole="menuitem" id="1">
      Tab 1
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="2" isSelected>
      Tab 2
    </XUIPickitem>
    <XUIPickitem ariaRole="menuitem" id="3">
      This is tab 3
    </XUIPickitem>
  </XUIPicklist>
);

const buildActions = (props = {}) => (
  <XUIActions
    hasLayout={false}
    primaryAction={
      <XUIButton className="xui-margin-left-xsmall" size="small" variant="primary">
        {props.longContent ? 'ActionCompletion' : 'One'}
      </XUIButton>
    }
    secondaryAction={
      <XUIButton size="small">{props.longContent ? 'Action2Completion' : 'Two'}</XUIButton>
    }
    {...props}
  />
);

const sampleBreadcrumb = [
  <span key="1" onClick={() => alert('hello')} onKeyDown={() => {}} role="link" tabIndex="0">
    hello
  </span>,
  { label: 'hiya I have multiple words', href: '#2' },
  { label: 'yo' },
];
const exampleBreadcrumb = <XUIBreadcrumbTrail breadcrumbs={sampleBreadcrumb} />;

const heading = (
  <XUIPanelHeading>
    Hello there <XUIIcon icon={overflow} />
  </XUIPanelHeading>
);
const footer = <XUIPanelFooter className="xui-padding-small">{buildActions()}</XUIPanelFooter>;
const section = settings => {
  return (
    <XUIPanelSection {...settings}>
      <p className="xui-padding-large">Some important text might go here.</p>
    </XUIPanelSection>
  );
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.add('Playground', () => {
  const hasHeading = boolean('Has panel heading?', false);
  const hasFooter = boolean('Has panel footer?', false);
  const panelContent = <p className="xui-padding-large">Some important text might go here.</p>;
  const builtSection = boolean('Has panel section?', false);
  const sectionHeading = builtSection && text('Section header', '');
  const settings = {
    heading: hasHeading ? heading : undefined,
    footer: hasFooter ? footer : undefined,
  };
  return (
    <XUIPanel {...settings}>
      {!builtSection && panelContent}
      {builtSection && section({ heading: sectionHeading })}
    </XUIPanel>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  const { storyTitle, type } = variation;
  storiesWithVariations.add(storyTitle, () => {
    if (type === 'panel') {
      return <XUIPanel heading={heading}>{section({ heading: "I'm a section header" })}</XUIPanel>;
    }
    if (type === 'panel-sidebar') {
      const heading = <XUIPanelHeading>{exampleBreadcrumb}</XUIPanelHeading>;
      return (
        <div style={{ minWidth: '700px' }}>
          <XUIPanel footer={footer} heading={heading} sidebar={exampleTabs}>
            <XUIPanelSection className="xui-padding-large" heading="I'm a section header">
              <p>Some important text might go here.</p>
            </XUIPanelSection>
            <XUIPanelSection className="xui-padding-large">
              <p>Other critical info would go here.</p>
            </XUIPanelSection>
          </XUIPanel>
        </div>
      );
    }
    if (type === 'panel-header-node') {
      return (
        <XUIPanel heading={heading}>
          {section({ heading: <div>This is a section heading</div> })}
        </XUIPanel>
      );
    }
  });
});
