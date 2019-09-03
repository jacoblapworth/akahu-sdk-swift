// Libs
import React, { Component } from 'react';

// Components we need to test with
import XUIToast from '../XUIToast';
import XUIToastMessage from '../XUIToastMessage';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import { sentimentMap } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { variations, storiesWithVariationsKindName } from './variations';

const NOOP = () => {};

const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

class DetailedToast extends Component {
  render() {
    const { props } = this;

    const allActions =
      props.actionProps &&
      props.actionProps.map((action, i) => (
        <XUIToastAction key={i} href="#">
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

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
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
      role={text('role', 'status')}
      sentiment={selectedSentiment}
      qaHook={text('qaHook', '')}
      onCloseClick={NOOP}
      onMouseOver={NOOP}
      onMouseLeave={NOOP}
      onFocus={NOOP}
      onBlur={NOOP}
      defaultLayout={boolean('defaultLayout', true)}
      className={text('className', '')}
      messageText={text('message', 'Message text')}
      actionProps={object('actions', [
        {
          text: 'Action',
        },
      ])}
    />
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return (
      <DetailedToast
        onCloseClick={NOOP}
        onMouseOver={NOOP}
        onMouseLeave={NOOP}
        onFocus={NOOP}
        onBlur={NOOP}
        {...variationMinusStoryDetails}
      />
    );
  });
});
