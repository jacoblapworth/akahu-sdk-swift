// Libs
import React, { Component } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select, object } from '@storybook/addon-knobs';

// Components we need to test with
import XUIToast from '../XUIToast';
import XUIToastMessage from '../XUIToastMessage';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import { sentimentMap } from '../private/constants';

import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';

import NOOP from '../../helpers/noop';

const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

class DetailedToast extends Component {
  render() {
    const { props } = this;

    const allActions =
      props.actionProps &&
      props.actionProps.map((action, i) => (
        <XUIToastAction href="#" key={i}>
          {action.text}
        </XUIToastAction>
      ));

    const childMessage = props.messageText ? (
      <XUIToastMessage>{props.messageText}</XUIToastMessage>
    ) : null;

    let childActions = !props.actionsAsProps ? (
      <XUIToastActions>{allActions}</XUIToastActions>
    ) : null;

    const clonedProps = { ...props };
    if (props.actionsAsProps) {
      clonedProps.actions = allActions;
    }

    if (props.usingXUIActions) {
      clonedProps.primaryAction = allActions[0];
      clonedProps.secondaryAction = allActions[1];
      clonedProps.message = props.message;
      childActions = null;
      delete clonedProps.actions;
    }

    return (
      <XUIToast {...clonedProps}>
        {childMessage}
        {childActions}
      </XUIToast>
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => {
  const sentiments = {
    '': 'No Sentiment',
  };

  Object.keys(sentimentMap).forEach(key => {
    sentiments[key] = ucFirst(key);
  });

  const sentiment = select('sentiment', sentiments);
  const selectedSentiment = sentiment !== '' ? sentiment : undefined;

  return (
    <DetailedToast
      actionProps={object('actions', [
        {
          text: 'Action',
        },
      ])}
      className={text('className', '')}
      closeButtonLabel="Close"
      hasDefaultLayout={boolean('hasDefaultLayout', true)}
      messageText={text('message', 'Message text')}
      onBlur={NOOP}
      onCloseClick={NOOP}
      onFocus={NOOP}
      onMouseLeave={NOOP}
      onMouseOver={NOOP}
      qaHook={text('qaHook', '')}
      role={text('role', 'status')}
      sentiment={selectedSentiment}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return (
      <DetailedToast
        closeButtonLabel="Close"
        onBlur={NOOP}
        onCloseClick={NOOP}
        onFocus={NOOP}
        onMouseLeave={NOOP}
        onMouseOver={NOOP}
        {...variationMinusStoryDetails}
      />
    );
  });
});
