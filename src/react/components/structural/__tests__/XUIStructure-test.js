import React from 'react';
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import XUIPageHeader from '../XUIPageHeader';
import XUIBreadcrumb from '../XUIBreadcrumb';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import XUIIconButton from '../../button/XUIIconButton';
import XUIActions from '../XUIActions';
import XUIOverviewBlock from '../XUIOverviewBlock';
import XUIOverviewSection from '../XUIOverviewSection';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';
import XUIContentBlock from '../XUIContentBlock';
import XUIContentBlockItem from '../XUIContentBlockItem';
import XUIIcon from '../../icon/XUIIcon';
import overflow from '@xero/xui-icon/icons/overflow';
import { rowVariants, columnShortNames, overviewSentiments } from '../private/constants';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI Structure/>', () => {
  const qaHook = 'qaHook';
  const primary = <XUIButton>Primary</XUIButton>;
  const secondary = <XUIButton>Secondary</XUIButton>;
  const tabs = (
    <XUIPicklist>
      <XUIPickitem id="1">Tab 1</XUIPickitem>
      <XUIPickitem id="2" isSelected={true}>
        Tab 2
      </XUIPickitem>
      <XUIPickitem id="3">This is tab 3</XUIPickitem>
    </XUIPicklist>
  );
  describe('Rows and columns:', () => {
    it('renders the base row with no extra settings passed', () => {
      const testRow = renderer.create(<XUIRow>Testing 💩</XUIRow>);
      expect(testRow).toMatchSnapshot();
    });
    it('renders the base column with no extra settings passed', () => {
      const testCol = renderer.create(<XUIColumn>Testing 💩</XUIColumn>);
      expect(testCol).toMatchSnapshot();
    });
    it('renders with the correct row variant classes', () => {
      Object.keys(rowVariants).forEach(variant => {
        const tag = shallow(<XUIRow variant={variant}>Testing 💩</XUIRow>);
        if (rowVariants[variant]) {
          expect(tag.hasClass(`xui-row-${rowVariants[variant]}`)).toEqual(true);
        }
      });
    });
    it('renders with the correct column width classes, from shorthand', () => {
      Object.keys(columnShortNames).forEach(shorthand => {
        const tag = shallow(<XUIColumn gridColumns={shorthand}>Testing 💩</XUIColumn>);
        expect(tag.hasClass(`xui-column-${columnShortNames[shorthand]}-of-12`)).toEqual(true);
      });
    });
    it('renders the column with breakpoint-dependent column widths, if provided', () => {
      const testCol = renderer.create(
        <XUIColumn gridColumnsSmallUp="3" gridColumnsLargeUp="6">
          Testing 💩
        </XUIColumn>,
      );
      expect(testCol).toMatchSnapshot();
    });
    it('renders row classes that are passed in', () => {
      const wrapper = mount(<XUIRow className="testClass">Testing 💩</XUIRow>);
      const tag = wrapper.find(XUIRow);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders column classes that are passed in', () => {
      const wrapper = mount(<XUIColumn className="testClass">Testing 💩</XUIColumn>);
      const tag = wrapper.find(XUIColumn);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders column with automation id when qaHook prop is passed in ', () => {
      const wrapper = renderer.create(<XUIColumn qaHook={qaHook} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders row with automation id when qaHook prop is passed in', () => {
      const wrapper = renderer.create(<XUIRow qaHook={qaHook} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Actions:', () => {
    it('renders the simplest actions with no extra settings passed', () => {
      const testActions = renderer.create(
        <XUIActions primary={primary} secondary={secondary}>
          Testing 💩
        </XUIActions>,
      );
      expect(testActions).toMatchSnapshot();
    });
    it('renders extra actions classes that are passed in', () => {
      const wrapper = mount(<XUIActions primary={primary} className="testClass" />);
      const tag = wrapper.find(XUIActions);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders actions as a linear type layout', () => {
      const wrapper = mount(<XUIActions primary={primary} secondary={secondary} isLinear={true} />);
      expect(wrapper.find('.xui-actions-linear').length).toBe(1);
    });
    it('renders actions without default layout', () => {
      const wrapper = mount(<XUIActions primary={primary} hasLayout={false} />);
      expect(wrapper.find('.xui-actions-layout').length).toBe(0);
    });
    it('renders actions in a different tag, if supplied', () => {
      const wrapper = mount(<XUIActions primary={primary} tagName="header" />);
      const tag = wrapper.find(XUIActions);
      expect(tag.childAt(0).type()).toEqual('header');
    });
    it('renders actions with automation id when qaHook prop is passed in', () => {
      const wrapper = renderer.create(<XUIActions primary={primary} qaHook={qaHook} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('PageHeader and Breadcrumb:', () => {
    const actions = <XUIActions primary={primary} secondary={secondary} />;
    const bcObj = [{ label: 'hello', href: '#1' }, { label: 'hiya', href: '#2' }, { label: 'yo' }];
    const exampleBreadcrumb = <XUIBreadcrumb breadcrumbs={bcObj} qaHook={qaHook} />;
    it('renders the simplest pageHeader with no extra settings passed', () => {
      const testPageHeader = renderer.create(<XUIPageHeader title="Testing 💩" />);
      expect(testPageHeader).toMatchSnapshot();
    });
    it('renders pageHeader without default layout', () => {
      const wrapper = mount(<XUIPageHeader title="Testing 💩" hasLayout={false} />);
      expect(wrapper.find('.xui-pageheading--content-layout').length).toBe(0);
    });
    it('renders extra pageHeader classes that are passed in', () => {
      const testPageHeader = renderer.create(
        <XUIPageHeader title="Testing 💩" className="testClass" contentClassName="testClassTwo" />,
      );
      expect(testPageHeader).toMatchSnapshot();
    });
    it('renders pageHeader containing Actions', () => {
      const wrapper = mount(<XUIPageHeader actions={actions} />);
      expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
    });
    it('renders pageHeader with title and Actions', () => {
      const wrapper = mount(<XUIPageHeader title="Testing 💩" actions={actions} />);
      expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
      expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
    });
    it('renders pageHeader with title and tabs and Actions', () => {
      const wrapper = mount(<XUIPageHeader title="Testing 💩" tabs={tabs} actions={actions} />);
      expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
      expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
      expect(wrapper.find('.xui-pageheading--tabs').length).toBe(1);
    });
    it('renders pageHeader with Breadcrumb and Actions', () => {
      const wrapper = mount(<XUIPageHeader breadcrumb={exampleBreadcrumb} actions={actions} />);
      expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
      expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(1);
    });
    it('renders pageHeader containing Breadcrumb', () => {
      const wrapper = mount(<XUIPageHeader breadcrumb={exampleBreadcrumb} />);
      expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(1);
    });
    it('renders pageHeader containing Breadcrumb from nodes', () => {
      const bcNodeObj = [
        <span role="link" onClick={() => alert('hello')} key="1">
          hello
        </span>,
        <span role="link" onClick={() => alert('hiya')} key="2">
          hello
        </span>,
        <span key="3">yo</span>,
      ];
      const exampleNodeBreadcrumb = <XUIBreadcrumb breadcrumbs={bcNodeObj} />;
      const testPageHeader = renderer.create(<XUIPageHeader breadcrumb={exampleNodeBreadcrumb} />);
      expect(testPageHeader).toMatchSnapshot();
    });
    it('renders pageHeader with title ONLY, if both Breadcrumb and title are passed', () => {
      const wrapper = mount(<XUIPageHeader title="Testing 💩" breadcrumb={exampleBreadcrumb} />);
      expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(0);
    });
    it('renders pageHeader containing tabs', () => {
      const wrapper = mount(<XUIPageHeader tabs={tabs} />);
      expect(wrapper.find('.xui-pageheading--tabs').length).toBe(1);
      expect(wrapper.find('.xui-pageheading--title').length).toBe(0);
    });
    it('renders pageHeader containing title and tabs', () => {
      const wrapper = mount(<XUIPageHeader title="Testing 💩" tabs={tabs} />);
      expect(wrapper.find('.xui-pageheading--tabs').length).toBe(1);
    });
    it('renders pageHeader with tabs ONLY, if both Breadcrumb and tabs are passed', () => {
      const wrapper = mount(<XUIPageHeader breadcrumb={exampleBreadcrumb} tabs={tabs} />);
      expect(wrapper.find('.xui-pageheading--tabs').length).toBe(1);
      expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(0);
    });
    it('renders pageHeader with tabs and title but not Breadcrumb, though Breadcrumb is passed', () => {
      const wrapper = mount(
        <XUIPageHeader title="Testing 💩" tabs={tabs} breadcrumb={exampleBreadcrumb} />,
      );
      expect(wrapper.find('.xui-pageheading--tabs').length).toBe(1);
      expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
      expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(0);
    });
    it('renders pageHeader and breadcrumb with automation id when qaHook prop is passed in', () => {
      const wrapper = renderer.create(
        <XUIPageHeader qaHook={qaHook} breadcrumb={exampleBreadcrumb} />,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Overview block and section:', () => {
    it('renders the base overview block with no extra settings passed', () => {
      const testRow = renderer.create(<XUIOverviewBlock />);
      expect(testRow).toMatchSnapshot();
    });
    it('renders extra overview block classes that are passed in', () => {
      const wrapper = mount(<XUIOverviewBlock className="testClass" />);
      const tag = wrapper.find(XUIOverviewBlock);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders overview block without default layout', () => {
      const wrapper = mount(<XUIOverviewBlock hasLayout={false} />);
      expect(wrapper.find('.xui-overview-layout').length).toBe(0);
    });
    it('renders the base overview block with sections, children, sentiments, and options', () => {
      const testBlock = renderer.create(
        <XUIOverviewBlock hasBorder={false} hasBackground={false} textAlignment="left">
          {Object.keys(overviewSentiments).map((sentiment, index) => {
            return (
              <XUIOverviewSection
                key={index}
                sentiment={sentiment}
                label={sentiment}
                value="100.23"
              >
                test child content
              </XUIOverviewSection>
            );
          })}
        </XUIOverviewBlock>,
      );
      expect(testBlock).toMatchSnapshot();
    });
    it('renders the overview sections with proper sentiments', () => {
      Object.keys(overviewSentiments).forEach(sentiment => {
        const section = mount(
          <XUIOverviewSection sentiment={sentiment} label={sentiment} value="100.23" />,
        );
        if (overviewSentiments.sentiment) {
          expect(section.find(`.xui-textcolor-${sentiment}`).length).toBe(1);
        }
      });
    });
    it('renders extra overview section classes that are passed in', () => {
      const wrapper = mount(
        <XUIOverviewBlock>
          <XUIOverviewSection label="labelText" value="65.43" className="testClass" />
        </XUIOverviewBlock>,
      );
      const tag = wrapper.find(XUIOverviewSection);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders overview block and overview section with automation id when qaHook prop is passed in', () => {
      const wrapper = renderer.create(
        <XUIOverviewBlock qaHook={qaHook}>
          <XUIOverviewSection qaHook={qaHook} />
        </XUIOverviewBlock>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('Panel and panel section:', () => {
    const actions = <XUIActions primary={primary} secondary={secondary} />;
    const panelHeader = <XUIPanelHeading>Hello there</XUIPanelHeading>;
    const panelFooter = <XUIPanelFooter className="xui-padding-small">{actions}</XUIPanelFooter>;
    it('renders the base panel with no extra settings passed', () => {
      const testPanel = renderer.create(<XUIPanel>Content here</XUIPanel>);
      expect(testPanel).toMatchSnapshot();
    });
    it('renders extra panel classes that are passed in', () => {
      const wrapper = mount(<XUIPanel className="testClass">Content here</XUIPanel>);
      const tag = wrapper.find(XUIPanel);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders panel in a different tag, if supplied', () => {
      const testCustomTag = renderer.create(<XUIPanel tagName="caption">Content here</XUIPanel>);
      expect(testCustomTag).toMatchSnapshot();
    });
    it('renders panel with a sidebar', () => {
      const wrapper = mount(<XUIPanel sidebar={tabs}>Content here</XUIPanel>);
      expect(wrapper.find('.xui-panel--sidebar').length).toBe(1);
    });
    it('renders panel with a default-style header and no sidebar', () => {
      const wrapper = mount(<XUIPanel heading={panelHeader}>Content here</XUIPanel>);
      expect(wrapper.find('.xui-panel--header').length).toBe(1);
      expect(wrapper.find('.xui-panel--sidebar').length).toBe(0);
    });
    it('renders panel with a default-style footer and no sidebar', () => {
      const wrapper = mount(<XUIPanel footer={panelFooter}>Content here</XUIPanel>);
      expect(wrapper.find('.xui-panel--footer').length).toBe(1);
      expect(wrapper.find('.xui-panel--sidebar').length).toBe(0);
    });
    it('renders the panel section with no extra settings passed', () => {
      const testPanelSection = renderer.create(<XUIPanelSection>Content here</XUIPanelSection>);
      expect(testPanelSection).toMatchSnapshot();
    });
    it('renders extra panel section classes that are passed in', () => {
      const wrapper = mount(<XUIPanelSection className="testClass">Content here</XUIPanelSection>);
      const tag = wrapper.find(XUIPanelSection);
      expect(tag.hasClass('testClass')).toEqual(true);
    });
    it('renders the panel section with a header', () => {
      const wrapper = mount(
        <XUIPanelSection headerText="I am a header">Content here</XUIPanelSection>,
      );
      expect(wrapper.find('.xui-panel--section--header').length).toBe(1);
    });
    it('renders the panel section with a header and special class', () => {
      const wrapper = mount(
        <XUIPanelSection headerText="I am a header" headerClassName="testClass">
          Content here
        </XUIPanelSection>,
      );
      expect(wrapper.find('.xui-panel--section--header').hasClass('testClass')).toEqual(true);
    });
    it('renders a panel with all the bells and whistles', () => {
      const testPanel = renderer.create(
        <XUIPanel heading={panelHeader} footer={panelFooter} sidebar={tabs}>
          <XUIPanelSection
            headerText="I'm a section header"
            headerClassName="test-header-class"
            className="xui-padding-large"
          >
            <p>Some important text might go here.</p>
          </XUIPanelSection>
          <XUIPanelSection className="xui-padding-large">
            <p>Other critical info would go here.</p>
          </XUIPanelSection>
        </XUIPanel>,
      );
      expect(testPanel).toMatchSnapshot();
    });
    it('renders panel and panel section with automation id when qaHook prop is passed in', () => {
      const wrapper = renderer.create(
        <XUIPanel qaHook={qaHook}>
          <XUIPanelSection qaHook={qaHook} />
          <XUIPanelFooter qaHook={qaHook} />
        </XUIPanel>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Content block and content block item', () => {
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
      wrapper.find('a').simulate('click');
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
});
