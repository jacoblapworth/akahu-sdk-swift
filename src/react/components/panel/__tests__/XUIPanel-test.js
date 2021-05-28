import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../../actions/XUIActions';
import XUIPanel from '../XUIPanel';
import XUIPanelSection from '../XUIPanelSection';
import XUIPanelHeading from '../XUIPanelHeading';
import XUIPanelFooter from '../XUIPanelFooter';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUI Panel and related components/>', () => {
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
    const wrapper = mount(<XUIPanelSection heading="I am a header">Content here</XUIPanelSection>);
    expect(wrapper.find('.xui-panel--section--header').length).toBe(1);
  });
  it('renders the panel section with a header and special class', () => {
    const wrapper = mount(
      <XUIPanelSection heading="I am a header" headerClassName="testClass">
        Content here
      </XUIPanelSection>,
    );
    expect(wrapper.find('.xui-panel--section--header').hasClass('testClass')).toEqual(true);
  });
  it('renders a panel with all the bells and whistles', () => {
    const testPanel = renderer.create(
      <XUIPanel heading={panelHeader} footer={panelFooter} sidebar={tabs}>
        <XUIPanelSection
          heading="I'm a section header"
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
  it('XUIPanel, XUIPanelFooter, XUIPanelHeading and XUIPanelSection should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIPanel footer={panelFooter} heading={panelHeader}>
        <XUIPanelSection>Section</XUIPanelSection>
      </XUIPanel>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
