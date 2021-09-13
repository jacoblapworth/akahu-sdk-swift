// Libs
import React from 'react';

// Story book things

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

// Components we need to test with
import info from '@xero/xui-icon/icons/info';
import XUIDropdown, { XUIDropdownToggled } from '../../../dropdown';
import XUIPicklist, { XUIPickitem } from '../../../picklist';
import XUIButton, { XUIIconButton, XUISplitButtonGroup, XUISecondaryButton } from '../../../button';
import XUITextInput from '../../../textinput';
import { XUICompositionSplit } from '../../../compositions';
import { XUIPageHeader } from '../../../pageheader';
import XUITooltip from '../../../tooltip';
import ExampleToast from './components/ExampleToast';
import Example from './components/Example';
import ExampleNav from './components/ExampleNav';
import XUIActions from '../../../actions';
import XUIFixedFooterWIP from '../../../fixedfooter';
import FullPageStoryWrapper from '../../helpers/FullPageStoryWrapper';

import * as lists from '../../../components/helpers/list';
import { storyNames, compositionKind } from '../tests';

const buildDropdownPicklist = items => {
  const pickItems = items.map((text, id) => (
    <XUIPickitem id={text} isSelected={false} key={id}>
      {text}
    </XUIPickitem>
  ));
  return (
    <XUIDropdown>
      <XUIPicklist>{pickItems}</XUIPicklist>
    </XUIDropdown>
  );
};

const buildTrigger = text => <XUIButton hasCaret>{text}</XUIButton>;

const splitButtonExample = (
  <XUISplitButtonGroup variant="primary">
    <XUIButton size="small">Split action</XUIButton>
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown hasFixedWidth size="small">
          <XUIPicklist>
            <XUIPickitem id="aa" key="aa" value="aa">
              Option 1
            </XUIPickitem>
            <XUIPickitem id="bb" key="bb" value="bb">
              Option 2
            </XUIPickitem>
          </XUIPicklist>
        </XUIDropdown>
      }
      trigger={
        <XUISecondaryButton aria-label="Other actions" key="split" size="small" variant="primary" />
      }
    />
  </XUISplitButtonGroup>
);
<Example />;

const test = storiesOf(`${compositionKind}/${storyNames.layeringElements}`, module);

test.add(storyNames.layeringElements, () => {
  const body = document.querySelector('body.xui-container');
  if (body && body.style) {
    body.style.height = '200%';
  }
  const isUsingPortal = boolean('isUsingPortal', true);

  return (
    <FullPageStoryWrapper>
      <ExampleNav />
      {/* <div style={{ display: 'flex' }}> Simulates the Files header */}
      <XUIPageHeader
        actions={
          <XUIDropdownToggled
            dropdown={
              <XUIDropdown>
                <XUIPicklist>
                  <XUIPickitem id="11111">one</XUIPickitem>
                  <XUIPickitem id="22222">two</XUIPickitem>
                </XUIPicklist>
              </XUIDropdown>
            }
            trigger={<XUIIconButton ariaLabel="info" icon={info} />}
          />
        }
        contentClassName="xui-page-width-large"
        title="Something"
      />
      {/* </div> */}
      <XUICompositionSplit
        hasAutoSpaceAround={false}
        primary={
          <div style={{ padding: '20px' }}>
            <XUITooltip
              trigger={<XUIIconButton ariaLabel="Info" icon={info} />}
              triggerOnClick
              triggerOnHover={false}
            >
              Hello. I am a clue.
            </XUITooltip>
            <XUIDropdownToggled
              closeOnSelect={false}
              dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
              trigger={buildTrigger('Short Trigger')}
            />
            <ExampleToast />
            <Example settings={{ isUsingPortal }} textLabel="first">
              This is some Modal content.
              <XUITextInput fieldClassName="xui-column-6-of-12" isLabelHidden label="Input label" />
              <XUITooltip
                trigger={<XUIIconButton ariaLabel="Info" icon={info} />}
                triggerOnClick
                triggerOnHover={false}
              >
                Hello. I am a clue.
              </XUITooltip>
              <XUIDropdownToggled
                closeOnSelect={false}
                dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
                trigger={buildTrigger('Short Trigger')}
              />
              This is some Modal content.
              <XUITextInput isLabelHidden label="Input label" />
              <XUIDropdownToggled
                dropdown={buildDropdownPicklist(lists.MedListMedItems)}
                trigger={buildTrigger('Medium Dropdown Trigger')}
              />
              <XUITextInput isLabelHidden label="Input label" />
              <Example settings={{ size: 'xlarge', isUsingPortal }} textLabel="second">
                <div style={{ height: '1000px' }} />
              </Example>
              <ExampleToast />
            </Example>
          </div>
        }
        secondary={<div style={{ height: '100%', backgroundColor: 'white' }} />}
      />
      <XUIFixedFooterWIP>
        <XUIActions
          className="xui-padding-small"
          hasLayout
          isLinear
          primaryAction={splitButtonExample}
          secondaryAction={
            <XUIButton href="https://xui.xero.com" size="small">
              XUI
            </XUIButton>
          }
        />
      </XUIFixedFooterWIP>
    </FullPageStoryWrapper>
  );
});
