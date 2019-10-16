// Libs
import React from 'react';

// Components we need to test with
import XUIIcon from '../../icon/XUIIcon';
import XUIBreadcrumbTrail from '../../pageheader/XUIBreadcrumbTrail';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import overflow from '@xero/xui-icon/icons/overflow';
import XUIActions from '../../actions/XUIActions';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

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

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  const { storyTitle, type } = variation;
  storiesWithVariations.add(storyTitle, () => {
    if (type === 'panel') {
      const heading = (
        <XUIPanelHeading>
          Hello there <XUIIcon icon={overflow} />
        </XUIPanelHeading>
      );
      return (
        <XUIPanel heading={heading}>
          <XUIPanelSection className="xui-padding-large" headerText="I'm a section header">
            <p>Some important text might go here.</p>
          </XUIPanelSection>
        </XUIPanel>
      );
    }
    if (type === 'panel-sidebar') {
      const heading = <XUIPanelHeading>{exampleBreadcrumb}</XUIPanelHeading>;
      const footer = (
        <XUIPanelFooter className="xui-padding-small">{buildActions()}</XUIPanelFooter>
      );
      return (
        <div style={{ minWidth: '700px' }}>
          <XUIPanel footer={footer} heading={heading} sidebar={exampleTabs}>
            <XUIPanelSection className="xui-padding-large" headerText="I'm a section header">
              <p>Some important text might go here.</p>
            </XUIPanelSection>
            <XUIPanelSection className="xui-padding-large">
              <p>Other critical info would go here.</p>
            </XUIPanelSection>
          </XUIPanel>
        </div>
      );
    }
  });
});
