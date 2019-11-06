import React from 'react';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIActions from '../../actions/XUIActions';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import overflow from '@xero/xui-icon/icons/overflow';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI ContentBlock and ContentBlockItem/>', () => {
  const qaHook = 'qaHook';
  const testPrimaryHeading = 'test primary heading';

  it('renders the base content block with no children', () => {
    const testContentblock = renderer.create(<XUIContentBlock />);
    expect(testContentblock).toMatchSnapshot();
  });
  it('renders content block with content block item child and headings', () => {
    const testContentblockWithChild = renderer.create(
      <XUIContentBlock>
        <XUIContentBlockItem primaryHeading={testPrimaryHeading} />
      </XUIContentBlock>,
    );
    expect(testContentblockWithChild).toMatchSnapshot();
  });
  it('renders extra content block item classes that are passed in', () => {
    const tag = shallow(<XUIContentBlockItem className="testClass" />);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders content block item without default layout', () => {
    const wrapper = shallow(<XUIContentBlockItem hasLayout={false} />);
    expect(wrapper.hasClass('xui-contentblockitem-layout')).toEqual(false);
  });
  it('renders content block item with everything', () => {
    const testOverflow = <XUIIconButton icon={overflow} ariaLabel="Overflow Menu" />;
    const testLeftContent = (
      <abbr className="xui-avatar xui-avatar-color-2" role="presentation">
        P
      </abbr>
    );
    const testActions = (
      <XUIActions
        primaryAction={
          <XUIButton key="one" variant="primary" size="small">
            One
          </XUIButton>
        }
        secondaryAction={
          <XUIButton key="two" size="small">
            Two
          </XUIButton>
        }
      />
    );
    const testTag = (
      <span className="xui-tag xui-tag-positive xui-margin-left-small">Positive</span>
    );

    const testContentblockWithEverything = renderer.create(
      <XUIContentBlock>
        <XUIContentBlockItem
          isRowLink
          hasTopRadius
          hasBottomRadius
          primaryHeading={testPrimaryHeading}
          secondaryHeading="test secondary heading"
          overflow={testOverflow}
          leftContent={testLeftContent}
          actions={testActions}
          pinnedValue="0.00"
          tags={testTag}
        />
      </XUIContentBlock>,
    );
    expect(testContentblockWithEverything).toMatchSnapshot();
  });

  it('renders content block item tag position description by default', () => {
    const testOverflow = <XUIIconButton icon={overflow} ariaLabel="Overflow Menu" />;
    const testLeftContent = (
      <abbr className="xui-avatar xui-avatar-color-2" role="presentation">
        P
      </abbr>
    );
    const testActions = (
      <XUIActions
        primaryAction={
          <XUIButton key="one" variant="primary" size="small">
            One
          </XUIButton>
        }
        secondaryAction={
          <XUIButton key="two" size="small">
            Two
          </XUIButton>
        }
      />
    );
    const testTag = (
      <span className="xui-tag xui-tag-positive xui-margin-left-small">Positive</span>
    );

    const testContentblockWithEverything = renderer.create(
      <XUIContentBlock>
        <XUIContentBlockItem
          isRowLink
          hasTopRadius
          hasBottomRadius
          primaryHeading={testPrimaryHeading}
          secondaryHeading="test secondary heading"
          overflow={testOverflow}
          leftContent={testLeftContent}
          actions={testActions}
          pinnedValue="0.00"
          tags={testTag}
        />
      </XUIContentBlock>,
    );
    expect(testContentblockWithEverything).toMatchSnapshot();
  });

  it('renders content block item tag position inline', () => {
    const testOverflow = <XUIIconButton icon={overflow} ariaLabel="Overflow Menu" />;
    const testLeftContent = (
      <abbr className="xui-avatar xui-avatar-color-2" role="presentation">
        P
      </abbr>
    );
    const testActions = (
      <XUIActions
        primaryAction={
          <XUIButton key="one" variant="primary" size="small">
            One
          </XUIButton>
        }
        secondaryAction={
          <XUIButton key="two" size="small">
            Two
          </XUIButton>
        }
      />
    );
    const testTag = (
      <span className="xui-tag xui-tag-positive xui-margin-left-small">Positive</span>
    );

    const testContentblockWithEverything = renderer.create(
      <XUIContentBlock>
        <XUIContentBlockItem
          isRowLink
          hasTopRadius
          hasBottomRadius
          primaryHeading={testPrimaryHeading}
          secondaryHeading="test secondary heading"
          overflow={testOverflow}
          leftContent={testLeftContent}
          actions={testActions}
          pinnedValue="0.00"
          tags={testTag}
          tagPosition="inline"
        />
      </XUIContentBlock>,
    );
    expect(testContentblockWithEverything).toMatchSnapshot();
  });

  it('renders content block item tag position right', () => {
    const testOverflow = <XUIIconButton icon={overflow} ariaLabel="Overflow Menu" />;
    const testLeftContent = (
      <abbr className="xui-avatar xui-avatar-color-2" role="presentation">
        P
      </abbr>
    );
    const testActions = (
      <XUIActions
        primaryAction={
          <XUIButton key="one" variant="primary" size="small">
            One
          </XUIButton>
        }
        secondaryAction={
          <XUIButton key="two" size="small">
            Two
          </XUIButton>
        }
      />
    );
    const testTag = (
      <span className="xui-tag xui-tag-positive xui-margin-left-small">Positive</span>
    );
    const testHrefProp = '#';

    const testContentblockWithEverything = renderer.create(
      <XUIContentBlock>
        <XUIContentBlockItem
          isRowLink
          hasTopRadius
          hasBottomRadius
          primaryHeading={testPrimaryHeading}
          secondaryHeading="test secondary heading"
          overflow={testOverflow}
          leftContent={testLeftContent}
          actions={testActions}
          pinnedValue="0.00"
          tags={testTag}
          tagPosition="right"
          tag={testTag}
          href={testHrefProp}
        />
      </XUIContentBlock>,
    );
    expect(testContentblockWithEverything).toMatchSnapshot();
  });
  it('renders content block item main content as anchor when onKeyDown prop is passed', () => {
    const testOnKeyDownCallback = () => {};
    const wrapper = renderer.create(<XUIContentBlockItem onKeyDown={testOnKeyDownCallback} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('invokes callback passed to onClick prop', () => {
    const testCallback = jest.fn();
    const wrapper = shallow(
      <XUIContentBlockItem primaryHeading={testPrimaryHeading} onClick={testCallback} />,
    );
    wrapper.find('[role="button"]').simulate('click');
    expect(testCallback).toHaveBeenCalledTimes(1);
  });
  it('renders content block and content block item with automation id when qaHook prop is passed in', () => {
    const wrapper = renderer.create(
      <XUIContentBlock qaHook={qaHook}>
        <XUIContentBlockItem qaHook={qaHook} />
      </XUIContentBlock>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
