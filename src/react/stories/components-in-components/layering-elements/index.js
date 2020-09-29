// Libs
import React, { Component, PureComponent, Fragment } from 'react';

// Story book things

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

// Components we need to test with
import info from '@xero/xui-icon/icons/info';
import DropDown, { DropDownToggled } from '../../../dropdown';
import Picklist, { Pickitem } from '../../../picklist';
import XUIButton, { XUIButtonCaret, XUIIconButton } from '../../../button';
import XUITextInput from '../../../textinput';
import { XUICompositionDetail } from '../../../compositions';
import { XUIPageHeader } from '../../../pageheader';
import XUITooltip from '../../../tooltip';
import ExampleToast from './components/ExampleToast';
import Example from './components/Example';
import * as lists from '../../../components/helpers/list';
import { nonBackstopStoryNames, compositionKind } from '../tests';

const buildDropdownPicklist = items => {
  const pickItems = items.map((text, id) => (
    <Pickitem id={text} isSelected={false} key={id}>
      {text}
    </Pickitem>
  ));
  return (
    <DropDown>
      <Picklist>{pickItems}</Picklist>
    </DropDown>
  );
};

const buildTrigger = text => (
  <XUIButton>
    {text}
    <XUIButtonCaret />
  </XUIButton>
);
<Example />;

const test = storiesOf(compositionKind, module);

test.add(nonBackstopStoryNames.layeringElements, () => {
  const body = document.querySelector('body.xui-container');
  if (body && body.style) {
    body.style.height = '200%';
  }
  const isUsingPortal = boolean('isUsingPortal', true);
  return (
    <>
      <XUIPageHeader contentClassName="xui-page-width-large" title="Something" />
      <XUICompositionDetail
        detail={
          <>
            <XUITooltip
              trigger={<XUIIconButton ariaLabel="Info" icon={info} />}
              triggerOnClick
              triggerOnHover={false}
            >
              Hello. I am a clue.
            </XUITooltip>
            <DropDownToggled
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
              <DropDownToggled
                closeOnSelect={false}
                dropdown={buildDropdownPicklist(lists.ShortListShortItems)}
                trigger={buildTrigger('Short Trigger')}
              />
              This is some Modal content.
              <XUITextInput isLabelHidden label="Input label" />
              <DropDownToggled
                dropdown={buildDropdownPicklist(lists.MedListMedItems)}
                trigger={buildTrigger('Medium Dropdown Trigger')}
              />
              <XUITextInput isLabelHidden label="Input label" />
              <Example settings={{ size: 'xlarge', isUsingPortal }} textLabel="second">
                <div style={{ height: '1000px' }} />
              </Example>
              <ExampleToast />
            </Example>
          </>
        }
      />
    </>
  );
});
