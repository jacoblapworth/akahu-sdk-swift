// Libs
import React, { Fragment } from 'react';

// Components we need to test with
import XUIFixedFooterWIP from '../XUIFixedFooterWIP';
import XUIActions from '../../../actions';
import XUIButton, { XUIIconButton } from '../../../button';
import XUIPanel from '../../../panel';
import { XUIContentBlock, XUIContentBlockItem } from '../../../contentblock';
import XUIAvatar from '../../../avatar';
import XUITag from '../../../tag';
import overflow from '@xero/xui-icon/icons/overflow';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import logReadyState from '../../../stories/helpers/log-ready-state';

import { variations, storiesWithVariationsKindName } from './variations';

const sampleText =
  "1. Some content could go here and we want to be sure it doesn't get hidden behind the sticky elements.2. Some content could go here and we want to be sure it doesn't get hidden behind the sticky elements.3. Some content could go here and we want to be sure it doesn't get hidden behind the sticky elements.4. Some content could go here and we want to be sure it doesn't get hidden behind the sticky elements.";
const sampleLongContentPanel = (
  <section
    className="xui-panel xui-margin-vertical xui-margin-horizontal-auto xui-padding"
    style={{ width: '200px' }}
  >
    {sampleText}
    <a href="http://google.com">Focusable element</a>
    {sampleText}
  </section>
);
const sampleActions = (
  <XUIActions
    className="xui-padding-small"
    primaryAction={
      <XUIButton onClick={() => console.log('primary click')} size="small" variant="primary">
        ActionCompletion
      </XUIButton>
    }
    secondaryAction={
      <XUIButton onClick={() => console.log('secondary click')} size="small">
        Action2Completion
      </XUIButton>
    }
  />
);

const description = 'Quinoa sustainable celiac deep v polaroid four loko disrupt.';
const overflowButton = <XUIIconButton ariaLabel="More options" icon={overflow} />;
const avatar = <XUIAvatar value="Tim Redmond" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>} />;
const tag = (
  <XUITag className="xui-margin-left-small" variant="positive">
    Positive tag
  </XUITag>
);

const sampleContentBlock = (
  <XUIContentBlock className="xui-panel">
    <XUIContentBlockItem
      action={actionButton}
      description={description}
      leftContent={avatar}
      overflow={overflowButton}
      pinnedValue="0.00"
      primaryHeading="Primary"
      secondaryHeading="Secondary"
      tagPosition="inline"
      tags={tag}
    />
  </XUIContentBlock>
);

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
  <Fragment>
    {sampleLongContentPanel}
    <XUIFixedFooterWIP qaHook={text('qaHook', '')}>{sampleActions}</XUIFixedFooterWIP>
  </Fragment>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
const fixedStories = storiesOf(storiesWithVariationsKindName, module);
fixedStories.add('Simple HTML fixed footer (BYO padding)', () => {
  return (
    <Fragment>
      <div
        className="xui-panel xui-margin-horizontal-auto xui-margin-bottom-5xlarge xui-padding xui-margin-top"
        style={{ width: '200px' }}
      >
        {sampleText}
        {sampleText}
      </div>
      <div className="xui-fixedfooter">Bottom fixed content</div>
    </Fragment>
  );
});

class ScrollToBottomWrapper extends React.PureComponent {
  componentDidMount() {
    setTimeout(() => {
      const { rootNode } = this;
      const scrollable = rootNode.parentElement.parentElement;
      scrollable.scrollTop = rootNode.clientHeight;
      logReadyState('xui-fixedfooter-ready-event');
    }, 100);
  }

  render() {
    return <div ref={node => (this.rootNode = node)}>{this.props.children}</div>;
  }
}

variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation;

  storiesWithVariations.add(storyTitle, () => {
    const { viewports, childContent, ...variationMinusStoryDetails } = props;
    const stickyChild =
      variation.childContent === 'contentBlock' ? sampleContentBlock : sampleActions;

    return (
      <ScrollToBottomWrapper>
        {sampleLongContentPanel}
        <XUIFixedFooterWIP {...variationMinusStoryDetails}>{stickyChild}</XUIFixedFooterWIP>
      </ScrollToBottomWrapper>
    );
  });
});
