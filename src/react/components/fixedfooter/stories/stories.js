import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import overflow from '@xero/xui-icon/icons/overflow';
import React from 'react';
import XUIActions from '../../../actions';
import XUIAvatar from '../../../avatar';
import XUIButton, { XUIIconButton } from '../../../button';
import { XUIContentBlock, XUIContentBlockItem } from '../../../contentblock';
import logReadyState from '../../../stories/helpers/log-ready-state';
import XUITag from '../../../tag';
import XUIFixedFooterWIP from '../XUIFixedFooterWIP';
import { storiesWithKnobsKindName, storiesWithVariationsKindName, variations } from './variations';

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
      <XUIButton size="small" variant="main">
        ActionCompletion
      </XUIButton>
    }
    secondaryAction={<XUIButton size="small">Action2Completion</XUIButton>}
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

const Example = () => {
  const [showFixedFooter, setShowFixedFooter] = React.useState(false);
  return (
    <>
      <XUIButton
        onClick={() => {
          setShowFixedFooter(!showFixedFooter);
        }}
      >
        Toggle fixed footer
      </XUIButton>
      {showFixedFooter && (
        <XUIFixedFooterWIP>
          <XUIActions
            className="xui-padding-small"
            isLinear
            primaryAction={
              <span>
                <XUIButton className="xui-margin-right-small" hasCaret size="small">
                  Save as
                </XUIButton>
                <XUIButton className="xui-margin-right-small" hasCaret size="small">
                  Export
                </XUIButton>
                <XUIButton onClick={() => console.log('primary click')} size="small" variant="main">
                  Save
                </XUIButton>
              </span>
            }
            secondaryAction={
              <XUIButton onClick={() => console.log('secondary click')} size="small">
                Edit
              </XUIButton>
            }
          />
        </XUIFixedFooterWIP>
      )}
    </>
  );
};

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground', () => <Example />);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
const fixedStories = storiesOf(storiesWithVariationsKindName, module);
fixedStories.add('Simple HTML fixed footer (BYO padding)', () => (
  <>
    <div
      className="xui-panel xui-margin-horizontal-auto xui-margin-bottom-5xlarge xui-padding xui-margin-top"
      style={{ width: '200px' }}
    >
      {sampleText}
      {sampleText}
    </div>
    <div className="xui-fixedfooter">Bottom fixed content</div>
  </>
));

class ScrollToBottomWrapper extends React.PureComponent {
  rootNode = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      const { rootNode } = this;
      const scrollable = rootNode.current?.parentElement.parentElement;
      scrollable.style.position = '';
      scrollable.scrollTop = rootNode.current?.clientHeight;

      logReadyState('xui-fixedfooter-ready-event');
    }, 100);
  }

  render() {
    return <div ref={this.rootNode}>{this.props.children}</div>;
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
