// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select, number } from '@storybook/addon-knobs';

// Components we need to test with
import info from '@xero/xui-icon/icons/info';
import XUITooltip from '../XUITooltip';
import XUITextInput from '../../textInput/XUITextInput';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';

import { variations, storiesWithVariationsKindName } from './variations';
import { positionOptions } from '../../positioning/private/constants';
import centered from '../../../../../.storybook/decorators/xuiResponsiveCenter';

const createTriggerInput = props => (
  <XUITextInput isLabelHidden label="Input label" placeholder="Placeholder text" {...props} />
);

const createTriggerButton = () => <XUIButton fullWidth="always">A button</XUIButton>;

const createHandlerTriggerButton = () => {
  const clickHandl = () => {
    console.log('click');
  };
  const focusHandl = () => {
    console.log('focus');
  };
  const blurHandl = () => {
    console.log('blur');
  };
  return (
    <XUIButton fullWidth="always" onBlur={blurHandl} onClick={clickHandl} onFocus={focusHandl}>
      No tip on click
    </XUIButton>
  );
};

const createTriggerLink = () => (
  <a href="https://www.xero.com" rel="noopener noreferrer" target="_blank">
    A link
  </a>
);

const createTriggerIcon = () => <XUIIconButton ariaLabel="Info" icon={info} />;

const createTriggerSpan = () => (
  <span style={{ textDecoration: 'underline' }}>Beauty is everywhere</span>
);

const createParaWithInlineTrigger = props => (
  <p style={{ marginTop: 0 }}>
    So often we avoid running water, and running water is a lot of fun. Isn&apos;t that fantastic?
    You can just push a little tree out of your brush like that. Look around, look at what we have.{' '}
    <XUITooltip trigger={createTriggerSpan()} {...props}>
      Inline triggers
    </XUITooltip>
    , you only have to look to see it.
  </p>
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const props = {
    triggerOnClick: boolean('triggerOnClick', false),
    triggerOnFocus: boolean('triggerOnFocus', false),
    triggerOnHover: boolean('triggerOnHover', true),
    preferredPosition: select('preferredPosition', positionOptions, 'right-center'),
    isDisabled: boolean('isDisabled', false),
    openDelay: number('openDelay', 500),
    closeDelay: number('closeDelay', 100),
    maxWidth: number('maxWidth', 250),
    maxHeight: number('maxHeight', 0) ? number('maxHeight', 0) : undefined,
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          alignItems: 'flex-start',
          display: 'inline-flex',
          height: '20%',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <XUITooltip trigger={createTriggerInput()} {...props}>
          Hello. I am a clue.
        </XUITooltip>
        <XUITooltip trigger={createHandlerTriggerButton()} {...props}>
          Clue number two.
        </XUITooltip>
        <XUITooltip trigger={createTriggerInput()} {...props}>
          Why not a few?
        </XUITooltip>
      </div>
      <div
        style={{
          alignItems: 'flex-start',
          display: 'inline-flex',
          height: '20%',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <XUITooltip trigger={createTriggerInput()} wrapperClassName="xui-u-fullwidth" {...props}>
          What do I do...
        </XUITooltip>
      </div>
      <div style={{ width: '100%', height: '20%' }}>
        {createParaWithInlineTrigger(props)}
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          Inline triggers
        </XUITooltip>
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          Inline triggers
        </XUITooltip>
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          Inline triggers
        </XUITooltip>
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          Inline triggers
        </XUITooltip>
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          height: '20%',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <XUITooltip trigger={createTriggerInput()} {...props}>
          <span>
            Here there was once a paragraph of content that had some kind of explanation to go with
            it.
          </span>
        </XUITooltip>
        <XUITooltip trigger={createTriggerInput()} {...props}>
          <div style={{ height: '200px' }}>
            <span>
              Here there was once a paragraph of content that had some kind of explanation to go
              with it.
            </span>
          </div>
        </XUITooltip>
        <XUITooltip trigger={createTriggerInput()} {...props}>
          <span>
            Here there was once a paragraph of content that had some kind of explanation to go with
            it.
          </span>
        </XUITooltip>
      </div>
      <div
        style={{
          alignItems: 'flex-end',
          display: 'inline-flex',
          height: '20%',
          justifyContent: 'space-between',
          justifyItems: 'flex-end',
          width: '100%',
        }}
      >
        <XUITooltip trigger={createTriggerLink()} {...props}>
          <span>
            Here there was once a paragraph of content that had some kind of explanation to go with
            it.
          </span>
        </XUITooltip>
        <XUITooltip trigger={createTriggerInput()} {...props}>
          {props.preferredPosition}
        </XUITooltip>
        <XUITooltip trigger={createTriggerInput()} {...props}>
          <span>
            Here there was once a paragraph of content that had some kind of explanation to go with
            it.
          </span>
        </XUITooltip>
      </div>
      <div style={{ position: 'fixed', left: '40px', top: '300px' }}>
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          My trigger is fixed position.
        </XUITooltip>
      </div>
      <div style={{ position: 'absolute', right: '100px', top: '340px' }}>
        <XUITooltip trigger={createTriggerIcon()} {...props}>
          My trigger is absolutely positioned.
        </XUITooltip>
      </div>
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    const { triggerType, tipText } = variationMinusStoryDetails;
    const styles = variationMinusStoryDetails.styles || {
      alignItems: 'center',
      justifyContent: 'center',
    };
    variationMinusStoryDetails.triggerType = undefined;
    variationMinusStoryDetails.tipText = undefined;
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;
    variationMinusStoryDetails.isHidden = false;

    if (triggerType === 'icon') {
      variationMinusStoryDetails.trigger = createTriggerIcon();
    } else if (triggerType === 'button') {
      variationMinusStoryDetails.trigger = createTriggerButton();
    } else if (triggerType === 'input') {
      variationMinusStoryDetails.trigger = createTriggerInput();
    }
    let content;
    if (triggerType !== 'text') {
      content = (
        <XUITooltip {...variationMinusStoryDetails}>{tipText || variation.storyTitle}</XUITooltip>
      );
    } else {
      content = createParaWithInlineTrigger(variationMinusStoryDetails);
    }

    return (
      <div
        style={{
          width: '600px',
          height: '400px',
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'flex',
          ...styles,
        }}
      >
        {content}
      </div>
    );
  });
});
