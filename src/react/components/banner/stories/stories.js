// Libs
import React, { Component } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, object, array } from '@storybook/addon-knobs';

// Components we need to test with
import XUIBanner from '../XUIBanner';
import XUIBannerAction from '../XUIBannerAction';
import XUIBannerActions from '../XUIBannerActions';
import XUIBannerMessage from '../XUIBannerMessage';
import XUIBannerMessageDetail from '../XUIBannerMessageDetail';

import { variations, storiesWithVariationsKindName, NOOP } from './variations';

class DetailedBanner extends Component {
  render() {
    const { props } = this;
    const actions =
      props.actionProps &&
      props.actionProps.map((action, i) => (
        <XUIBannerAction href="#" key={i}>
          {action.text}
        </XUIBannerAction>
      ));
    const detail =
      props.detailItems && props.detailItems.length ? (
        <XUIBannerMessageDetail messageDetails={props.detailItems} />
      ) : null;
    const message = props.messageText ? (
      <XUIBannerMessage>{props.messageText}</XUIBannerMessage>
    ) : null;
    const builtActions = actions ? <XUIBannerActions>{actions}</XUIBannerActions> : null;

    return (
      <XUIBanner {...props}>
        {message}
        {detail}
        {builtActions}
      </XUIBanner>
    );
  }
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addParameters({ layout: 'centered' });
storiesWithKnobs.add('Playground', () => (
  <DetailedBanner
    actionProps={object('actions', [
      {
        text: 'Action',
      },
    ])}
    className={text('className', '')}
    closeButtonLabel="Close"
    detailItems={array('detailItems', [])}
    hasDefaultLayout={boolean('hasLayout', true)}
    messageText={text('messageText', "A Banner's Message")}
    onCloseClick={NOOP}
    qaHook={text('qaHook', '')}
  />
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  storiesWithVariations.add(variation.storyTitle, () => {
    const variationMinusStoryDetails = { ...variation };
    variationMinusStoryDetails.storyKind = undefined;
    variationMinusStoryDetails.storyTitle = undefined;

    return <DetailedBanner closeButtonLabel="Close" {...variationMinusStoryDetails} />;
  });
});
